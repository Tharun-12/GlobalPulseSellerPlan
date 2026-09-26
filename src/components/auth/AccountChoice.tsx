import {
  ArrowRight,
  Building2,
  UserPlus,
  LogIn,
} from 'lucide-react';

type AccountChoiceProps = {
  onLogin: () => void;
  onSignup: () => void;
};

export function AccountChoice({
  onLogin,
  onSignup,
}: AccountChoiceProps) {
  return (
    <div className="space-y-5">

      {/* =========================================================
          HEADING
      ========================================================== */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-50">
          <Building2 className="h-7 w-7 text-navy-900" />
        </div>

        <h3 className="font-display text-2xl font-bold text-navy-900">
          Get Started with GlobPulse
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-navy-500">
          Activate your ₹999 Seller Plan and start growing your
          business with GlobPulse.
        </p>
      </div>

      {/* =========================================================
          EXISTING SELLER
      ========================================================== */}
      <button
        type="button"
        onClick={onLogin}
        aria-label="Login with existing GlobPulse seller account"
        className="
          group
          w-full
          rounded-xl
          border
          border-navy-200
          bg-white
          p-4
          text-left
          transition-all
          duration-200
          hover:border-navy-400
          hover:shadow-md
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-navy-900
          focus-visible:ring-offset-2
        "
      >
        <div className="flex items-center gap-4">

          {/* Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-navy-900 text-white">
            <LogIn className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-navy-900">
              Continue as an Existing Seller
            </p>

            <p className="mt-1 text-xs leading-relaxed text-navy-500">
              Login and continue with your existing seller account.
            </p>
          </div>

          {/* Arrow */}
          <ArrowRight
            className="
              h-5
              w-5
              shrink-0
              text-navy-300
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </div>
      </button>

      {/* =========================================================
          NEW SELLER
      ========================================================== */}
      <button
        type="button"
        onClick={onSignup}
        aria-label="Create a new GlobPulse seller account"
        className="
          group
          w-full
          rounded-xl
          border
          border-navy-200
          bg-white
          p-4
          text-left
          transition-all
          duration-200
          hover:border-gold-400
          hover:shadow-md
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-gold-500
          focus-visible:ring-offset-2
        "
      >
        <div className="flex items-center gap-4">

          {/* Icon */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gold-500 text-white">
            <UserPlus className="h-5 w-5" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-navy-900">
              I'm new to GlobPulse
            </p>

            <p className="mt-1 text-xs leading-relaxed text-navy-500">
              Create a seller account and activate the ₹999 plan.
            </p>
          </div>

          {/* Arrow */}
          <ArrowRight
            className="
              h-5
              w-5
              shrink-0
              text-navy-300
              transition-transform
              duration-200
              group-hover:translate-x-1
            "
          />
        </div>
      </button>

      {/* =========================================================
          TRUST MESSAGE
      ========================================================== */}
      <div className="border-t border-navy-100 pt-4 text-center">
        <p className="text-xs text-navy-400">
          One-time payment • Secure checkout • Razorpay
        </p>
      </div>

    </div>
  );
}

