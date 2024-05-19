import axios, { AxiosInstance } from 'axios';
import { ECommerceLS, IntrospectionResponse, LoginProps, UserProps } from '../interfaces/interfaces';

const auth_host = 'https://auth.europe-west1.gcp.commercetools.com';
const api = 'https://api.europe-west1.gcp.commercetools.com';
const projectKey = 'rsteam-games-store';
const clientId = 'wgPhvpiwHB8re0G4y3siwiJH';
const clientSecret = 'WdEJqyDjvG6W-RL1o11Meoe16kCmE3kA';
export const ECommerceKey = `commerce-tools-${projectKey}`;

const BASIC_CLIENT: AxiosInstance = axios.create({
  baseURL: auth_host,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const AUTH_CLIENT: AxiosInstance = axios.create({
  baseURL: auth_host,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

const API_CLIENT: AxiosInstance = axios.create({
  baseURL: api,
  headers: {
    'Content-Type': 'application/json',
  },
});

API_CLIENT.interceptors.request.use(
  async (config) => {
    const response: IntrospectionResponse | null = await checkAccessTokenValidation();
    if (response) {
      const { active } = response;
      if (!active) {
        const commerceInfo = localStorage.getItem(ECommerceKey) as string | null;
        if (commerceInfo) {
          const { refreshToken } = JSON.parse(commerceInfo) as ECommerceLS;
          if (refreshToken) {
            await getAccessTokenWithRefreshToken(refreshToken);
          } else {
            await getBasicToken();
          }
        }
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

/* API_CLIENT.interceptors.response.use(
  (res) => {
    if (res.status === 401) {
      const commerceInfo = localStorage.getItem(ECommerceKey) as string | null;
      if (commerceInfo) {
        const { refreshToken } = JSON.parse(commerceInfo) as ECommerceLS;
        if (refreshToken) {
          getAccessTokenWithRefreshToken(refreshToken);
        }
      }
    }
    return res;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    } else if (error instanceof Error) {
      throw error;
    }
  },
);
 */
export async function getBasicToken() {
  try {
    const data = new URLSearchParams();
    data.append('grant_type', 'client_credentials');
    data.append('scope', `manage_project:${projectKey}`);

    const response = await BASIC_CLIENT.post(`/oauth/token`, data, {
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });

    const { access_token } = response.data;
    console.log(access_token);
    localStorage.setItem(
      ECommerceKey,
      JSON.stringify({
        accessToken: access_token,
      }),
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data, error);
    } else if (error instanceof Error) {
      throw error;
    }
  }
}

export async function login(email: string, password: string): Promise<LoginProps | undefined> {
  try {
    const data = new URLSearchParams();
    data.append('grant_type', 'password');
    data.append('username', email);
    data.append('password', password);

    const response = await AUTH_CLIENT.post(`/oauth/${projectKey}/customers/token`, data, {
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
      const customer = await getCustomerById(customer_id, access_token);
      console.log(customer);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      throw new Error(error.response?.data.message);
    } else if (error instanceof Error) {
      throw error;
    }
  }
}

/* export async function login(email: string, password: string): Promise<void> {
  const token = await getUserTokens(email, password);

  try {
    const bodyRaw = {
      email: email,
      password: password,
    };

    const response = await API_CLIENT.post(`/${projectKey}/login`, bodyRaw, {
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
} */

export async function signUp(user: UserProps): Promise<void> {
  /*  const token = await getBasicToken(); */

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
      const response = await API_CLIENT.post(`/${projectKey}/customers`, bodyRaw, {
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

async function getAccessTokenWithRefreshToken(refreshToken: string) {
  try {
    const data = new URLSearchParams();
    data.append('grant_type', 'refresh_token');
    data.append('refresh_token', `${refreshToken}`);

    const response = await axios.post(`${auth_host}/oauth/token`, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      auth: {
        username: clientId,
        password: clientSecret,
      },
    });
    console.log('New token: ', response.data);
    //Check!!!!!!!!!!!!!!
    const { access_token } = response.data;
    const commersObj = localStorage.getItem(ECommerceKey);
    if (commersObj) {
      const commersObjpParsed = JSON.parse(commersObj) as ECommerceLS;
      commersObjpParsed.accessToken = access_token;
      localStorage.setItem(ECommerceKey, JSON.stringify(commersObjpParsed));
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

async function checkAccessTokenValidation(): Promise<IntrospectionResponse | null> {
  let response = null;
  const commerceInfo = localStorage.getItem(ECommerceKey) as string | null;
  if (commerceInfo) {
    const { accessToken } = JSON.parse(commerceInfo) as ECommerceLS;

    /*     const data = new URLSearchParams();
        data.append('token', `${accessToken}`);
        console.log(accessToken);
    
        const INTRO_CLIENT: AxiosInstance = axios.create({
          baseURL: auth_host,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        response = await INTRO_CLIENT.post(`/oauth/introspect`, data, {
          auth: {
            username: clientId,
            password: clientSecret,
          },
        });
      } */
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', 'Basic ' + btoa(`${clientId}:${clientSecret}`));

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
    };

    const res = await fetch(`${auth_host}/oauth/introspect?token=${accessToken}`, requestOptions);
    response = await res.json();
  }
  console.log(response);
  return response;
}
