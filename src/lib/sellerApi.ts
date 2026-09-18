const API_URL =
  (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const SELLER_TOKEN_KEY = 'globpulse_seller_token';

export type SellerPackageResponse = {
  status: boolean;
  message?: string;

  data?: {
    seller?: {
      id: number | string;

      package_id?: number | null;
      pending_package_id?: number | null;
      effective_package_id?: number | null;

      plan_start_date?: string | null;
      plan_expiry_date?: string | null;
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
  };
};

/* =========================================================
   GET AUTH TOKEN
========================================================= */

export function getSellerToken(): string | null {
  return localStorage.getItem(SELLER_TOKEN_KEY);
}

/* =========================================================
   CHECK CURRENT SELLER PACKAGE
========================================================= */

export async function getSellerPackage(): Promise<SellerPackageResponse> {
  const token = getSellerToken();

  if (!token) {
    throw new Error(
      'Seller authentication token is missing.'
    );
  }

  if (!API_URL) {
    throw new Error(
      'VITE_API_URL is not configured.'
    );
  }

  const response = await fetch(
    `${API_URL}/api/seller/my-package`,
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
    throw new Error(
      'Invalid package response received from server.'
    );
  }

  if (!response.ok || !data.status) {
    throw new Error(
      data.message ||
        'Unable to check seller package status.'
    );
  }

  return data;
}

/* =========================================================
   CHECK ₹999 PACKAGE
========================================================= */

export function is999PlanActive(
  response: SellerPackageResponse
): boolean {
  const seller = response.data?.seller;
  const packageData = response.data?.package;

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
   *
   * This is useful with your existing package
   * / partial-payment logic.
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

  /*
   * If Laravel explicitly says the package is inactive,
   * do not treat it as an active ₹999 plan.
   */
  if (packageData.is_active === false) {
    return false;
  }

  /* =======================================================
     VERIFY PAYMENT STATUS
  ======================================================== */

  const paymentStatus = String(
    seller.payment_status || 'full'
  ).toLowerCase().trim();

  /*
   * The seller must have completed payment.
   */
  if (paymentStatus !== 'full') {
    return false;
  }

  /* =======================================================
     VERIFY PLAN EXPIRY
  ======================================================== */

  /*
   * If an expiry date exists, make sure it has
   * not already expired.
   */
  if (seller.plan_expiry_date) {
    const expiry = new Date(
      seller.plan_expiry_date
    );

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