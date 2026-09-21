const API_URL =
  (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const LANDING_TOKEN_KEY = 'globpulse_landing_token';

export type SellerPackageResponse = {
  status: boolean;
  message?: string;

  seller?: {
    id: number | string;
    email?: string;
    name?: string;
    phone?: string | null;

    package_id?: number | null;
    pending_package_id?: number | null;
    effective_package_id?: number | null;

    plan_start_date?: string | null;
    plan_expiry_date?: string | null;
    pack_exp_date?: string | null;

    days_left?: number | null;

    payment_status?: string | null;

    paid_amount?: number;
    pending_amount?: number;
    paid_amount_with_gst?: number;
    pending_amount_with_gst?: number;
  };

  package?: {
    id: number | string;
    package_name?: string;
    subtitle?: string;
    price?: number;
    offer_price?: number;
    mrp_price?: number;
    is_active?: boolean;
  };

  package_id?: number | null;
  pack_exp_date?: string | null;
  payment_status?: string | null;
};


/* =========================================================
   GET LANDING AUTH TOKEN
========================================================= */

export function getSellerToken(): string | null {
  return localStorage.getItem(LANDING_TOKEN_KEY);
}


/* =========================================================
   CHECK CURRENT SELLER PACKAGE
========================================================= */

export async function getSellerPackage(): Promise<SellerPackageResponse> {
  const token = getSellerToken();

  if (!token) {
    const error = new Error(
      'Seller authentication token is missing.'
    ) as Error & { status?: number };

    error.status = 401;

    throw error;
  }

  if (!API_URL) {
    throw new Error(
      'VITE_API_URL is not configured.'
    );
  }

  const response = await fetch(
    `${API_URL}/api/seller/landing-my-package`,
    {
      method: 'GET',

      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  let data: SellerPackageResponse;

  try {
    data = await response.json();
  } catch {
    const error = new Error(
      'Invalid package response received from server.'
    ) as Error & { status?: number };

    error.status = response.status;

    throw error;
  }

  if (!response.ok || !data.status) {
    const error = new Error(
      data.message ||
        'Unable to check seller package status.'
    ) as Error & { status?: number };

    error.status = response.status;

    throw error;
  }

  return data;
}


/* =========================================================
   LANDING PAGE LOGOUT
========================================================= */

export async function logoutSeller(): Promise<void> {
  const token = getSellerToken();

  /*
   * If there is no token, simply clear local auth.
   */
  if (!token) {
    localStorage.removeItem(LANDING_TOKEN_KEY);
    return;
  }

  if (!API_URL) {
    localStorage.removeItem(LANDING_TOKEN_KEY);
    return;
  }

  try {
    await fetch(
      `${API_URL}/api/seller/landing-logout`,
      {
        method: 'POST',

        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    /*
     * Even if the server is unreachable,
     * clear the local landing session.
     */
    console.error(
      'Landing logout request failed:',
      error
    );
  } finally {
    localStorage.removeItem(LANDING_TOKEN_KEY);
    localStorage.removeItem('globpulse_seller');
    localStorage.removeItem('globpulse_checkout_state');

    window.dispatchEvent(
      new Event('globpulse-auth-changed')
    );
  }
}


/* =========================================================
   CHECK ₹999 PACKAGE
========================================================= */

export function is999PlanActive(
  response: SellerPackageResponse
): boolean {

  const seller = response.seller;
  const packageData = response.package;

  /*
   * No seller information means we cannot
   * confirm that the plan is active.
   */
  if (!seller) {
    return false;
  }

  /*
   * No package information means we cannot
   * safely confirm the ₹999 package.
   */
  if (!packageData) {
    return false;
  }

  /* =======================================================
     ₹999 PACKAGE ID
  ======================================================== */

  const PACKAGE_ID = 11;

  /*
   * Seller's current package.
   */
  const packageId = Number(
    seller.package_id || 0
  );

  /*
   * Effective package.
   */
  const effectivePackageId = Number(
    seller.effective_package_id || 0
  );

  /*
   * Package returned by Laravel.
   */
  const returnedPackageId = Number(
    packageData.id || 0
  );

  /* =======================================================
     VERIFY PACKAGE
  ======================================================== */

  const has999Package =
    packageId === PACKAGE_ID ||
    effectivePackageId === PACKAGE_ID ||
    returnedPackageId === PACKAGE_ID;

  if (!has999Package) {
    return false;
  }

  /* =======================================================
     VERIFY PACKAGE IS ACTIVE
  ======================================================== */

  if (packageData.is_active === false) {
    return false;
  }

  /* =======================================================
     VERIFY PAYMENT STATUS
  ======================================================== */

  const paymentStatus = String(
    seller.payment_status ||
      response.payment_status ||
      'full'
  )
    .toLowerCase()
    .trim();

  if (paymentStatus !== 'full') {
    return false;
  }

  /* =======================================================
     VERIFY PLAN EXPIRY
  ======================================================== */

  const expiryDate =
    seller.plan_expiry_date ||
    seller.pack_exp_date ||
    response.pack_exp_date ||
    null;

  if (expiryDate) {

    const expiry = new Date(expiryDate);

    /*
     * Invalid expiry date should not be treated
     * as an active plan.
     */
    if (Number.isNaN(expiry.getTime())) {
      return false;
    }

    /*
     * Expired plan.
     */
    if (expiry.getTime() < Date.now()) {
      return false;
    }
  }

  /* =======================================================
     ALL CHECKS PASSED
  ======================================================== */

  return true;
}