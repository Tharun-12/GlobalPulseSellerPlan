import { useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Smartphone,
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

  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>(
  'password'
);

const [phone, setPhone] = useState('');
const [otp, setOtp] = useState('');
const [otpSent, setOtpSent] = useState(false);
const [otpSellerId, setOtpSellerId] = useState<number | null>(null);

const [otpLoading, setOtpLoading] = useState(false);
const [resendLoading, setResendLoading] = useState(false);

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
   MOBILE OTP - SEND OTP
========================================================= */

const handleSendMobileOtp = async () => {
  if (otpLoading) {
    return;
  }

  setError('');

  const cleanedPhone = phone
    .replace(/\s+/g, '')
    .replace(/-/g, '');

  const phoneRegex = /^(?:\+91)?[6-9]\d{9}$/;

  if (!cleanedPhone) {
    setError('Please enter your mobile number.');
    return;
  }

  if (!phoneRegex.test(cleanedPhone)) {
    setError('Please enter a valid Indian mobile number.');
    return;
  }

  if (!API_URL) {
    setError('VITE_API_URL is not configured.');
    return;
  }

  setOtpLoading(true);

  try {
    const response = await fetch(
      `${API_URL}/api/seller/mobile/send-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          phone: cleanedPhone,
        }),
      }
    );

    let data: {
      status?: boolean;
      message?: string;
      seller_id?: number;
      phone?: string;
      otp_expires_in?: number;
    };

    try {
      data = await response.json();
    } catch {
      throw new Error(
        'Invalid response received from the server.'
      );
    }

    console.log('📱 Mobile OTP response:', data);

    if (!response.ok || !data.status) {
      setError(
        data.message ||
          'Unable to send OTP. Please try again.'
      );
      return;
    }

    if (!data.seller_id) {
      setError(
        'OTP was sent, but seller information was not received.'
      );
      return;
    }

    setPhone(cleanedPhone);
    setOtpSellerId(Number(data.seller_id));
    setOtp('');
    setOtpSent(true);

  } catch (err) {
    console.error('Mobile OTP send error:', err);

    if (
      err instanceof TypeError &&
      err.message.toLowerCase().includes('fetch')
    ) {
      setError(
        'Unable to connect to the server. Please check your API URL.'
      );
    } else if (err instanceof Error) {
      setError(
        err.message ||
          'Unable to send OTP. Please try again.'
      );
    } else {
      setError(
        'Unable to send OTP. Please try again.'
      );
    }
  } finally {
    setOtpLoading(false);
  }
};


/* =========================================================
   MOBILE OTP - VERIFY OTP
========================================================= */

const handleVerifyMobileOtp = async () => {
  if (otpLoading) {
    return;
  }

  setError('');

  if (!otpSellerId) {
    setError(
      'Seller information is missing. Please request a new OTP.'
    );
    return;
  }

  if (!/^\d{4}$/.test(otp)) {
    setError('Please enter the 4-digit OTP.');
    return;
  }

  if (!API_URL) {
    setError('VITE_API_URL is not configured.');
    return;
  }

  setOtpLoading(true);

  try {
    const response = await fetch(
      `${API_URL}/api/seller/mobile/verify-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          phone,
          seller_id: otpSellerId,
          otp,
        }),
      }
    );

    let data: {
      status?: boolean;
      message?: string;
      token?: string;
      next_step?: string;
      seller?: {
        id: number | string;
        email?: string | null;
        phone?: string | null;
        full_name?: string | null;
        company_name?: string | null;
        package_id?: number | null;
        status?: string | null;
        leadid?: number | null;
        profile_image_url?: string | null;
        profile_complete?: boolean;
      };
    };

    try {
      data = await response.json();
    } catch {
      throw new Error(
        'Invalid response received from the server.'
      );
    }

    console.log('📱 Mobile OTP verify response:', data);

    if (!response.ok || !data.status) {
      setError(
        data.message ||
          'Invalid OTP. Please try again.'
      );
      return;
    }

    if (!data.token) {
      setError(
        'OTP login succeeded, but no authentication token was received.'
      );
      return;
    }

    if (!data.seller) {
      setError(
        'OTP login succeeded, but seller information was not received.'
      );
      return;
    }

    /* =====================================================
       STORE SAME API TOKEN USED BY PASSWORD LOGIN
    ====================================================== */

    localStorage.setItem(
      'globpulse_seller_token',
      data.token
    );

    /* =====================================================
       STORE SELLER INFORMATION
    ====================================================== */

    localStorage.setItem(
      'globpulse_seller',
      JSON.stringify(data.seller)
    );

    window.dispatchEvent(
      new Event('globpulse-auth-changed')
    );

    /* =====================================================
       MAP API SELLER → FRONTEND SELLER
    ====================================================== */

    const seller: Seller = {
      sellerId: String(data.seller.id),

      fullName:
        data.seller.full_name ||
        data.seller.company_name ||
        data.seller.email ||
        'GlobPulse Seller',

      businessName:
        data.seller.company_name ||
        data.seller.full_name ||
        'GlobPulse Seller',

      email:
        data.seller.email ||
        '',

      phone:
        data.seller.phone ||
        phone,

      country: 'India',
    };

    console.log(
      '✅ Mobile OTP login successful'
    );

    console.log(
      '✅ Seller ID:',
      seller.sellerId
    );

    onSuccess(seller);

  } catch (err) {
    console.error(
      'Mobile OTP verification error:',
      err
    );

    if (
      err instanceof TypeError &&
      err.message.toLowerCase().includes('fetch')
    ) {
      setError(
        'Unable to connect to the server. Please check your API URL.'
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
    setOtpLoading(false);
  }
};


/* =========================================================
   MOBILE OTP - RESEND
========================================================= */

const handleResendMobileOtp = async () => {
  if (
    resendLoading ||
    !otpSellerId ||
    !phone
  ) {
    return;
  }

  setError('');
  setResendLoading(true);

  try {
    const response = await fetch(
     `${API_URL}/api/seller/mobile/resend-otp`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          phone,
          seller_id: otpSellerId,
        }),
      }
    );

    const data = await response.json();

    console.log(
      '📱 Resend OTP response:',
      data
    );

    if (!response.ok || !data.status) {
      setError(
        data.message ||
          'Unable to resend OTP.'
      );
      return;
    }

    setOtp('');
    setError('');

  } catch (err) {
    console.error(
      'Resend OTP error:',
      err
    );

    setError(
      'Unable to resend OTP. Please try again.'
    );
  } finally {
    setResendLoading(false);
  }
};


