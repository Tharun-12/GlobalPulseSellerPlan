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
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
};

/* =========================================================
   RAZORPAY WINDOW TYPE
========================================================= */

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

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
    ondismiss?: () => void;
  };
};

type RazorpayInstance = {
  open: () => void;
};

/* =========================================================
   GET SELLER TOKEN
========================================================= */

function getSellerToken(): string | null {
  return localStorage.getItem(SELLER_TOKEN_KEY);
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

    /* =====================================================
       LOAD RAZORPAY
    ====================================================== */

    const razorpayLoaded =
      await loadRazorpayScript();

    if (!razorpayLoaded) {
      onFailure(
        'Unable to load Razorpay. Please check your internet connection and try again.'
      );
      return;
    }

    /* =====================================================
       CREATE RAZORPAY ORDER
       
       Backend route:
       POST /api/seller/payment/create-order
    ====================================================== */

    const orderRes = await fetch(
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
           * Backend requires amount for validation.
           *
           * For package 11 the backend itself calculates
           * the actual amount using package price + GST.
           */
          amount: 999,

          package_id: packageId,

          payment_mode: 'full',
        }),
      }
    );

    /* =====================================================
       READ ORDER RESPONSE
    ====================================================== */

    let orderData: any;

    try {
      orderData = await orderRes.json();
    } catch {
      onFailure(
        'Invalid response received from payment server.'
      );
      return;
    }

    if (!orderRes.ok || !orderData?.status) {
      onFailure(
        orderData?.message ||
          'Could not create payment order.'
      );
      return;
    }

    /*
     * Actual backend response is expected under:
     *
     * orderData.data.order_id
     * orderData.data.amount
     * orderData.data.amount_inr
     * orderData.data.rzp_key
     */

    const paymentData = orderData?.data;

    if (!paymentData) {
      onFailure(
        'Payment order information is missing.'
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

    if (!razorpayOrderId) {
      onFailure(
        'Could not create Razorpay order.'
      );
      return;
    }

    if (
      !razorpayAmount ||
      razorpayAmount <= 0
    ) {
      onFailure(
        'Invalid payment amount received from server.'
      );
      return;
    }

    if (!razorpayKey) {
      onFailure(
        'Razorpay key was not returned by the payment server.'
      );
      return;
    }

    /* =====================================================
       OPEN RAZORPAY
    ====================================================== */

    const rzp = new window.Razorpay({
      key: razorpayKey,

      /*
       * Razorpay expects amount in paise.
       *
       * Backend already returns amount in paise.
       */
      amount: razorpayAmount,

      currency:
        paymentData.currency || 'INR',

      name: 'GlobPulse',

      description:
         'GlobPulse Seller Plan — ₹999 + 18% GST',

      order_id: razorpayOrderId,

      prefill: {
        name: userInfo.name || '',
        email: userInfo.email || '',
        contact: userInfo.phone || '',
      },

      theme: {
        color: '#0a1f44',
      },

      /* ===================================================
         RAZORPAY SUCCESS
      ==================================================== */

      handler: async (
        response: RazorpayPaymentResponse
      ) => {
        try {
          /* ===============================================
             BASIC RAZORPAY RESPONSE VALIDATION
          ============================================== */

          if (
            !response?.razorpay_payment_id ||
            !response?.razorpay_order_id ||
            !response?.razorpay_signature
          ) {
            onFailure(
              'Invalid payment response received from Razorpay.'
            );
            return;
          }

          /* ===============================================
             VERIFY PAYMENT

             Backend route:
             POST /api/seller/payment/verify
          ============================================== */

          const verifyRes = await fetch(
            `${API_URL}/api/seller/payment/verify`,
            {
              method: 'POST',

              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
              },

              body: JSON.stringify({
                razorpay_payment_id:
                  response.razorpay_payment_id,

                razorpay_order_id:
                  response.razorpay_order_id,

                razorpay_signature:
                  response.razorpay_signature,

                package_id: packageId,

                payment_mode: 'full',

                /*
                 * Backend validation requires amount.
                 *
                 * amount_inr is the actual INR amount
                 * returned by create-order.
                 */
                amount:
                  Number.isFinite(amountInr) &&
                  amountInr > 0
                    ? amountInr
                    : razorpayAmount / 100,
              }),
            }
          );

          /* ===============================================
             READ VERIFY RESPONSE
          ============================================== */

          let verifyData: any;

          try {
            verifyData =
              await verifyRes.json();
          } catch {
            onFailure(
              'Invalid response received during payment verification.'
            );
            return;
          }

          /* ===============================================
             PAYMENT VERIFICATION FAILED
          ============================================== */

          if (
            !verifyRes.ok ||
            !verifyData?.status
          ) {
            onFailure(
              verifyData?.message ||
                'Payment verification failed.'
            );
            return;
          }

          /* ===============================================
             PAYMENT SUCCESS
          ============================================== */

          console.log(
            'Payment verified successfully:',
            verifyData
          );

          onSuccess();
        } catch (error) {
          console.error(
            'Payment verification error:',
            error
          );

          onFailure(
            'Verification request failed. Please contact support if money was deducted.'
          );
        }
      },

      /* ===================================================
         PAYMENT MODAL DISMISSED
      ==================================================== */

      modal: {
        ondismiss: () => {
          onFailure(
            'Payment cancelled.'
          );
        },
      },
    });

    /* =====================================================
       OPEN PAYMENT WINDOW
    ====================================================== */

    rzp.open();
  } catch (error) {
    console.error(
      'Razorpay payment error:',
      error
    );

    if (
      error instanceof TypeError &&
      error.message
        .toLowerCase()
        .includes('fetch')
    ) {
      onFailure(
        'Unable to connect to the payment server.'
      );
      return;
    }

    onFailure(
      'Something went wrong while starting payment.'
    );
  }
}