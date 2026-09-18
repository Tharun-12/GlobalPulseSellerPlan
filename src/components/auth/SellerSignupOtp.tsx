import { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Mail,
} from 'lucide-react';

import type { Seller } from '@/types/auth';

type SellerSignupOtpProps = {
  seller: Seller;
  onBack: () => void;
  onVerified: () => void;
};

const API_URL = (
  import.meta.env.VITE_API_URL || ''
).replace(/\/$/, '');

export function SellerSignupOtp({
  seller,
  onBack,
  onVerified,
}: SellerSignupOtpProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .replace(/\D/g, '')
      .slice(0, 4);

    setOtp(value);
    setError('');
  };

  const verifyOtp = async () => {
    setError('');
    setMessage('');

    if (otp.length !== 4) {
      setError(
        'Please enter all 4 digits.'
      );
      return;
    }

    if (!API_URL) {
      setError(
        'Verification server URL is not configured.'
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/seller/verify-otp`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify({
            email: seller.email,
            otp,
          }),
        }
      );

      let data: any;

      try {
        data = await response.json();
      } catch {
        setError(
          'Invalid response received from verification server.'
        );
        return;
      }

      if (!response.ok || !data?.status) {
        setError(
          data?.message ||
            'OTP verification failed.'
        );
        return;
      }


      /*
       * IMPORTANT:
       *
       * We are NOT expecting a token here.
       *
       * Your existing Laravel API only verifies the
       * email and sends the login credentials.
       */
      setMessage(
        'Email verified successfully. Your login credentials have been sent to your email. Please use those credentials to log in.'
        );


      /*
       * Give the user a moment to see the message,
       * then continue to login.
       */
      setTimeout(() => {
        onVerified();
      }, 1200);
    } catch (error) {
      console.error(
        'OTP verification error:',
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : 'Unable to verify OTP.'
      );
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setError('');
    setMessage('');

    if (!API_URL) {
      setError(
        'Registration server URL is not configured.'
      );
      return;
    }

    setResending(true);

    try {
      const response = await fetch(
        `${API_URL}/api/seller/resend-otp`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify({
            email: seller.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data?.status) {
        setError(
          data?.message ||
            'Unable to resend OTP.'
        );
        return;
      }

      setOtp('');

      setMessage(
        data?.message ||
          'A new verification code has been sent to your email.'
      );
    } catch (error) {
      console.error(
        'Resend OTP error:',
        error
      );

      setError(
        'Unable to resend the verification code.'
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full">

      <button
        type="button"
        onClick={onBack}
        className="
          mb-5
          flex
          items-center
          gap-2
          rounded-md
          text-sm
          font-medium
          text-navy-500
          hover:text-navy-900
        "
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button>

      <div className="text-center">

        <div
          className="
            mx-auto
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-navy-50
          "
        >
          <Mail className="h-6 w-6 text-navy-700" />
        </div>

        <h3
          className="
            mt-4
            font-display
            text-2xl
            font-bold
            text-navy-900
          "
        >
          Verify Your Email
        </h3>

        <p
          className="
            mt-2
            text-sm
            leading-relaxed
            text-navy-500
          "
        >
          We sent a 4-digit verification code to
        </p>

        <p
          className="
            mt-1
            break-all
            text-sm
            font-semibold
            text-navy-800
          "
        >
          {seller.email}
        </p>

      </div>

      <div className="mt-6">

        <label
          htmlFor="seller-signup-otp"
          className="
            mb-2
            block
            text-sm
            font-medium
            text-navy-700
          "
        >
          Enter verification code
        </label>

        <input
          id="seller-signup-otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={4}
          value={otp}
          onChange={handleOtpChange}
          placeholder="0000"
          className="
            w-full
            rounded-lg
            border
            border-navy-200
            bg-white
            px-4
            py-4
            text-center
            text-2xl
            font-bold
            tracking-[0.5em]
            text-navy-900
            outline-none
            focus:border-navy-500
            focus:ring-2
            focus:ring-navy-100
          "
        />

      </div>

      {error && (
        <div
          role="alert"
          className="
            mt-4
            rounded-lg
            border
            border-red-100
            bg-red-50
            px-4
            py-3
            text-xs
            text-red-600
          "
        >
          {error}
        </div>
      )}

      {message && (
        <div
          className="
            mt-4
            rounded-lg
            border
            border-green-100
            bg-green-50
            px-4
            py-3
            text-xs
            text-green-700
          "
        >
          {message}
        </div>
      )}

      <button
        type="button"
        onClick={verifyOtp}
        disabled={loading || otp.length !== 4}
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
          hover:bg-navy-800
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <span>
          {loading
            ? 'Verifying...'
            : 'Verify Email'}
        </span>

        {!loading && (
          <ArrowRight
            className="
              h-4
              w-4
              transition-transform
              group-hover:translate-x-1
            "
          />
        )}
      </button>

      <div className="mt-5 text-center">

        <button
          type="button"
          onClick={resendOtp}
          disabled={resending}
          className="
            text-sm
            font-medium
            text-navy-700
            underline
            underline-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {resending
            ? 'Sending...'
            : 'Resend Code'}
        </button>

      </div>

    </div>
  );
}