/* =========================================================
   CHANGE LOGIN METHOD
========================================================= */

const switchToOtpLogin = () => {
  setLoginMethod('otp');
  setError('');
  setOtp('');
};

const switchToPasswordLogin = () => {
  setLoginMethod('password');
  setError('');
  setOtp('');
  setOtpSent(false);
  setOtpSellerId(null);
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
  `${API_URL}/api/seller/login`
);

console.log(
  '🔐 Login email:',
  trimmedEmail
);

const response = await fetch(
  `${API_URL}/api/seller/login`,
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
        'globpulse_seller_token',
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
{loginMethod === 'password' && (
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
<div className="relative my-2">
  <div className="absolute inset-0 flex items-center">
    <div className="w-full border-t border-navy-100" />
  </div>

  <div className="relative flex justify-center">
    <span className="bg-white px-3 text-xs text-navy-400">
      OR
    </span>
  </div>
</div>

<button
  type="button"
  onClick={switchToOtpLogin}
  disabled={isLoading}
  className="
    group
    flex
    w-full
    items-center
    justify-center
    gap-2
    rounded-lg
    border
    border-navy-200
    bg-white
    py-3
    text-sm
    font-semibold
    text-navy-800
    transition-all
    duration-200
    hover:border-navy-400
    hover:bg-navy-50
    hover:shadow-sm
    active:scale-[0.99]
    focus:outline-none
    focus-visible:ring-2
    focus-visible:ring-navy-300
    focus-visible:ring-offset-2
    disabled:cursor-not-allowed
    disabled:opacity-50
  "
>
  <Smartphone className="h-4 w-4" />

  <span>
    Login with Mobile OTP
  </span>

  <ArrowRight
    className="
      h-4
      w-4
      transition-transform
      group-hover:translate-x-1
    "
  />
</button>
      </form>
)}

{loginMethod === 'otp' && (
  <div className="mt-6">

    {error && (
      <div
        role="alert"
        className="
          mb-4
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

    {!otpSent ? (
      /* =====================================================
         MOBILE NUMBER
      ====================================================== */
      <div className="space-y-4">

        <div>
          <label
            htmlFor="seller-login-phone"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-navy-700
            "
          >
            Mobile Number
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">

            <Smartphone
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
              id="seller-login-phone"
              type="tel"
              value={phone}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/[^\d+]/g, '');

                setPhone(value);

                if (error) {
                  setError('');
                }
              }}
              placeholder="+91 9876543210"
              autoComplete="tel"
              maxLength={13}
              disabled={otpLoading}
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

        <button
          type="button"
          onClick={handleSendMobileOtp}
          disabled={otpLoading}
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
          "
        >
          {otpLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Sending OTP...</span>
            </>
          ) : (
            <>
              <span>Send OTP</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

      </div>
    ) : (
      /* =====================================================
         OTP VERIFICATION
      ====================================================== */
      <div className="space-y-4">

        <div>
          <p className="text-sm text-navy-500">
            Enter the 4-digit OTP sent to
          </p>

          <p className="mt-1 font-semibold text-navy-900">
            {phone}
          </p>
        </div>

        <div>
          <label
            htmlFor="seller-login-otp"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-navy-700
            "
          >
            Verification Code
          </label>

          <input
            id="seller-login-otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={otp}
            onChange={(e) => {
              const value = e.target.value
                .replace(/\D/g, '')
                .slice(0, 4);

              setOtp(value);

              if (error) {
                setError('');
              }
            }}
            placeholder="Enter 4-digit OTP"
            maxLength={4}
            disabled={otpLoading}
            autoFocus
            className="
              block
              w-full
              rounded-lg
              border
              border-navy-200
              bg-white
              px-4
              py-3
              text-center
              text-lg
              font-bold
              tracking-[0.35em]
              text-navy-900
              caret-navy-900
              placeholder:text-navy-300
              placeholder:tracking-normal
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

        <button
          type="button"
          onClick={handleVerifyMobileOtp}
          disabled={
            otpLoading ||
            otp.length !== 4
          }
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
          "
        >
          {otpLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleResendMobileOtp}
          disabled={resendLoading || otpLoading}
          className="
            w-full
            rounded-lg
            border
            border-navy-200
            py-2.5
            text-sm
            font-medium
            text-navy-700
            transition-colors
            hover:border-navy-400
            hover:text-navy-900
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {resendLoading
            ? 'Sending OTP...'
            : 'Resend OTP'}
        </button>

        <button
          type="button"
          onClick={() => {
            setOtpSent(false);
            setOtp('');
            setOtpSellerId(null);
            setError('');
          }}
          disabled={otpLoading}
          className="
            w-full
            text-sm
            font-medium
            text-navy-500
            transition-colors
            hover:text-navy-900
            hover:underline
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Change mobile number
        </button>

      </div>
    )}

    {/* SWITCH BACK TO PASSWORD LOGIN */}

    <button
      type="button"
      onClick={switchToPasswordLogin}
      disabled={otpLoading}
      className="
        mt-5
        flex
        w-full
        items-center
        justify-center
        gap-2
        rounded-lg
        border
        border-navy-200
        py-3
        text-sm
        font-medium
        text-navy-700
        transition-all
        hover:border-navy-400
        hover:bg-navy-50
        hover:text-navy-900
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      <Lock className="h-4 w-4" />
      Login with Email & Password
    </button>

  </div>
)}

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