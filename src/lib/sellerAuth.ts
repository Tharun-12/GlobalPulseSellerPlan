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
     * 401 = token is invalid/revoked.
     *
     * Examples:
     * - seller logged out from Laravel
     * - seller changed password
     * - token was revoked
     */
    if (status === 401) {
      clearSellerAuth();

      return {
        authenticated: false,
        packageActive: false,
      };
    }

    /*
     * 404 = seller is authenticated,
     * but no package exists.
     */
    if (status === 404) {
      return {
        authenticated: true,
        packageActive: false,
      };
    }

    /*
     * 403 = seller is authenticated,
     * but access is currently forbidden.
     */
    if (status === 403) {
      return {
        authenticated: true,
        packageActive: false,
      };
    }

    /*
     * Network/server error.
     *
     * Do not delete the token because we cannot
     * confirm that the seller is actually logged out.
     */
    return {
      authenticated: false,
      packageActive: false,
    };
  }
}