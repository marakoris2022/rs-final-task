import axios, { AxiosInstance } from 'axios';
import { LoginProps, UserProps } from '../interfaces/interfaces';

const auth_host = 'https://auth.europe-west1.gcp.commercetools.com';
const api = 'https://api.europe-west1.gcp.commercetools.com';
const projectKey = 'rsteam-games-store';
const clientId = 'wgPhvpiwHB8re0G4y3siwiJH';
const clientSecret = 'WdEJqyDjvG6W-RL1o11Meoe16kCmE3kA';
const ECommerseKey = `commerce-tools-${projectKey}`;

const auth_client: AxiosInstance = axios.create({
    baseURL: auth_host,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
});

const api_client: AxiosInstance = axios.create({
    baseURL: api,
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${await tokenRequest()}`
    }
});

export async function tokenRequest() {
    try {

        const data = new URLSearchParams();
        data.append('grant_type', 'client_credentials');
        data.append('scope', `manage_project:${projectKey}`);


        const response = await auth_client.post(`/oauth/token`, data, {
            auth: {
                username: clientId,
                password: clientSecret,
            }
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

export async function login(email: string, password: string): Promise<LoginProps | undefined> {


    try {
        const data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('username', email);
        data.append('password', password);

        const response = await auth_client.post(`/oauth/${projectKey}/customers/token`, data, {
            auth: {
                username: clientId,
                password: clientSecret,
            }
        });

        const { scope, refresh_token } = response.data as LoginProps;

        const customerId = scope.split(' ').find((item) => item.startsWith('customer_id'));
        if (customerId) {
            const customer_id = customerId.split(':')[1];
            localStorage.setItem(ECommerseKey, JSON.stringify({
                [customer_id]: {
                    refresh_token
                }
            }))
        }

        return response.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data.message)
        } else if (error instanceof Error) {
            throw error;
        }
    }
}

export async function signUp(user: UserProps): Promise<void> {

    try {

        const bodyRaw = {
            "email": user.email,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "password": user.password,
            "addresses": user.addresses,
            "defaultShippingAddressId": user.defaultShippingAddressId,
            "defaultBillingAddressId": user.defaultBillingAddressId,
        };

        const response = await api_client.post(`/${projectKey}/customers`, bodyRaw);
        const { customer } = response.data

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data, error);
        } else if (error instanceof Error) {
            throw error;
        }
    }
}


