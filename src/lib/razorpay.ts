export type UserInfo = {
  name: string;
  email: string;
  phone: string;
  sellerId: string;
  packageId?: number;
};

const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const SELLER_TOKEN_KEY = 'globpulse_seller_token';

/*
 * Your ₹999 GlobPulse Seller Package
 *
 * IMPORTANT:
 * Backend package ID = 11
 */
const DEFAULT_PACKAGE_ID = 11;

/* =========================================================
   RAZORPAY RESPONSE TYPE
========================================================= */

type RazorpayPaymentResponse = {
  razorpay_payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
};

/* =========================================================
   RAZORPAY FAILURE TYPE
========================================================= */

type RazorpayFailureResponse = {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;

    metadata?: {
      order_id?: string;
      payment_id?: string;
    };
  };
};

/* =========================================================
   RAZORPAY WINDOW TYPE
========================================================= */

declare global {
  interface Window {
    Razorpay: new (
      options: RazorpayOptions
    ) => RazorpayInstance;
  }
}

/* =========================================================
   RAZORPAY OPTIONS
========================================================= */

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;

  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };

  theme?: {
    color?: string;
  };

  handler: (
    response: RazorpayPaymentResponse
  ) => void | Promise<void>;

  modal?: {
    ondismiss?: () => void | Promise<void>;
  };
};

/* =========================================================
   RAZORPAY INSTANCE
========================================================= */

type RazorpayInstance = {
  open: () => void;

  on?: (
    event: string,
    callback: (
      response: RazorpayFailureResponse
    ) => void
  ) => void;
};

/* =========================================================
   GET SELLER TOKEN
========================================================= */

function getSellerToken(): string | null {
  return localStorage.getItem(SELLER_TOKEN_KEY);
}

/* =========================================================
   SEND PAYMENT FAILURE EMAIL
========================================================= */

async function sendPaymentFailureEmail(params: {
  packageName?: string;
  paymentId?: string | null;
  orderId?: string | null;
  amount?: number | null;
  reason: string;
}): Promise<void> {
  try {
    const token = getSellerToken();

    if (!API_URL || !token) {
      console.warn(
        'Unable to send payment failure email: API URL or seller token missing.'
      );

      return;
    }

    const response = await fetch(
      `${API_URL}/api/seller/payment/communication`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify({
          status: 'failed',

          package_name:
            params.packageName ||
            'GlobPulse Seller Plan',

          payment_id:
            params.paymentId || null,

          order_id:
            params.orderId || null,

          amount:
            typeof params.amount === 'number'
              ? params.amount
              : null,

          reason:
            params.reason ||
            'Payment was not completed.',
        }),
      }
    );

    let data: any = null;

    try {
      data = await response.json();
    } catch {
      data = null;
    }

    if (!response.ok || !data?.status) {
      console.error(
        'Payment failure email API failed:',
        data?.message ||
          'Unable to send payment failure email.'
      );

      return;
    }

    console.log(
      'Payment failure email sent successfully.'
    );
  } catch (error) {
    /*
     * Email failure must never break payment UI.
     */
    console.error(
      'Payment failure email request failed:',
      error
    );
  }
}

