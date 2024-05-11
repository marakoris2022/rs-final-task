export interface UserProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  key?: string;
  dateOfBirth?: string;
  title?: string;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
  shippingAddresses?: number;
  isEmailVerified?: boolean;
  addresses?: Array<{
    id?: string;
    title: string;
    firstName: string;
    lastName: string;
    streetName: string;
    streetNumber?: string;
    additionalStreetInfo?: string;
    postalCode: string;
    city: string;
    region?: string;
    state?: string;
    country: string;
    phone?: string;
  }>;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
}

export interface LoginProps {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
}

export interface FormValues {
  [key: string]: string | undefined;
}
