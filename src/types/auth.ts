export type Seller = {
  sellerId: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  country: string;
};

export type PackageStatus =
  | 'unknown'
  | 'active'
  | 'inactive';

export type AuthMode =
  | 'choose'
  | 'login'
  | 'signup'
  | 'otp';

export type CheckoutStep =
  | 'account'
  | 'login'
  | 'signup'
  | 'otp'
  | 'confirmation'
  | 'payment'
  | 'success'
  | 'already-active'
  | 'error';