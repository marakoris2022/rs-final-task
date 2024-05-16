import axios, { AxiosInstance } from 'axios';
import { LoginProps, UserProps } from '../interfaces/interfaces';

const authHost = 'https://auth.europe-west1.gcp.commercetools.com';
const api = 'https://api.europe-west1.gcp.commercetools.com';
const projectKey = 'rsteam-games-store';
const clientId = 'wgPhvpiwHB8re0G4y3siwiJH';
const clientSecret = 'WdEJqyDjvG6W-RL1o11Meoe16kCmE3kA';
const ECommerseKey = `commerce-tools-${projectKey}`;

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

export async function tokenRequest() {
  try {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', `manage_project:${projectKey}`);

    const response = await authClient.post(`/oauth/token`, data, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const { access_token } = response.data;

    return access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data, error);
    } else if (error instanceof Error) {
      throw error;
    }
  }
}

export async function getUserToken(email: string, password: string): Promise<LoginProps | undefined | string> {
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
        ECommerseKey,
        JSON.stringify({
          [customer_id]: {
            refresh_token,
          },
        }),
      );
    }

    return access_token;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else if (error instanceof Error) {
      throw error;
    }
  }
}

export async function SignIn(email: string, password: string): Promise<void> {
  const token = await getUserToken(email, password);

  try {
    const bodyRaw = {
      email: email,
      password: password,
    };

    const response = await apiClient.post(`/${projectKey}/login`, bodyRaw, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
  const token = await tokenRequest();

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

    const response = await apiClient.post(`/${projectKey}/customers`, bodyRaw, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { customer } = response.data;
    return customer;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else if (error instanceof Error) {
      throw error;
    }
  }
}