/* =========================================================
   LOAD RAZORPAY SCRIPT
========================================================= */

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        resolve(!!window.Razorpay);
      });

      existingScript.addEventListener('error', () => {
        resolve(false);
      });

      return;
    }

    const script = document.createElement('script');

    script.src =
      'https://checkout.razorpay.com/v1/checkout.js';

    script.async = true;

    script.onload = () => {
      resolve(!!window.Razorpay);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

/* =========================================================
   START RAZORPAY PAYMENT
========================================================= */

export async function startRazorpayPayment(
  userInfo: UserInfo,
  onSuccess: () => void,
  onFailure: (msg: string) => void
): Promise<void> {
  try {
    /* =====================================================
       BASIC VALIDATION
    ====================================================== */

    if (!API_URL) {
      onFailure(
        'Payment server URL is not configured.'
      );

      return;
    }

    if (!userInfo.sellerId) {
      onFailure(
        'Seller information is missing. Please login again.'
      );

      return;
    }

    const token = getSellerToken();

    if (!token) {
      onFailure(
        'Seller authentication has expired. Please login again.'
      );

      return;
    }

    const packageId =
      userInfo.packageId || DEFAULT_PACKAGE_ID;

    /*
     * Prevent duplicate failure emails.
     *
     * Razorpay can trigger more than one failure-related
     * callback in some situations.
     */
    let failureAlreadyReported = false;

    /*
     * Payment values are populated after create-order.
     */
    let currentOrderId: string | null = null;
    let currentPaymentId: string | null = null;
    let currentAmountInr: number | null = null;

    /* =====================================================
       COMMON FAILURE HANDLER
    ====================================================== */

    const reportFailure = async (
      reason: string,
      paymentId?: string | null,
      orderId?: string | null
    ) => {
      /*
       * Always show the first failure to the UI.
       */
      if (failureAlreadyReported) {
        return;
      }

      /*
       * Mark immediately so two callbacks cannot
       * send two emails.
       */
      failureAlreadyReported = true;

      const finalPaymentId =
        paymentId ||
        currentPaymentId ||
        null;

      const finalOrderId =
        orderId ||
        currentOrderId ||
        null;

      const finalAmount =
        typeof currentAmountInr === 'number'
          ? currentAmountInr
          : null;

      /*
       * Send email.
       */
      await sendPaymentFailureEmail({
        packageName:
          'GlobPulse Seller Plan',

        paymentId:
          finalPaymentId,

        orderId:
          finalOrderId,

        amount:
          finalAmount,

        reason:
          reason ||
          'Payment was not completed.',
      });

      /*
       * Show same reason in UI.
       */
      onFailure(
        reason ||
          'Payment was not completed.'
      );
    };

    /* =====================================================
       LOAD RAZORPAY
    ====================================================== */

    const razorpayLoaded =
      await loadRazorpayScript();

    if (!razorpayLoaded) {
      await reportFailure(
        'Unable to load Razorpay. Please check your internet connection and try again.'
      );

      return;
    }

    /* =====================================================
       CREATE RAZORPAY ORDER

       Backend:
       POST /api/seller/payment/create-order
    ====================================================== */

    let orderRes: Response;

    try {
      orderRes = await fetch(
        `${API_URL}/api/seller/payment/create-order`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            /*
             * Backend package 11 calculates the actual
             * ₹999 + GST amount itself.
             */
            amount: 999,

            package_id:
              packageId,

            payment_mode:
              'full',
          }),
        }
      );
    } catch (error) {
      console.error(
        'Create payment order request failed:',
        error
      );

      await reportFailure(
        'Unable to connect to the payment server while creating the payment order.'
      );

      return;
    }

    /* =====================================================
       READ ORDER RESPONSE
    ====================================================== */

    let orderData: any;

    try {
      orderData =
        await orderRes.json();
    } catch {
      await reportFailure(
        'Invalid response received from the payment server while creating the payment order.'
      );

      return;
    }

    /* =====================================================
       ORDER CREATION FAILED
    ====================================================== */

    if (
      !orderRes.ok ||
      !orderData?.status
    ) {
      const reason =
        orderData?.message ||
        'Could not create payment order.';

      await reportFailure(reason);

      return;
    }

    /*
     * Backend response expected:
     *
     * orderData.data.order_id
     * orderData.data.amount
     * orderData.data.amount_inr
     * orderData.data.rzp_key
     */

    const paymentData =
      orderData?.data;

    if (!paymentData) {
      await reportFailure(
        'Payment order information is missing from the payment server response.'
      );

      return;
    }

    const razorpayOrderId =
      paymentData.order_id;

    const razorpayAmount =
      Number(paymentData.amount);

    const amountInr =
      Number(paymentData.amount_inr);

    const razorpayKey =
      paymentData.rzp_key;

    currentOrderId =
      razorpayOrderId || null;

    currentAmountInr =
      Number.isFinite(amountInr) &&
      amountInr > 0
        ? amountInr
        : null;

    /* =====================================================
       VALIDATE ORDER ID
    ====================================================== */

    if (!razorpayOrderId) {
      await reportFailure(
        'Could not create a valid Razorpay order.'
      );

      return;
    }

    /* =====================================================
       VALIDATE PAYMENT AMOUNT
    ====================================================== */

    if (
      !razorpayAmount ||
      razorpayAmount <= 0
    ) {
      await reportFailure(
        'Invalid payment amount received from the payment server.'
      );

      return;
    }

    /* =====================================================
       VALIDATE RAZORPAY KEY
    ====================================================== */

    if (!razorpayKey) {
      await reportFailure(
        'Razorpay key was not returned by the payment server.'
      );

      return;
    }

    /* =====================================================
       OPEN RAZORPAY
    ====================================================== */

    const rzp =
      new window.Razorpay({
        key: razorpayKey,

        /*
         * Backend returns paise.
         */
        amount:
          razorpayAmount,

        currency:
          paymentData.currency ||
          'INR',

        name:
          'GlobPulse',

        description:
          'GlobPulse Seller Plan — ₹999 + 18% GST',

        order_id:
          razorpayOrderId,

        prefill: {
          name:
            userInfo.name || '',

          email:
            userInfo.email || '',

          contact:
            userInfo.phone || '',
        },

        theme: {
          color:
            '#0a1f44',
        },

        /* =================================================
           RAZORPAY SUCCESS
        ================================================== */

        handler: async (
          response: RazorpayPaymentResponse
        ) => {
          try {
            currentPaymentId =
              response?.razorpay_payment_id ||
              null;

            currentOrderId =
              response?.razorpay_order_id ||
              currentOrderId;

            /* =============================================
               BASIC RESPONSE VALIDATION
            ============================================= */

            if (
              !response?.razorpay_payment_id ||
              !response?.razorpay_order_id ||
              !response?.razorpay_signature
            ) {
              await reportFailure(
                'Invalid payment response received from Razorpay.',
                response?.razorpay_payment_id ||
                  null,
                response?.razorpay_order_id ||
                  null
              );

              return;
            }

            /* =============================================
               VERIFY PAYMENT
            ============================================= */

            let verifyRes: Response;

            try {
              verifyRes = await fetch(
                `${API_URL}/api/seller/payment/verify`,
                {
                  method: 'POST',

                  headers: {
                    'Content-Type':
                      'application/json',

                    Accept:
                      'application/json',

                    Authorization:
                      `Bearer ${token}`,
                  },

                  body: JSON.stringify({
                    razorpay_payment_id:
                      response.razorpay_payment_id,

                    razorpay_order_id:
                      response.razorpay_order_id,

                    razorpay_signature:
                      response.razorpay_signature,

                    package_id:
                      packageId,

                    payment_mode:
                      'full',

                    /*
                     * Backend validation requires amount.
                     */
                    amount:
                      Number.isFinite(amountInr) &&
                      amountInr > 0
                        ? amountInr
                        : razorpayAmount / 100,
                  }),
                }
              );
            } catch (error) {
              console.error(
                'Payment verification request failed:',
                error
              );

              await reportFailure(
                'Payment verification request failed. Please contact support if money was deducted.',
                response.razorpay_payment_id,
                response.razorpay_order_id
              );

              return;
            }

            /* =============================================
               READ VERIFY RESPONSE
            ============================================= */

            let verifyData: any;

            try {
              verifyData =
                await verifyRes.json();
            } catch {
              await reportFailure(
                'Invalid response received during payment verification.',
                response.razorpay_payment_id,
                response.razorpay_order_id
              );

              return;
            }

            /* =============================================
               PAYMENT VERIFICATION FAILED
            ============================================= */

            if (
              !verifyRes.ok ||
              !verifyData?.status
            ) {
              const failureReason =
                verifyData?.message ||
                'Payment verification failed.';

              await reportFailure(
                failureReason,

                response.razorpay_payment_id,

                response.razorpay_order_id
              );

              return;
            }

            /* =============================================
               PAYMENT SUCCESS
            ============================================= */

            console.log(
              'Payment verified successfully:',
              verifyData
            );

            /*
             * IMPORTANT:
             *
             * Success email should be sent by Laravel
             * inside verifyPayment() after DB::commit().
             *
             * Do NOT send the success email from React.
             */

            onSuccess();

          } catch (error) {
            console.error(
              'Payment verification error:',
              error
            );

            await reportFailure(
              'An unexpected error occurred while verifying the payment. Please contact support if money was deducted.',
              response?.razorpay_payment_id ||
                null,
              response?.razorpay_order_id ||
                null
            );
          }
        },

        /* =================================================
           RAZORPAY MODAL
        ================================================== */

        modal: {
          ondismiss:
            async () => {
              await reportFailure(
                'Payment cancelled by the seller.',

                currentPaymentId,

                currentOrderId
              );
            },
        },
      });

    /* =====================================================
       RAZORPAY PAYMENT FAILED EVENT
    ====================================================== */

    /*
     * Razorpay can provide the actual failure reason here,
     * for example:
     *
     * "Payment was declined by the bank"
     *
     * or:
     *
     * "Payment processing failed"
     */

    if (rzp.on) {
      rzp.on(
        'payment.failed',
        async (
          failureResponse: RazorpayFailureResponse
        ) => {
          const error =
            failureResponse?.error;

          const razorpayReason =
            error?.description ||
            error?.reason ||
            error?.code ||
            'Razorpay payment failed.';

          const metadataPaymentId =
            error?.metadata?.payment_id ||
            null;

          const metadataOrderId =
            error?.metadata?.order_id ||
            null;

          currentPaymentId =
            metadataPaymentId ||
            currentPaymentId;

          currentOrderId =
            metadataOrderId ||
            currentOrderId;

          await reportFailure(
            razorpayReason,

            currentPaymentId,

            currentOrderId
          );
        }
      );
    }

    /* =====================================================
       OPEN PAYMENT WINDOW
    ====================================================== */

    rzp.open();

  } catch (error) {
    console.error(
      'Razorpay payment error:',
      error
    );

    const message =
      error instanceof Error
        ? error.message
        : '';

    if (
      message
        .toLowerCase()
        .includes('fetch')
    ) {
      await sendPaymentFailureEmail({
        packageName:
          'GlobPulse Seller Plan',

        paymentId:
          null,

        orderId:
          null,

        amount:
          1178.82,

        reason:
          'Unable to connect to the payment server.',
      });

      onFailure(
        'Unable to connect to the payment server.'
      );

      return;
    }

    await sendPaymentFailureEmail({
      packageName:
        'GlobPulse Seller Plan',

      paymentId:
        null,

      orderId:
        null,

      amount:
        1178.82,

      reason:
        'Something went wrong while starting the payment.',
    });

    onFailure(
      'Something went wrong while starting the payment.'
    );
  }
}