export type Address = {
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
  additionalAddressInfo?: string;
};

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
  shippingAddresses?: number[];
  billingAddresses?: number[];
  shippingAddressIds?: string[];
  billingAddressIds?: string[];
  isEmailVerified?: boolean;
  addresses?: Array<Address>;
  defaultShippingAddressId?: string;
  defaultBillingAddressId?: string;
  version?: number;
  id?: string;
}
export interface UserPropsExtended extends UserProps {
  id: string;
  version: number;
  dateOfBirth: string;
}

export type LoginProps = {
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};

export type FormValues = {
  [key: string]: string | undefined;
};

export type CountryPostalCode = {
  Note: string;
  Country: string;
  ISO: string;
  Format: string;
  Regex: string;
  Example?: string;
};

export type ECommerceLS = {
  customerId?: string;
  refreshToken?: string;
  accessToken: string;
};

export type IntrospectionResponse = {
  active: boolean;
  client_id?: string;
  exp?: number;
  scope?: string;
};
