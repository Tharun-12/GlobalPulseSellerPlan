import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

type AlreadyActiveProps = {
  sellerName: string;
  onContinue: () => void;
};

export function AlreadyActive({
  sellerName,
  onContinue,
}: AlreadyActiveProps) {
  return (
    <div className="w-full py-3 text-center sm:py-4">

      {/* =====================================================
          SUCCESS ICON
      ====================================================== */}

      <div
        className="
          mx-auto
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          bg-[#e8f7f7]
          ring-8
          ring-[#f4fbfb]
        "
      >
        <CheckCircle2
          className="
            h-9
            w-9
            text-[#2fa7b3]
          "
          strokeWidth={2.2}
        />
      </div>


      {/* =====================================================
          HEADING
      ====================================================== */}

      <h3
        className="
          mt-5
          font-display
          text-xl
          font-bold
          text-navy-900
          sm:text-2xl
        "
      >
        Your Plan Is Already Active
      </h3>


      {/* =====================================================
          DESCRIPTION
      ====================================================== */}

      <p
        className="
          mx-auto
          mt-2
          max-w-sm
          text-sm
          leading-relaxed
          text-slate-500
        "
      >
        Welcome back,{' '}

        <span className="font-semibold text-navy-900">
          {sellerName}
        </span>
        .

        <br />

        Your ₹999 GlobPulse Seller Plan is already active.
      </p>


      {/* =====================================================
          PLAN STATUS
      ====================================================== */}

      <div
        className="
          mt-6
          rounded-xl
          border
          border-[#cde9eb]
          bg-[#f4fbfb]
          p-4
          text-left
        "
      >

        <div className="flex items-start gap-3">

          {/* Status Icon */}

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              border
              border-[#d8eef0]
            "
          >
            <CheckCircle2
              className="
                h-5
                w-5
                text-[#2fa7b3]
              "
              strokeWidth={2.2}
            />
          </div>


          {/* Status Text */}

          <div className="min-w-0 flex-1">

            <p
              className="
                text-sm
                font-semibold
                text-[#167985]
              "
            >
              Seller Plan Active
            </p>

            <p
              className="
                mt-1
                text-xs
                leading-relaxed
                text-slate-500
              "
            >
              You do not need to make another ₹999 payment.
              You can continue to your seller dashboard.
            </p>

          </div>

        </div>

      </div>


      {/* =====================================================
          DASHBOARD BUTTON
      ====================================================== */}

      <button
        type="button"
        onClick={onContinue}
        className="
          group
          mt-6
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
          duration-200
          hover:bg-navy-800
          hover:shadow-lg
          active:scale-[0.99]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-navy-900
          focus-visible:ring-offset-2
        "
      >

        <span>
          Go to Seller Dashboard
        </span>

        <ArrowRight
          className="
            h-4
            w-4
            transition-transform
            duration-200
            group-hover:translate-x-1
          "
        />

      </button>


      {/* =====================================================
          ACCOUNT STATUS
      ====================================================== */}

      <div
        className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          text-center
          text-xs
          text-slate-400
        "
      >

        <ShieldCheck
          className="
            h-4
            w-4
            shrink-0
            text-[#2fa7b3]
          "
          strokeWidth={2}
        />

        <span>
          Your existing seller account remains unchanged.
        </span>

      </div>

    </div>
  );
}