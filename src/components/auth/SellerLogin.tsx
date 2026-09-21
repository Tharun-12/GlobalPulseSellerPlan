import { useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
} from 'lucide-react';

import type { Seller } from '@/types/auth';

type SellerLoginProps = {
  onBack: () => void;
  onSuccess: (seller: Seller) => void;
};

/**
 * Laravel API base URL.
 *
 * .env:
 * VITE_API_URL=https://your-laravel-domain.com
 *
 * For local development you can also use:
 * VITE_API_URL=http://127.0.0.1:8000
 */
const API_URL =
  (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

type LoginResponse = {
  status: boolean;
  message?: string;
  token?: string;
  next_step?: string;
  seller?: {
    id: number | string;
    email: string;
    name: string;
    phone?: string | null;
    package_id?: number | null;
    pack_exp_date?: string | null;
    leadid?: number | null;
    status?: string | null;
    profile_image_url?: string | null;
  };
};

export function SellerLogin({
  onBack,
  onSuccess,
}: SellerLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState('');

  const [isLoading, setIsLoading] =
    useState(false);

  /* =========================================================
     EMAIL CHANGE
  ========================================================== */

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);

    if (error) {
      setError('');
    }
  };

  /* =========================================================
     PASSWORD CHANGE
  ========================================================== */

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);

    if (error) {
      setError('');
    }
  };

  /* =========================================================
     LOGIN
  ========================================================== */

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (isLoading) {
      return;
    }

    setError('');

    const trimmedEmail =
      email.trim().toLowerCase();

    /* =======================================================
       FRONTEND VALIDATION
    ======================================================== */

    if (!trimmedEmail || !password) {
      setError(
        'Please enter your email and password.'
      );

      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError(
        'Please enter a valid email address.'
      );

      return;
    }

    setIsLoading(true);

    try {
      /* =====================================================
         CALL REAL LARAVEL API

         POST:
         /api/seller/login

         Body:
         {
           email,
           password
         }
      ====================================================== */

      console.log(
  '🔐 Login URL:',
  `${API_URL}/api/seller/landing-login`
);

console.log(
  '🔐 Login email:',
  trimmedEmail
);

const response = await fetch(
  `${API_URL}/api/seller/landing-login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },

          body: JSON.stringify({
            email: trimmedEmail,
            password,
          }),
        }
      );

      /* =====================================================
         READ RESPONSE SAFELY
      ====================================================== */

      let data: LoginResponse;

      try {
        data = await response.json();
        console.log(
  '🔐 Login HTTP status:',
  response.status
);

console.log(
  '🔐 Login response:',
  data
);
      } catch {
        throw new Error(
          'Invalid response received from the server.'
        );
      }

      /* =====================================================
         API ERROR
      ====================================================== */

      if (!response.ok || !data.status) {
        let message =
          data.message ||
          'Login failed. Please check your email and password.';

        /*
         * Laravel validation errors can sometimes return
         * an errors object. We currently show the main message.
         */

        if (response.status === 401) {
          message =
            data.message ||
            'Incorrect email or password.';
        }

        if (response.status === 404) {
          message =
            data.message ||
            'No account found with this email.';
        }

        if (response.status === 403) {
          message =
            data.message ||
            'Your seller account cannot be accessed.';
        }

        setError(message);

        return;
      }

      /* =====================================================
         TOKEN CHECK
      ====================================================== */

      if (!data.token) {
        setError(
          'Login succeeded, but no authentication token was received.'
        );

        return;
      }

      /* =====================================================
         SELLER CHECK
      ====================================================== */

      if (!data.seller) {
        setError(
          'Login succeeded, but seller information was not received.'
        );

        return;
      }

      /* =====================================================
         STORE AUTH TOKEN

         Later all authenticated API requests can use:

         Authorization: Bearer ${token}
      ====================================================== */

      localStorage.setItem(
        'globpulse_landing_token',
        data.token
      );

      /* =====================================================
         STORE SELLER INFORMATION

         This is useful for refreshing the page later.
      ====================================================== */

      localStorage.setItem(
        'globpulse_seller',
        JSON.stringify(data.seller)
      );

      window.dispatchEvent(
        new Event('globpulse-auth-changed')
      );

      /* =====================================================
         MAP LARAVEL SELLER → FRONTEND SELLER TYPE

         Laravel currently returns:
         id
         email
         name
         phone
         package_id
         pack_exp_date
         leadid
         status
         profile_image_url

         The current React Seller type expects:
         sellerId
         fullName
         businessName
         email
         phone
         country
      ====================================================== */



const seller: Seller = {
  sellerId: String(data.seller.id),

  fullName:
    data.seller.name ||
    'GlobPulse Seller',

  businessName:
    data.seller.name ||
    'GlobPulse Seller',

  email:
    data.seller.email ||
    trimmedEmail,

  phone:
    data.seller.phone ||
    '',

  country: 'India',
};

console.log('✅ Seller login successful');
console.log('✅ Seller ID:', seller.sellerId);
console.log('✅ Seller:', seller);


      /* =====================================================
         LOGIN SUCCESS

         CheckoutModal will now receive the REAL seller.
      ====================================================== */

      onSuccess(seller);
    } catch (err) {
      console.error(
        'Seller login error:',
        err
      );

      if (
        err instanceof TypeError &&
        err.message.toLowerCase().includes('fetch')
      ) {
        setError(
          'Unable to connect to the server. Please check your API URL and try again.'
        );
      } else if (err instanceof Error) {
        setError(
          err.message ||
            'Something went wrong. Please try again.'
        );
      } else {
        setError(
          'Something went wrong. Please try again.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================== */

  return (
    <div className="w-full">

      {/* =====================================================
          BACK BUTTON
      ====================================================== */}

      <button
        type="button"
        onClick={onBack}
        disabled={isLoading}
        className="
          mb-5
          flex
          items-center
          gap-2
          rounded-md
          text-sm
          font-medium
          text-navy-500
          transition-colors
          hover:text-navy-900
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-navy-300
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        <ArrowLeft className="h-4 w-4" />

        <span>
          Back
        </span>
      </button>


      {/* =====================================================
          HEADER
      ====================================================== */}

      <div>
        <h3
          className="
            font-display
            text-2xl
            font-bold
            text-navy-900
          "
        >
          Welcome Back
        </h3>

        <p
          className="
            mt-1
            text-sm
            leading-relaxed
            text-navy-500
          "
        >
          Login with your existing GlobPulse seller
          account.
        </p>
      </div>


      {/* =====================================================
          LOGIN FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >

        {/* ===================================================
            EMAIL
        ==================================================== */}

        <div>

          <label
            htmlFor="seller-login-email"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-navy-700
            "
          >
            Email Address

            <span className="ml-1 text-red-500">
              *
            </span>
          </label>


          <div className="relative">

            <Mail
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-navy-400
              "
            />


            <input
              id="seller-login-email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@business.com"
              autoComplete="email"
              spellCheck={false}
              disabled={isLoading}
              className="
                block
                w-full
                rounded-lg
                border
                border-navy-200
                bg-white
                py-3
                pl-10
                pr-4
                text-sm
                font-medium
                text-navy-900
                caret-navy-900
                placeholder:text-navy-300
                outline-none
                transition-all
                duration-200
                focus:border-navy-500
                focus:ring-2
                focus:ring-navy-100
                disabled:cursor-not-allowed
                disabled:bg-navy-50
                disabled:opacity-70
              "
            />

          </div>

        </div>


        {/* ===================================================
            PASSWORD
        ==================================================== */}

        <div>

          <label
            htmlFor="seller-login-password"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-navy-700
            "
          >
            Password

            <span className="ml-1 text-red-500">
              *
            </span>
          </label>


          <div className="relative">

            <Lock
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-navy-400
              "
            />


            <input
              id="seller-login-password"
              name="password"
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              disabled={isLoading}
              className="
                block
                w-full
                rounded-lg
                border
                border-navy-200
                bg-white
                py-3
                pl-10
                pr-11
                text-sm
                font-medium
                text-navy-900
                caret-navy-900
                placeholder:text-navy-300
                outline-none
                transition-all
                duration-200
                focus:border-navy-500
                focus:ring-2
                focus:ring-navy-100
                disabled:cursor-not-allowed
                disabled:bg-navy-50
                disabled:opacity-70
              "
            />


            {/* =================================================
                SHOW / HIDE PASSWORD
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  previous => !previous
                )
              }
              disabled={isLoading}
              aria-label={
                showPassword
                  ? 'Hide password'
                  : 'Show password'
              }
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                rounded-md
                p-1
                text-navy-400
                transition-colors
                hover:text-navy-700
                focus:outline-none
                focus-visible:ring-2
                focus-visible:ring-navy-300
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >

              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}

            </button>

          </div>

        </div>


        {/* ===================================================
            FORGOT PASSWORD
        ==================================================== */}

        <div className="flex justify-end">

          <button
            type="button"
            disabled={isLoading}
            onClick={() => {
              setError(
                'Password reset will be available after backend integration.'
              );
            }}
            className="
              rounded
              text-xs
              font-medium
              text-navy-700
              transition-colors
              hover:text-navy-900
              hover:underline
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-navy-300
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Forgot password?
          </button>

        </div>


        {/* ===================================================
            ERROR
        ==================================================== */}

        {error && (

          <div
            role="alert"
            className="
              rounded-lg
              border
              border-red-100
              bg-red-50
              px-4
              py-3
              text-xs
              leading-relaxed
              text-red-600
            "
          >
            {error}
          </div>

        )}


        {/* ===================================================
            LOGIN BUTTON
        ==================================================== */}

        <button
          type="submit"
          disabled={isLoading}
          className="
            group
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
            disabled:cursor-not-allowed
            disabled:opacity-70
            disabled:hover:bg-navy-900
            disabled:hover:shadow-none
          "
        >

          {isLoading ? (
            <>
              <Loader2
                className="
                  h-4
                  w-4
                  animate-spin
                "
              />

              <span>
                Logging in...
              </span>
            </>
          ) : (
            <>
              <span>
                Login &amp; Continue
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
            </>
          )}

        </button>

      </form>


      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <div
        className="
          mt-5
          rounded-lg
          bg-navy-50
          px-4
          py-3
        "
      >
        <p
          className="
            text-center
            text-xs
            leading-relaxed
            text-navy-500
          "
        >
          Use your existing GlobPulse seller account.
          Your seller account will not be duplicated.
        </p>
      </div>

    </div>
  );
}