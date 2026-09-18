import { useEffect, useState } from 'react';

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  User,
  MapPin,
  Check,
} from 'lucide-react';

import type { Seller } from '@/types/auth';

const API_URL = (
  import.meta.env.VITE_API_URL || ''
).replace(/\/$/, '');

type SellerSignupProps = {
  onBack: () => void;

  onSuccess: (seller: Seller) => void;
};



export function SellerSignup({
  onBack,
  onSuccess,
}: SellerSignupProps) {
  /* =========================================================
     FORM STATE
  ========================================================== */

  const [fullName, setFullName] = useState('');

  const [businessName, setBusinessName] = useState('');

  const [email, setEmail] = useState('');

  const [country, setCountry] = useState('');

  const [city, setCity] = useState('');

  const [countries, setCountries] = useState<
  { country_id: number; country_name: string }[]
  >([]);

  const [loadingCountries, setLoadingCountries] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  const [phone, setPhone] = useState('');

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [error, setError] = useState('');


  /* =========================================================
     CLEAR ERROR
  ========================================================== */

  const clearError = () => {
    if (error) {
      setError('');
    }
  };


  /* =========================================================
     FULL NAME
  ========================================================== */

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFullName(e.target.value);
    clearError();
  };


  /* =========================================================
     BUSINESS NAME
  ========================================================== */

  const handleBusinessNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBusinessName(e.target.value);
    clearError();
  };


  /* =========================================================
     EMAIL
  ========================================================== */

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
    clearError();
  };


  /* =========================================================
     COUNTRY
  ========================================================== */

  const handleCountryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCountry(e.target.value);
    clearError();
  };


  /* =========================================================
     PHONE
  ========================================================== */

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value.replace(
      /[^\d+\s-]/g,
      ''
    );

    setPhone(value);
    clearError();
  };

  const handleCityChange = (
    e: React.ChangeEvent<HTMLInputElement>
    ) => {
    setCity(e.target.value);
    clearError();
    };


  /* =========================================================
     TERMS
  ========================================================== */

  const handleTermsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTermsAccepted(e.target.checked);
    clearError();
  };


  /* =========================================================
     SUBMIT
  ========================================================== */

  const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError('');

    const trimmedName = fullName.trim();

    const trimmedBusinessName =
      businessName.trim();

    const trimmedEmail =
      email.trim();

    const trimmedCountry =
      country.trim();

    const trimmedPhone =
      phone.trim();


    /* =======================================================
       REQUIRED FIELDS
    ======================================================== */

    if (
  !trimmedName ||
  !trimmedBusinessName ||
  !trimmedEmail ||
  !trimmedCountry ||
  !city.trim() ||
  !trimmedPhone
) {
      setError(
        'Please complete all required fields.'
      );

      return;
    }


    /* =======================================================
       EMAIL VALIDATION
    ======================================================== */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      setError(
        'Please enter a valid email address.'
      );

      return;
    }


    /* =======================================================
       PHONE VALIDATION
    ======================================================== */

    const phoneDigits =
      trimmedPhone.replace(/\D/g, '');

    if (
      phoneDigits.length < 10 ||
      phoneDigits.length > 15
    ) {
      setError(
        'Please enter a valid mobile number.'
      );

      return;
    }


    /* =======================================================
       TERMS VALIDATION
    ======================================================== */

    if (!termsAccepted) {
      setError(
        'Please accept the Terms & Conditions to continue.'
      );

      return;
    }


    /* =======================================================
       FRONTEND MOCK ONLY
       
       Later:
       
       POST /api/seller/register
       
       Backend will:
       
       1. Check existing email/mobile
       2. Create seller if required
       3. Return seller_id/customer_id
       4. Continue to payment
    ======================================================== */

/* =======================================================
   CREATE REAL SELLER
======================================================== */

if (!API_URL) {
  setError(
    'Registration server URL is not configured.'
  );
  return;
}

const selectedCountryId = Number(country);

if (
  !selectedCountryId ||
  !Number.isInteger(selectedCountryId)
) {
  setError(
    'Please select a valid country.'
  );
  return;
}

if (!city.trim()) {
  setError(
    'Please enter your city.'
  );
  return;
}

setSubmitting(true);

try {
  const response = await fetch(
    `${API_URL}/api/seller/signup`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },

      body: JSON.stringify({
        name: trimmedName,
        email: trimmedEmail,
        phonenumber: trimmedPhone,
        company: trimmedBusinessName,

        /*
         * Your current form does not have a website.
         * Send empty string.
         */
        company_website: '',

        city: city.trim(),

        country: selectedCountryId,

        accept_terms: true,
      }),
    }
  );

  let data: any;

  try {
    data = await response.json();
  } catch {
    setError(
      'Invalid response received from registration server.'
    );
    return;
  }

  if (!response.ok || !data?.status) {
    /*
     * Laravel validation errors
     */
    if (data?.errors) {
      const firstError = Object.values(
        data.errors
      )[0];

      if (Array.isArray(firstError)) {
        setError(String(firstError[0]));
      } else {
        setError(String(firstError));
      }
    } else {
      setError(
        data?.message ||
          'Unable to create your seller account.'
      );
    }

    return;
  }

  /*
   * Laravel signup returns seller_id and
   * sends OTP to the email address.
   */
  const sellerId = data?.seller_id;

  if (!sellerId) {
    setError(
      'Seller account was created, but seller ID was not returned.'
    );
    return;
  }

