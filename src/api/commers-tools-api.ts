import axios, { AxiosInstance } from 'axios';
import { ECommerceLS, IntrospectionResponse, LoginProps, UserProps } from '../interfaces/interfaces';

const authHost = import.meta.env.VITE_AUTH_HOST;
const api = import.meta.env.VITE_API;
const projectKey = import.meta.env.VITE_PROJECT_KEY;
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;
const ECommerceKey = import.meta.env.VITE_E_COMMERCE_KEY;

const basicClient: AxiosInstance = axios.create({
  baseURL: authHost,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const authClient: AxiosInstance = axios.create({
  baseURL: authHost,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const apiClient: AxiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const response: IntrospectionResponse | null = await validateAccessToken();
    if (response) {
      const { active } = response;
      if (!active) {
        await refreshTokenInLocalStorage();
      }
    } else {
      await getBasicToken();
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export async function getBasicToken() {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  data.append('scope', `manage_project:${projectKey}`);

  const response = await basicClient.post(`/oauth/token`, data, {
    auth: {
      username: clientId,
      password: clientSecret,
    },
  });

  const { access_token } = response.data;

  const jsonBody = { accessToken: access_token };

  localStorage.setItem(ECommerceKey, JSON.stringify(jsonBody));
  return JSON.stringify(jsonBody);
}

export async function login(email: string, password: string): Promise<LoginProps | undefined> {
  try {
    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', email);
    data.append('password', password);

    const response = await authClient.post(`/oauth/${projectKey}/customers/token`, data, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const { scope, refresh_token, access_token } = response.data as LoginProps;

    const customerId = scope.split(' ').find((item) => item.startsWith('customer_id'));
    if (customerId) {
      const customer_id = customerId.split(':')[1];
      localStorage.setItem(
        ECommerceKey,
        JSON.stringify({
          customerId: customer_id,
          refreshToken: refresh_token,
          accessToken: access_token,
        }),
      );
      // const customer = await getCustomerById(customer_id, access_token); REMOVE OR USE IT !?
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else if (error instanceof Error) {
      throw error;
    }
  }
}

export async function signUp(user: UserProps): Promise<void> {
  try {
    const bodyRaw = {
      key: user.key,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      dateOfBirth: user.dateOfBirth,
      title: user.title,
      addresses: user.addresses,
      isEmailVerified: user.isEmailVerified,
      shippingAddresses: user.shippingAddresses,
      billingAddresses: user.billingAddresses,
      defaultShippingAddress: user.defaultShippingAddress,
      defaultBillingAddress: user.defaultBillingAddress,
    };

    const commerceObj = localStorage.getItem(ECommerceKey);
    if (commerceObj) {
      const token = (JSON.parse(commerceObj) as ECommerceLS).accessToken;
      const response = await apiClient.post(`/${projectKey}/customers`, bodyRaw, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { customer } = response.data;
      return customer;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else if (error instanceof Error) {
      throw error;
    }
  }
}

export async function getCustomerById(id: string, accessToken: string) {
  return await axios.get(`${api}/${projectKey}/customers/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function refreshAccessToken(refreshToken: string) {
  const data = new URLSearchParams();
  data.append('grant_type', 'refresh_token');
  data.append('refresh_token', `${refreshToken}`);

  const response = await axios.post(`${authHost}/oauth/token`, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    auth: {
      username: clientId,
      password: clientSecret,
    },
  });
  const { access_token } = response.data;
  const commerceObj = localStorage.getItem(ECommerceKey);
  if (commerceObj) {
    const commerceObjParsed = JSON.parse(commerceObj) as ECommerceLS;
    commerceObjParsed.accessToken = access_token;
    localStorage.setItem(ECommerceKey, JSON.stringify(commerceObjParsed));
  }
}

async function validateAccessToken(): Promise<IntrospectionResponse | null> {
  let response = null;
  const commerceInfo = localStorage.getItem(ECommerceKey) as string | null;
  if (commerceInfo) {
    const { accessToken } = JSON.parse(commerceInfo) as ECommerceLS;
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic ' + btoa(`${clientId}:${clientSecret}`));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };

    const res = await fetch(`${authHost}/oauth/introspect?token=${accessToken}`, requestOptions);
    response = await res.json();
  }
  return response;
}

async function refreshTokenInLocalStorage() {
  const commerceInfo = localStorage.getItem(ECommerceKey) as string | null;
  if (commerceInfo) {
    const { refreshToken } = JSON.parse(commerceInfo) as ECommerceLS;
    if (refreshToken) {
      await refreshAccessToken(refreshToken);
    } else {
      await getBasicToken();
    }
  }
}
