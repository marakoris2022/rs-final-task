import { Address, ECommerceLS, UserPropsExtended } from '../interfaces/interfaces';

const api = import.meta.env.VITE_API;
const projectKey = import.meta.env.VITE_PROJECT_KEY;
const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

export enum AddressTypes {
  SHIPPING = 'addShippingAddressId',
  BILLING = 'addBillingAddressId',
}

export enum DefaultAddressTypes {
  SHIPPING = 'setDefaultShippingAddress',
  BILLING = 'setDefaultBillingAddress',
}

export enum RemoveAddressTypes {
  SHIPPING = 'removeShippingAddressId',
  BILLING = 'removeBillingAddressId',
}

export interface UserDataBasic {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface UserDataPassword {
  currentPassword: string;
  newPassword: string;
}

export const updateBasicUserData = async (user: UserPropsExtended, updatedUserData: UserDataBasic) => {
  const apiUrl = `${api}/${projectKey}/customers/${user.id}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: user.version,
    actions: [
      { action: 'changeEmail', email: updatedUserData.email },
      { action: 'setFirstName', firstName: updatedUserData.firstName },
      { action: 'setLastName', lastName: updatedUserData.lastName },
      { action: 'setDateOfBirth', dateOfBirth: updatedUserData.dateOfBirth },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update user data');
  }

  const updatedUserDataResponse: UserPropsExtended = await response.json();

  return updatedUserDataResponse;
};

export const updateUserPassword = async (user: UserPropsExtended, updatedUserData: UserDataPassword) => {
  const apiUrl = `${api}/${projectKey}/customers/password`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    id: user.id,
    version: user.version,
    currentPassword: updatedUserData.currentPassword,
    newPassword: updatedUserData.newPassword,
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update password');
  }

  const updatedUserDataResponse: UserPropsExtended = await response.json();

  return updatedUserDataResponse;
};

export const addNewAddress = async (user: UserPropsExtended, newAddressData: Address) => {
  const apiUrl = `${api}/${projectKey}/customers/${user.id}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: user.version,
    actions: [
      {
        action: 'addAddress',
        address: newAddressData,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create address');
  }

  const addNewAddressResponse: UserPropsExtended = await response.json();

  if (addNewAddressResponse.addresses) {
    const lastAddress = addNewAddressResponse?.addresses[addNewAddressResponse.addresses?.length - 1];

    let resp: UserPropsExtended;

    if (lastAddress.additionalAddressInfo === AddressTypes.SHIPPING) {
      resp = await addAddressType(addNewAddressResponse, AddressTypes.SHIPPING, lastAddress.id);
    } else {
      resp = await addAddressType(addNewAddressResponse, AddressTypes.BILLING, lastAddress.id);
    }

    return resp;
  }
};

export const addAddressType = async (user: UserPropsExtended, type: AddressTypes, addressId: string | undefined) => {
  const apiUrl = `${api}/${projectKey}/customers/${user.id}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: user.version,
    actions: [
      {
        action: type,
        addressId,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create address');
  }

  const updatedUserDataResponse: UserPropsExtended = await response.json();

  return updatedUserDataResponse;
};

export const removeAddress = async (user: UserPropsExtended | null, addressId: string) => {
  const apiUrl = `${api}/${projectKey}/customers/${user!.id}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: user!.version,
    actions: [
      {
        action: 'removeAddress',
        addressId,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create address');
  }

  const resp: UserPropsExtended = await response.json();

  return resp;
};

export const setDefaultAddressType = async (
  user: UserPropsExtended,
  typeOfAddress: DefaultAddressTypes,
  addressId: string | undefined,
) => {
  const apiUrl = `${api}/${projectKey}/customers/${user.id}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: user.version,
    actions: [
      {
        action: typeOfAddress,
        addressId,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create address');
  }

  const resp: UserPropsExtended = await response.json();

  return resp;
};

export const removeAddressType = async (
  user: UserPropsExtended | null,
  type: RemoveAddressTypes,
  addressId: string | undefined,
) => {
  const apiUrl = `${api}/${projectKey}/customers/${user!.id}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: user!.version,
    actions: [
      {
        action: type,
        addressId,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create address');
  }

  const resp: UserPropsExtended = await response.json();

  return resp;
};

export const changeAddress = async (user: UserPropsExtended, addressData: Address, addressId: string | undefined) => {
  const apiUrl = `${api}/${projectKey}/customers/${user.id}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: user.version,
    actions: [
      {
        action: 'changeAddress',
        addressId,
        address: addressData,
      },
    ],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to create address');
  }

  const resp: UserPropsExtended = await response.json();

  return resp;
};