const seller: Seller = {
  sellerId: String(sellerId),

  fullName: trimmedName,

  businessName: trimmedBusinessName,

  email: trimmedEmail,

  phone: trimmedPhone,

  country:
    countries.find(
      (item) =>
        item.country_id === selectedCountryId
    )?.country_name ||
    trimmedCountry,
};

  /*
   * Signup succeeded.
   *
   * Parent will now move to OTP.
   */
  onSuccess(seller);
} catch (error) {
  console.error(
    'Seller signup error:',
    error
  );

  if (
    error instanceof TypeError &&
    error.message
      .toLowerCase()
      .includes('fetch')
  ) {
    setError(
      'Unable to connect to the registration server.'
    );
  } else {
    setError(
      error instanceof Error
        ? error.message
        : 'Something went wrong during registration.'
    );
  }
} finally {
  setSubmitting(false);
}
  };

useEffect(() => {
  const loadCountries = async () => {
    try {
      setLoadingCountries(true);
      setError('');

      /*
       * VITE_API_URL should be only the Laravel domain:
       *
       * VITE_API_URL=https://your-domain.com
       *
       * NOT:
       * VITE_API_URL=https://your-domain.com/api
       */
      const baseUrl = API_URL.replace(/\/$/, '');

      const url = `${baseUrl}/api/countries`;

      console.log('🌍 Loading countries from:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      });

      console.log(
        '🌍 Countries HTTP status:',
        response.status
      );

      const rawText = await response.text();

      console.log(
        '🌍 Countries raw response:',
        rawText
      );

      let data: any;

      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(
          `Countries API did not return JSON. HTTP ${response.status}`
        );
      }

      console.log(
        '🌍 Countries parsed response:',
        data
      );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.error ||
            `Countries API failed with HTTP ${response.status}`
        );
      }

      /*
       * Support all common Laravel response formats.
       */
      let list: any[] = [];

      if (Array.isArray(data)) {
        list = data;
      } else if (Array.isArray(data?.data)) {
        list = data.data;
      } else if (Array.isArray(data?.countries)) {
        list = data.countries;
      } else if (
        Array.isArray(data?.data?.countries)
      ) {
        list = data.data.countries;
      } else if (
        Array.isArray(data?.data?.data)
      ) {
        list = data.data.data;
      }

      console.log(
        '🌍 Countries extracted:',
        list
      );

      const normalizedCountries = list
        .map((item: any) => ({
          country_id: Number(
            item?.country_id ??
            item?.id ??
            item?.value
          ),

          country_name:
            item?.short_name ??
            item?.country_name ??
            item?.long_name ??
            item?.name ??
            item?.label ??
            '',
        }))
        .filter(
          (item) =>
            Number.isInteger(item.country_id) &&
            item.country_id > 0 &&
            item.country_name
        );

      console.log(
        '🌍 Normalized countries:',
        normalizedCountries
      );

      if (!normalizedCountries.length) {
        throw new Error(
          'Countries API returned no country records.'
        );
      }

      setCountries(normalizedCountries);

    } catch (error) {
      console.error(
        '❌ Country loading error:',
        error
      );

      setCountries([]);

      setError(
        error instanceof Error
          ? error.message
          : 'Unable to load countries.'
      );
    } finally {
      setLoadingCountries(false);
    }
  };

  loadCountries();
}, []);


  /* =========================================================
     UI
  ========================================================== */

  return (
    <div className="w-full">

      {/* =====================================================
          BACK
      ====================================================== */}

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
          transition-colors
          hover:text-navy-900
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-navy-300
        "
      >
        <ArrowLeft className="h-4 w-4" />

        <span>Back</span>
      </button>


      {/* =====================================================
          HEADER
      ====================================================== */}

      <div>
        <h3 className="
          font-display
          text-2xl
          font-bold
          text-navy-900
        ">
          Create Your Seller Account
        </h3>

        <p className="
          mt-1
          text-sm
          leading-relaxed
          text-navy-500
        ">
          Enter your basic business details to get started
          with your GlobPulse Seller Plan.
        </p>
      </div>


      {/* =====================================================
          FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >

        {/* ===================================================
            FULL NAME
        ==================================================== */}

        <div>
          <label
            htmlFor="seller-signup-name"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-navy-700
            "
          >
            Full Name

            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">

            <User
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
              id="seller-signup-name"
              name="fullName"
              type="text"
              value={fullName}
              onChange={handleNameChange}
              placeholder="Enter your full name"
              autoComplete="name"
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
              "
            />

          </div>
        </div>


        {/* ===================================================
            COMPANY NAME
        ==================================================== */}

        <div>
          <label
            htmlFor="seller-signup-business"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-navy-700
            "
          >
            Company Name

            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">

            <Building2
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
              id="seller-signup-business"
              name="businessName"
              type="text"
              value={businessName}
              onChange={handleBusinessNameChange}
              placeholder="Enter company name"
              autoComplete="organization"
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
              "
            />

          </div>
        </div>


        {/* ===================================================
            EMAIL
        ==================================================== */}

        <div>
          <label
            htmlFor="seller-signup-email"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-navy-700
            "
          >
            Business Email

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
              id="seller-signup-email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your business email"
              autoComplete="email"
              spellCheck={false}
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
              "
            />

          </div>
        </div>


        {/* ===================================================
            COUNTRY
        ==================================================== */}

        <div>
          <label
            htmlFor="seller-signup-country"
            className="
              mb-1.5
              block
              text-sm
              font-medium
              text-navy-700
            "
          >
            Country

            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <div className="relative">

            <MapPin
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                z-10
                h-4
                w-4
                -translate-y-1/2
                text-navy-400
              "
            />

            <select
  id="seller-signup-country"
  name="country"
  value={country}
  onChange={handleCountryChange}
  disabled={loadingCountries}
  className="
    block
    w-full
    appearance-none
    rounded-lg
    border
    border-navy-200
    bg-white
    py-3
    pl-10
    pr-10
    text-sm
    font-medium
    text-navy-900
    outline-none
    transition-all
    duration-200
    focus:border-navy-500
    focus:ring-2
    focus:ring-navy-100
    disabled:cursor-not-allowed
    disabled:bg-navy-50
  "
>
  <option value="">
    {loadingCountries
      ? 'Loading countries...'
      : 'Select your country'}
  </option>

  {countries.map((item) => (
    <option
      key={item.country_id}
      value={String(item.country_id)}
    >
      {item.country_name}
    </option>
  ))}
</select>

            <ArrowRight
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                h-4
                w-4
                rotate-90
                -translate-y-1/2
                text-navy-400
              "
            />

          </div>
        </div>


        <div>
  <label
    htmlFor="seller-signup-city"
    className="
      mb-1.5
      block
      text-sm
      font-medium
      text-navy-700
    "
  >
    City
    <span className="ml-1 text-red-500">*</span>
  </label>

  <div className="relative">
    <MapPin
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
      id="seller-signup-city"
      name="city"
      type="text"
      value={city}
      onChange={handleCityChange}
      placeholder="Enter your city"
      autoComplete="address-level2"
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
      "
    />
  </div>
</div>


        {/* ===================================================
            MOBILE NUMBER
        ==================================================== */}

        <div>
          <label
            htmlFor="seller-signup-phone"
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

            <Phone
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
              id="seller-signup-phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+91 98765 43210"
              autoComplete="tel"
              inputMode="tel"
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
              "
            />

          </div>
        </div>


        {/* ===================================================
            TERMS & CONDITIONS
        ==================================================== */}

        <div className="pt-1">

          <label
            htmlFor="seller-signup-terms"
            className="
              flex
              cursor-pointer
              items-start
              gap-3
              rounded-lg
              p-1
            "
          >

            <div className="relative mt-0.5 shrink-0">

              <input
                id="seller-signup-terms"
                name="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={handleTermsChange}
                className="peer sr-only"
              />

              <div
                className="
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded
                  border
                  border-navy-300
                  bg-white
                  transition-all
                  peer-checked:border-navy-900
                  peer-checked:bg-navy-900
                  peer-focus-visible:ring-2
                  peer-focus-visible:ring-navy-300
                "
              >

                {termsAccepted && (
                  <Check className="h-3.5 w-3.5 text-white" />
                )}

              </div>

            </div>


            <span className="
              text-xs
              leading-relaxed
              text-navy-500
            ">
              I accept the{' '}

              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  window.open(
                    '/terms-and-conditions',
                    '_blank',
                    'noopener,noreferrer'
                  );
                }}
                className="
                  font-medium
                  text-navy-800
                  underline
                  underline-offset-2
                  hover:text-navy-900
                "
              >
                Terms & Conditions
              </button>

              .
            </span>

          </label>

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
            CONTINUE
        ==================================================== */}

        <button
          type="submit"
          disabled={submitting}
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
          "
        >
          <span>
  {submitting
    ? 'Creating account...'
    : 'Continue'}
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

      </form>


      {/* =====================================================
          INFORMATION
      ====================================================== */}

      <div className="
        mt-5
        rounded-lg
        bg-navy-50
        px-4
        py-3
      ">
        <p className="
          text-center
          text-xs
          leading-relaxed
          text-navy-500
        ">
          Your account will be created using these details.
          You can complete your full business profile after
          activation.
        </p>
      </div>

    </div>
  );
}