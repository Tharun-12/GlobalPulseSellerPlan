import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
  X,
  ShieldCheck,
  Lock,
  CreditCard,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

import { planBenefits } from '@/data/content';
import { startRazorpayPayment } from '@/lib/razorpay';
import {
  getSellerPackage,
  is999PlanActive,
} from '@/lib/sellerApi';

import type {
  Seller,
  CheckoutStep,
} from '@/types/auth';

import { AccountChoice } from '@/components/auth/AccountChoice';
import { SellerLogin } from '@/components/auth/SellerLogin';
import { SellerSignup } from '@/components/auth/SellerSignup';
import { SellerConfirmation } from '@/components/auth/SellerConfirmation';
import { AlreadyActive } from '@/components/auth/AlreadyActive';
import { SellerSignupOtp } from '@/components/auth/SellerSignupOtp';

const CHECKOUT_STATE_KEY = 'globpulse_checkout_state';

/* =============================================================
   PROPS
============================================================= */

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};


/* =============================================================
   PAYMENT STATUS
============================================================= */

type PaymentStatus =
  | 'idle'
  | 'processing'
  | 'success'
  | 'error';


/* =============================================================
   COMPONENT
============================================================= */

export function CheckoutModal({
  isOpen,
  onClose,
}: CheckoutModalProps) {

  /* ===========================================================
     CHECKOUT STEP
  =========================================================== */

  const [step, setStep] = useState<CheckoutStep>(() => {
  try {
    const saved = localStorage.getItem(CHECKOUT_STATE_KEY);

    if (!saved) {
      return 'account';
    }

    const parsed = JSON.parse(saved);

    if (parsed?.step) {
      return parsed.step as CheckoutStep;
    }

    return 'account';
  } catch {
    return 'account';
  }
});


  /* ===========================================================
     SELLER
  =========================================================== */

    const [seller, setSeller] = useState<Seller | null>(() => {
    try {
        const saved = localStorage.getItem(CHECKOUT_STATE_KEY);

        if (!saved) {
        return null;
        }

        const parsed = JSON.parse(saved);

        return parsed?.seller || null;
    } catch {
        return null;
    }
    });

    const [checkingSavedPackage, setCheckingSavedPackage] =
  useState(() => {
    try {
      const token = localStorage.getItem(
        'globpulse_seller_token'
      );

      const saved = localStorage.getItem(
        CHECKOUT_STATE_KEY
      );

      if (!token || !saved) {
        return false;
      }

      const parsed = JSON.parse(saved);

      return parsed?.step === 'already-active';
    } catch {
      return false;
    }
  });

  useEffect(() => {
  let cancelled = false;

  const validateSavedActivePackage = async () => {
    try {
      const token = localStorage.getItem(
        'globpulse_seller_token'
      );

      const saved = localStorage.getItem(
        CHECKOUT_STATE_KEY
      );

      if (!token || !saved) {
        if (!cancelled) {
          setCheckingSavedPackage(false);
        }

        return;
      }

      const parsed = JSON.parse(saved);

      /*
       * Only revalidate the "already-active" screen.
       *
       * Other steps such as signup, OTP, confirmation,
       * and payment should continue from where the seller left.
       */
      if (parsed?.step !== 'already-active') {
        if (!cancelled) {
          setCheckingSavedPackage(false);
        }

        return;
      }

      console.log(
        '🔎 Rechecking saved ₹999 package status...'
      );

      const packageResponse =
        await getSellerPackage();

      const packageActive =
        is999PlanActive(packageResponse);

      if (cancelled) {
        return;
      }

      if (packageActive) {
        console.log(
          '✅ Saved package is still active.'
        );

        setStep('already-active');
      } else {
        console.log(
          '➡️ Saved package is no longer active.'
        );

        setStatus('idle');
        setErrorMsg('');
        setStep('confirmation');
      }
    } catch (error) {
      if (cancelled) {
        return;
      }

      /*
       * 404 Package not found means the seller
       * currently has no package.
       */
      if (
        error instanceof Error &&
        error.message
          .toLowerCase()
          .includes('package not found')
      ) {
        console.log(
          'ℹ️ Saved active state is stale → showing confirmation.'
        );

        setStatus('idle');
        setErrorMsg('');
        setStep('confirmation');
      } else {
        console.error(
          '❌ Saved package validation failed:',
          error
        );

        /*
         * Do not allow a stale "already-active"
         * screen to remain when package status
         * cannot be confirmed.
         */
        setStatus('idle');
        setErrorMsg('');
        setStep('confirmation');
      }
    } finally {
      if (!cancelled) {
        setCheckingSavedPackage(false);
      }
    }
  };

  validateSavedActivePackage();

  return () => {
    cancelled = true;
  };
}, []);


    useEffect(() => {
  try {
    localStorage.setItem(
      CHECKOUT_STATE_KEY,
      JSON.stringify({
        step,
        seller,
      }),
    );
  } catch (error) {
    console.error(
      'Unable to save checkout progress:',
      error,
    );
  }
}, [step, seller]);


  /* ===========================================================
     PAYMENT STATUS
  =========================================================== */

  const [status, setStatus] =
    useState<PaymentStatus>('idle');


  /* ===========================================================
     PAYMENT ERROR
  =========================================================== */

  const [errorMsg, setErrorMsg] = useState('');


  /* ===========================================================
     EXISTING SELLER LOGIN
  =========================================================== */

  const handleSellerLogin = async (
  sellerData: Seller
) => {
  setSeller(sellerData);
  setStatus('processing');
  setErrorMsg('');

  console.log(
    '🔐 Checkout login seller:',
    sellerData
  );

  try {
    console.log(
      '📦 Checking seller package...'
    );

    const packageResponse =
      await getSellerPackage();

    console.log(
      '📦 Seller package response:',
      packageResponse
    );

    const packageAlreadyActive =
      is999PlanActive(packageResponse);

    setStatus('idle');

    if (packageAlreadyActive) {
      console.log(
        '✅ ₹999 package is already active'
      );

      setStep('already-active');
    } else {
      console.log(
        '➡️ ₹999 package is not active'
      );

      setStep('confirmation');
    }
  } catch (error) {
    console.error(
      '❌ Package status check failed:',
      error
    );

    setStatus('idle');

    /*
     * Seller does not have a package yet.
     *
     * Laravel returns:
     * 404 - Package not found.
     *
     * Treat this as "no package yet" and
     * continue to the ₹999 confirmation screen.
     */
    if (
      error instanceof Error &&
      error.message
        .toLowerCase()
        .includes('package not found')
    ) {
      console.log(
        'ℹ️ Seller has no package → showing confirmation'
      );

      setErrorMsg('');
      setStep('confirmation');

      return;
    }

    /*
     * Any other package API error should
     * be displayed to the seller.
     */
    setErrorMsg(
      error instanceof Error
        ? error.message
        : 'Unable to check your seller plan. Please try again.'
    );
  }
};


  /* ===========================================================
     NEW SELLER SIGNUP
  =========================================================== */

  const handleSellerSignup = (
  sellerData: Seller
) => {
  setSeller(sellerData);

  setStatus('idle');

  setErrorMsg('');

  /*
   * New seller must verify email first.
   *
   * The Laravel API does not return an API token
   * from verify-otp, so after verification we send
   * the seller to the existing login component.
   */
  setStep('otp');
};


  /* ===========================================================
     CLOSE MODAL
  =========================================================== */

const handleClose = () => {
  /*
   * Do NOT reset checkout state here.
   *
   * This allows the seller to close the modal and
   * continue from the same step when they reopen it.
   */

  onClose();
};


  /* ===========================================================
     PAYMENT
  =========================================================== */

  const handlePayNow = () => {

    /*
     * Seller must exist before payment.
     */

    if (!seller) {

      setStep('account');

      return;
    }


    setStatus('processing');

    setErrorMsg('');


    /*
     * ---------------------------------------------------------
     * RAZORPAY
     * ---------------------------------------------------------
     *
     * Frontend currently starts Razorpay payment.
     *
     * Backend later needs to:
     *
     * 1. Create Razorpay order
     * 2. Associate order with seller
     * 3. Verify Razorpay signature
     * 4. Store payment
     * 5. Activate ₹999 package
     */

    startRazorpayPayment(
  {
    name: seller.fullName,
    email: seller.email,
    phone: seller.phone,
    sellerId: seller.sellerId,
    packageId: 11,
  },

  /* -------------------------------------------------------
     SUCCESS
  ------------------------------------------------------- */

  () => {
    setStatus('success');
    setStep('success');
  },

  /* -------------------------------------------------------
     FAILURE
  ------------------------------------------------------- */

(msg: string) => {
  setStatus('error');
  setErrorMsg(msg);
},
);
  };

  /* ===========================================================
     STEP STATE
  =========================================================== */

  const isAccountStep =
    step === 'account' ||
    step === 'login' ||
    step === 'signup' ||
    step === 'confirmation';


  const isPaymentStep =
    step === 'payment';


  /* ===========================================================
     RENDER
  =========================================================== */

return (
  <AnimatePresence>
    {isOpen && !checkingSavedPackage && (

        /* =====================================================
           BACKDROP
        ====================================================== */

        <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="
    fixed
    inset-0
    z-[70]
    overflow-y-auto
    overscroll-contain
    bg-navy-950/80
    px-3
    py-4
    sm:px-4
    sm:py-6
  "
  onClick={handleClose}
>

          {/* =================================================
              MODAL
          ================================================== */}

          <motion.div
            initial={{
              scale: 0.95,
              opacity: 0,
              y: 20,
            }}

            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}

            exit={{
              scale: 0.95,
              opacity: 0,
              y: 20,
            }}

            transition={{
              type: 'spring',
              damping: 30,
              stiffness: 400,
            }}

            className="
              relative
              mx-auto
              flex
              w-full
              max-w-md
              flex-col
              overflow-hidden
              rounded-2xl
              bg-white
              shadow-2xl

              max-h-[calc(100dvh-2rem)]
              sm:max-h-[calc(100dvh-3rem)]
            "

            onClick={(event) => {
              event.stopPropagation();
            }}
          >

            {/* =================================================
                HEADER
            ================================================== */}

            <div
              className="
                flex
                shrink-0
                items-center
                justify-between
                bg-navy-900
                px-5
                py-4
                sm:px-6
                sm:py-5
              "
            >

              {/* Logo */}

              <div className="flex min-w-0 items-center">

                <img
                  src="/GFEPLUSE1.png"
                  alt="GlobPulse — The pulse of global trade"

                  className="
                    h-8
                    w-auto
                    max-w-[180px]
                    object-contain
                    sm:h-9
                  "
                />

              </div>


              {/* Close */}

              <button
                type="button"
                onClick={handleClose}

                className="
                  ml-3
                  shrink-0
                  rounded-lg
                  p-1
                  text-navy-300
                  transition-colors
                  hover:text-white
                  focus:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-gold-400
                "

                aria-label="Close checkout"
              >

                <X className="h-5 w-5" />

              </button>

            </div>


            {/* =================================================
                SCROLLABLE CONTENT
            ================================================== */}

            <div
              className="
                min-h-0
                flex-1
                overflow-y-auto
                overscroll-contain
                px-5
                py-5
                sm:px-6
                sm:py-6
                [scrollbar-width:thin]
              "
            >

              {/* =================================================
                  STEP INDICATOR
              ================================================== */}

              {!['success', 'already-active'].includes(step) && (

                <div
                  className="
                    mb-5
                    flex
                    items-center
                    gap-2
                    sm:mb-6
                  "
                >

                  {/* ACCOUNT */}

                  <div
                    className="
                      flex
                      min-w-0
                      flex-1
                      items-center
                      gap-2
                    "
                  >

                    <div
                      className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-xs
                        font-bold
                        transition-colors

                        ${
                          isAccountStep
                            ? 'bg-navy-900 text-white'
                            : 'bg-navy-100 text-navy-400'
                        }
                      `}
                    >
                      1
                    </div>


                    <span
                      className={`
                        text-xs
                        font-medium

                        ${
                          isAccountStep
                            ? 'text-navy-900'
                            : 'text-navy-400'
                        }
                      `}
                    >
                      Account
                    </span>


                    <div
                      className="
                        mx-1
                        h-0.5
                        min-w-4
                        flex-1
                        rounded
                        bg-navy-100
                      "
                    />

                  </div>


                  {/* PAYMENT */}

                  <div
                    className="
                      flex
                      min-w-0
                      flex-1
                      items-center
                      gap-2
                    "
                  >

                    <div
                      className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-full
                        text-xs
                        font-bold
                        transition-colors

                        ${
                          isPaymentStep
                            ? 'bg-navy-900 text-white'
                            : 'bg-navy-100 text-navy-400'
                        }
                      `}
                    >
                      2
                    </div>


                    <span
                      className={`
                        text-xs
                        font-medium

                        ${
                          isPaymentStep
                            ? 'text-navy-900'
                            : 'text-navy-400'
                        }
                      `}
                    >
                      Payment
                    </span>

                  </div>

                </div>

              )}


              {/* =================================================
                  SUCCESS SCREEN
              ================================================== */}

              {step === 'success' ? (

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                  }}

                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}

                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 300,
                  }}

                  className="
                    py-3
                    text-center
                    sm:py-4
                  "
                >

                  {/* Success Icon */}

                  <div
                    className="
                      mx-auto
                      mb-4
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-green-50
                    "
                  >

                    <CheckCircle2
                      className="
                        h-9
                        w-9
                        text-green-600
                      "
                    />

                  </div>


                  {/* Heading */}

                  <h3
                    className="
                      font-display
                      text-xl
                      font-bold
                      text-navy-900
                    "
                  >
                    Payment Successful!
                  </h3>


                  {/* Message */}

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-relaxed
                      text-navy-500
                    "
                  >

                    Welcome to GlobPulse,{' '}

                    <span
                      className="
                        font-semibold
                        text-navy-700
                      "
                    >
                      {seller?.fullName || 'there'}
                    </span>

                    . Your Seller Plan is now active.

                  </p>


                  {/* Email */}

                  {seller?.email && (

                    <p
                      className="
                        mt-1
                        text-sm
                        leading-relaxed
                        text-navy-500
                      "
                    >

                      We've sent a confirmation to{' '}

                      <span
                        className="
                          break-all
                          font-medium
                          text-navy-700
                        "
                      >
                        {seller.email}
                      </span>

                      .

                    </p>

                  )}


                  {/* Benefits */}

                  <div
                    className="
                      mt-5
                      rounded-xl
                      border
                      border-navy-100
                      bg-navy-50
                      p-4
                      text-left
                    "
                  >

                    <div className="space-y-1.5">

                      {planBenefits.map((benefit) => (

                        <div
                          key={benefit}
                          className="
                            flex
                            items-center
                            gap-2
                            text-xs
                            text-navy-600
                          "
                        >

                          <CheckCircle2
                            className="
                              h-3.5
                              w-3.5
                              shrink-0
                              text-green-600
                            "
                          />

                          <span>
                            {benefit}
                          </span>

                        </div>

                      ))}

                    </div>

                  </div>


                  {/* Done */}

                  <button
                    type="button"
                    onClick={() => {
                    localStorage.removeItem(CHECKOUT_STATE_KEY);
                    handleClose();
                    }}

                    className="
                      mt-6
                      w-full
                      rounded-lg
                      bg-navy-900
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      transition-colors
                      hover:bg-navy-800
                      focus:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-navy-900
                      focus-visible:ring-offset-2
                    "
                  >
                    Done
                  </button>

                </motion.div>

              ) : (

                <>
                  {/* =================================================
                      ACCOUNT CHOICE
                  ================================================== */}

                  {step === 'account' && (

                    <AccountChoice
                      onLogin={() => {

                        setStatus('idle');

                        setErrorMsg('');

                        setStep('login');
                      }}

                      onSignup={() => {

                        setStatus('idle');

                        setErrorMsg('');

                        setStep('signup');
                      }}
                    />

                  )}


                  {/* =================================================
                      EXISTING SELLER LOGIN
                  ================================================== */}

                  {step === 'login' && (

                    <SellerLogin
                      onBack={() => {

                        setStatus('idle');

                        setErrorMsg('');

                        setStep('account');
                      }}

                      onSuccess={handleSellerLogin}
                    />

                  )}


                  {/* =================================================
                      NEW SELLER SIGNUP
                  ================================================== */}

                  {step === 'signup' && (

                    <SellerSignup
                      onBack={() => {

                        setStatus('idle');

                        setErrorMsg('');

                        setStep('account');
                      }}

                      onSuccess={handleSellerSignup}
                    />

                  )}

                  {/* =====================================================
                        NEW SELLER OTP
                    ====================================================== */}

                    {step === 'otp' && seller && (
                    <SellerSignupOtp
                        seller={seller}

                        onBack={() => {
                        setStatus('idle');
                        setErrorMsg('');
                        setStep('signup');
                        }}

                        onVerified={() => {
                        setStatus('idle');

                        setErrorMsg('');

                        /*
                        * Laravel verify-otp does NOT return a token.
                        *
                        * It sends the temporary credentials by email.
                        *
                        * Therefore use the existing login API.
                        */
                        setStep('login');
                        }}
                    />
                    )}


                  {/* =================================================
                      SELLER CONFIRMATION
                  ================================================== */}

                  {step === 'confirmation' && seller && (

                    <SellerConfirmation
                      seller={seller}

                      onContinue={() => {

                        setStatus('idle');

                        setErrorMsg('');

                        setStep('payment');
                      }}
                    />

                  )}


                  {/* =================================================
                      ALREADY ACTIVE
                  ================================================== */}

                  {step === 'already-active' && seller && (

                    <AlreadyActive
                      sellerName={seller.fullName}

                      onContinue={() => {
                        const apiUrl =
                            (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

                        if (!apiUrl) {
                            console.error('VITE_API_URL is not configured.');
                            return;
                        }

                        window.location.href = `${apiUrl}/seller/dashboard`;
                        }}
                    />

                  )}


                  {/* =================================================
                      PAYMENT
                  ================================================== */}

                  {step === 'payment' && (

                    <div>

                      {/* =================================================
                          HEADING
                      ================================================== */}

                      <h3
                        className="
                          font-display
                          text-xl
                          font-bold
                          text-navy-900
                        "
                      >
                        Complete Your Payment
                      </h3>


                      <p
                        className="
                          mt-1
                          text-sm
                          text-navy-500
                        "
                      >
                        Secure checkout through Razorpay.
                      </p>


                      {/* =================================================
                          SELLER INFORMATION
                      ================================================== */}

                      {seller && (

                        <div
                          className="
                            mt-4
                            rounded-xl
                            border
                            border-navy-100
                            bg-white
                            px-4
                            py-3
                          "
                        >

                          <p
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-wide
                              text-navy-400
                            "
                          >
                            Paying As
                          </p>


                          <p
                            className="
                              mt-1
                              text-sm
                              font-semibold
                              text-navy-900
                            "
                          >
                            {seller.businessName}
                          </p>


                          <p
                            className="
                              mt-0.5
                              break-all
                              text-xs
                              text-navy-500
                            "
                          >
                            {seller.email}
                          </p>

                        </div>

                      )}


                      {/* =================================================
                          PLAN SUMMARY
                      ================================================== */}

              {/* =================================================
    PLAN SUMMARY + GST
================================================== */}

<div
  className="
    mt-4
    overflow-hidden
    rounded-xl
    border
    border-navy-100
    bg-navy-50
  "
>
  {/* Plan */}
  <div
    className="
      flex
      items-center
      justify-between
      gap-3
      border-b
      border-navy-100
      px-4
      py-4
    "
  >
    <div>
      <p className="text-xs text-navy-400">
        Selected Plan
      </p>

      <p className="mt-0.5 text-sm font-semibold text-navy-900">
        GlobPulse Seller Plan
      </p>
    </div>

    <div className="shrink-0 text-right">
      <p className="font-display text-xl font-bold text-navy-900">
        ₹999.00
      </p>

      <p className="text-[10px] text-navy-400">
        Base price
      </p>
    </div>
  </div>

  {/* Price Breakdown */}
  <div className="px-4 py-4">

    <div className="space-y-2">

      {/* Plan Price */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-navy-500">
          Plan Price
        </span>

        <span className="font-medium text-navy-800">
          ₹999.00
        </span>
      </div>

      {/* GST */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-navy-500">
          GST (18%)
        </span>

        <span className="font-medium text-navy-800">
          ₹179.82
        </span>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-navy-200" />

      {/* Total */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-navy-900">
            Total Payable
          </p>

          <p className="mt-0.5 text-[10px] text-navy-400">
            Inclusive of 18% GST
          </p>
        </div>

        <p className="font-display text-2xl font-bold text-navy-900">
          ₹1,178.82
        </p>
      </div>

    </div>

    {/* Benefits */}
    <div className="mt-5 border-t border-navy-100 pt-4">

      <p className="mb-3 text-xs font-semibold text-navy-700">
        Plan Includes
      </p>

      <div className="space-y-1.5">
        {planBenefits.map((benefit) => (
          <div
            key={benefit}
            className="
              flex
              items-center
              gap-2
              text-xs
              text-navy-500
            "
          >
            <CheckCircle2
              className="
                h-3.5
                w-3.5
                shrink-0
                text-green-600
              "
            />

            <span>
              {benefit}
            </span>
          </div>
        ))}
      </div>

    </div>

  </div>
</div>


                      {/* =================================================
                          RAZORPAY PAYMENT
                      ================================================== */}

                      <div
                        className="
                          mt-5
                          rounded-xl
                          border
                          border-navy-100
                          bg-navy-50/50
                          p-5
                          text-center
                          sm:p-6
                        "
                      >

                        {/* Payment Icon */}

                        <div
                          className="
                            mx-auto
                            mb-3
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            shadow-sm
                          "
                        >

                          <CreditCard
                            className="
                              h-6
                              w-6
                              text-navy-500
                            "
                          />

                        </div>


                        <p
                          className="
                            text-sm
                            font-medium
                            text-navy-700
                          "
                        >
                          Pay securely with Razorpay
                        </p>


                        <p
                          className="
                            mt-1
                            text-xs
                            leading-relaxed
                            text-navy-400
                          "
                        >
                          Cards, UPI, net banking, and wallets accepted.
                        </p>


                        {/* Pay Button */}

                        <button
                          type="button"
                          onClick={handlePayNow}
                          disabled={status === 'processing'}

                          className="
                            mt-4
                            flex
                            w-full
                            items-center
                            justify-center
                            gap-2
                            rounded-lg
                            bg-navy-900
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            transition-all
                            hover:bg-navy-800
                            hover:shadow-md
                            active:scale-[0.99]
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            focus:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-navy-900
                            focus-visible:ring-offset-2
                          "
                        >

                          {status === 'processing' ? (

                            <>
                              <span
                                className="
                                  h-4
                                  w-4
                                  animate-spin
                                  rounded-full
                                  border-2
                                  border-white/40
                                  border-t-white
                                "
                              />

                              <span>
                                Processing…
                              </span>
                            </>

                          ) : (

                            <span>
                              Pay ₹1,178.82 with Razorpay
                            </span>

                          )}

                        </button>


                        {/* Payment Error */}

                        {status === 'error' && (

                          <div
                            role="alert"
                            className="
                              mt-3
                              flex
                              items-center
                              justify-center
                              gap-1.5
                              text-xs
                              text-red-500
                            "
                          >

                            <AlertCircle
                              className="
                                h-3.5
                                w-3.5
                                shrink-0
                              "
                            />

                            <span>
                              {errorMsg ||
                                'Payment failed. Please try again.'}
                            </span>

                          </div>

                        )}

                      </div>


                      {/* =================================================
                          SECURITY
                      ================================================== */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          justify-center
                          gap-2
                          text-center
                          text-xs
                          text-navy-400
                        "
                      >

                        <Lock
                          className="
                            h-3.5
                            w-3.5
                            shrink-0
                          "
                        />

                        <span>
                          Your payment is processed securely through Razorpay
                        </span>

                      </div>


                      {/* =================================================
                          BACK TO CONFIRMATION
                      ================================================== */}

                      <button
                        type="button"

                        onClick={() => {

                          if (status !== 'processing') {

                            setStatus('idle');

                            setErrorMsg('');

                            setStep('confirmation');
                          }
                        }}

                        disabled={status === 'processing'}

                        className="
                          mt-4
                          w-full
                          rounded-lg
                          border
                          border-navy-200
                          py-2.5
                          text-sm
                          font-medium
                          text-navy-600
                          transition-colors
                          hover:bg-navy-50
                          focus:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-navy-300
                          disabled:cursor-not-allowed
                          disabled:opacity-50
                        "
                      >
                        Back
                      </button>

                    </div>

                  )}

                </>

              )}


              {/* =========================================================
                  TRUST FOOTER
              ========================================================== */}

              {!['success', 'already-active'].includes(step) && (

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-2
                    border-t
                    border-navy-100
                    pt-5
                    text-center
                    text-xs
                    text-navy-400
                  "
                >

                  <ShieldCheck
                    className="
                      h-4
                      w-4
                      shrink-0
                      text-gold-500
                    "
                  />

                  <span>
                    One-time payment | Secure checkout
                  </span>

                </div>

              )}

            </div>

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
  }