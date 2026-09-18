import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import type { Seller } from '@/types/auth';

type SellerConfirmationProps = {
  seller: Seller;
  onContinue: () => void;
};

export function SellerConfirmation({
  seller,
  onContinue,
}: SellerConfirmationProps) {
  return (
    <div className="w-full">

      {/* =========================================================
          HEADER
      ========================================================== */}
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
          <CheckCircle2 className="h-7 w-7 text-green-600" />
        </div>

        <h3 className="font-display text-2xl font-bold text-navy-900">
          Confirm Your Details
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-navy-500">
          Please review your details before continuing to payment.
        </p>
      </div>

      {/* =========================================================
          SELLER DETAILS
      ========================================================== */}
      <div className="mt-6 overflow-hidden rounded-xl border border-navy-100 bg-navy-50">

        {/* Section Header */}
        <div className="border-b border-navy-100 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-400">
            Seller Account
          </p>
        </div>

        <div className="divide-y divide-navy-100">

          {/* Company Name */}
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <Building2 className="h-4 w-4 text-navy-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-navy-400">
                Company Name
              </p>

              <p className="mt-0.5 break-words text-sm font-semibold text-navy-900">
                {seller.businessName}
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <Mail className="h-4 w-4 text-navy-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-navy-400">
                Email Address
              </p>

              <p className="mt-0.5 break-all text-sm font-medium text-navy-900">
                {seller.email}
              </p>
            </div>
          </div>

          {/* Mobile */}
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <Phone className="h-4 w-4 text-navy-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-navy-400">
                Mobile Number
              </p>

              <p className="mt-0.5 text-sm font-medium text-navy-900">
                {seller.phone}
              </p>
            </div>
          </div>

          {/* Country */}
          <div className="flex items-start gap-3 px-4 py-3">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
              <MapPin className="h-4 w-4 text-navy-500" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs text-navy-400">
                Country
              </p>

              <p className="mt-0.5 text-sm font-medium text-navy-900">
                {seller.country}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* =========================================================
          PLAN SUMMARY
      ========================================================== */}
      <div className="mt-4 overflow-hidden rounded-xl border border-navy-100 bg-white">

        {/* Plan Header */}
        <div className="flex items-center justify-between gap-3 border-b border-navy-100 px-4 py-4">
          <div>
            <p className="text-xs text-navy-400">
              Selected Plan
            </p>

            <p className="mt-0.5 text-sm font-semibold text-navy-900">
              GlobPulse Seller Plan
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-display text-2xl font-bold text-navy-900">
              ₹999
            </p>

            <p className="text-[10px] text-navy-400">
              One-time payment
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="px-4 py-4">
          <p className="mb-3 text-xs font-semibold text-navy-700">
            Plan Includes
          </p>

          <div className="space-y-2.5">

            {[
              'Export-Import Course',
              '50 Buyer Credits',
              'Logo + Letterhead + Website',
              '1-Year GlobPulse Free Plan',
            ].map((item) => (
              <div
                key={item}
                className="flex items-start gap-2.5 text-xs text-navy-600"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />

                <span>{item}</span>
              </div>
            ))}

          </div>
        </div>
      </div>

      {/* =========================================================
          CONTINUE TO PAYMENT
      ========================================================== */}
      <button
        type="button"
        onClick={onContinue}
        className="
          group
          mt-5
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
          hover:shadow-md
          active:scale-[0.99]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-navy-900
          focus-visible:ring-offset-2
        "
      >
        <span>Continue to Payment</span>

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

      {/* =========================================================
          SECURITY
      ========================================================== */}
      <div className="mt-4 flex items-center justify-center gap-2 text-center text-xs text-navy-400">
        <ShieldCheck className="h-4 w-4 shrink-0 text-green-600" />

        <span>
          Secure checkout through Razorpay
        </span>
      </div>

    </div>
  );
}