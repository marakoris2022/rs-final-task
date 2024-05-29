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

export interface UserDataBasic {
  version: number;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

interface UserDataPassword {
  version: number;
  currentPassword: string;
  newPassword: string;
}

export const updateBasicUserData = async (userId: string, updatedUserData: UserDataBasic) => {
  const apiUrl = `${api}/${projectKey}/customers/${userId}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: updatedUserData.version,
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

  const updatedUserDataResponse = await response.json();

  return updatedUserDataResponse;
};

export const updateUserPassword = async (userId: string, updatedUserData: UserDataPassword) => {
  const apiUrl = `${api}/${projectKey}/customers/password`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    id: userId,
    version: updatedUserData.version,
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

  const updatedUserDataResponse = await response.json();

  return updatedUserDataResponse;
};

export const addNewAddress = async (userId: string, userData: UserPropsExtended, newAddressData: Address) => {
  const apiUrl = `${api}/${projectKey}/customers/${userId}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: userData.version,
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
      resp = await addAddressType(userId, addNewAddressResponse, AddressTypes.SHIPPING);
    } else {
      resp = await addAddressType(userId, addNewAddressResponse, AddressTypes.BILLING);
    }

    return resp;
  }
};

const addAddressType = async (userId: string, userData: UserPropsExtended, type: string) => {
  const apiUrl = `${api}/${projectKey}/customers/${userId}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

    let lastAddressId;

    if (userData.addresses) {
      lastAddressId = userData.addresses[userData.addresses.length - 1].id;
    }

    const requestBody = {
      version: userData.version,
      actions: [
        {
          action: type,
          addressId: lastAddressId,
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

    return response.json();
  }
};

export const removeAddress = async (userId: string, userData: UserPropsExtended | null, addressId: string) => {
  const apiUrl = `${api}/${projectKey}/customers/${userId}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: userData!.version,
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
  userId: string,
  userData: UserPropsExtended,
  typeOfAddress: DefaultAddressTypes,
  addressId: string | undefined,
) => {
  const apiUrl = `${api}/${projectKey}/customers/${userId}`;
  const commerceObj = localStorage.getItem(ECommerceKey);
  let accessToken;

  if (commerceObj) {
    accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
  }

  const requestBody = {
    version: userData!.version,
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

// const addBillingAddressId = async (userId: string, data) => {
//   const apiUrl = `${api}/${projectKey}/customers/${userId}`;
//   const commerceObj = localStorage.getItem(ECommerceKey);
//   let accessToken;

//   if (commerceObj) {
//     accessToken = (JSON.parse(commerceObj) as ECommerceLS).accessToken;

//     const requestBody = {
//       version: data.version,
//       actions: [
//         {
//           action: 'addBillingAddressId',
//           addressId: data.addresses[data.addresses.length - 1].id,
//         },
//       ],
//     };

//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Failed to create address');
//     }

//     return response.json();
//   }
// };

// const requestBody = {
//   version: newAddressData.version,
//   action: 'addAddress',
//   address: newAddressData.data,
// };
