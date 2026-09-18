import {
  getSellerPackage,
  is999PlanActive,
} from './sellerApi';

const TOKEN_KEY = 'globpulse_seller_token';
const SELLER_KEY = 'globpulse_seller';
const CHECKOUT_STATE_KEY = 'globpulse_checkout_state';

type SellerAuthResult = {
  authenticated: boolean;
  packageActive: boolean;
};

export function getSellerToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearSellerAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(SELLER_KEY);
  localStorage.removeItem(CHECKOUT_STATE_KEY);

  window.dispatchEvent(
    new Event('globpulse-auth-changed')
  );
}

export async function validateSellerAuth(): Promise<SellerAuthResult> {
  const token = getSellerToken();

  if (!token) {
    return {
      authenticated: false,
      packageActive: false,
    };
  }

  try {
    const packageResponse =
      await getSellerPackage();

    return {
      authenticated: true,
      packageActive:
        is999PlanActive(packageResponse),
    };
  } catch (error) {
    const status =
      error instanceof Error
        ? (error as Error & { status?: number }).status
        : undefined;

    /*
     * 401 = seller authentication is invalid.
     *
     * This can happen if:
     * - seller was deleted
     * - token is invalid
     * - token is expired
     */
    if (status === 401) {
      clearSellerAuth();

      return {
        authenticated: false,
        packageActive: false,
      };
    }

    /*
     * 404 = seller exists but package
     * was not found.
     *
     * Seller remains authenticated,
     * but package is inactive.
     */
    return {
      authenticated: true,
      packageActive: false,
    };
  }
}