import axios, { AxiosInstance } from 'axios';
/* import { stringify } from 'querystring'; */

const auth_host = 'https://auth.europe-west1.gcp.commercetools.com';
const api = 'https://api.europe-west1.gcp.commercetools.com';
const projectKey = 'rsteam-games-store';
const clientId = 'wgPhvpiwHB8re0G4y3siwiJH';
const clientSecret = 'WdEJqyDjvG6W-RL1o11Meoe16kCmE3kA';



/* const url = `${auth_host}/oauth/token?grant_type=client_credentials&scope=manage_project:${projectKey}`; */

const auth_client: AxiosInstance = axios.create({
    baseURL: auth_host,
    headers: {
        /*             'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`), */
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

        // Handle the successful response, e.g., storing tokens securely
        const { access_token } = response.data;
        console.log('Logged in successfully');
        console.log('Access token:', access_token);

        return access_token;

        // Save tokens securely (e.g., in secure storage)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data, error);
        } else if (error instanceof Error) {
            throw error;
        }
    }
}

export async function login(email: string, password: string): Promise<void> {

    try {
        const data = new URLSearchParams();
        data.append('grant_type', 'password');
        data.append('username', email);
        data.append('password', password);


        /* const data = stringify({
            'grant_type': 'password',
            'username': email,
            'password': password,
        }) */

        const response = await auth_client.post(`/oauth/${projectKey}/customers/token`, data, {
            auth: {
                username: clientId,
                password: clientSecret,
            }
        });

        // Handle the successful response, e.g., storing tokens securely
        const { access_token, refresh_token } = response.data;
        console.log('Logged in successfully');
        console.log('Access token:', access_token);
        console.log('Refresh token:', refresh_token);

        // Save tokens securely (e.g., in secure storage)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data, error);
        } else if (error instanceof Error) {
            throw error;
        }
    }
}

interface UserProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    addresses?: Array<{
        id: string;
        title?: string;
        firstName?: string;
        lastName?: string;
        streetName: string;
        streetNumber: string;
        additionalStreetInfo?: string;
        postalCode: string;
        city: string;
        region?: string;
        state?: string;
        country: string;
        phone?: string;
    }>,
    defaultShippingAddressId?: string;
    defaultBillingAddressId?: string;
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

        console.log('Logged in successfully');
        const { customer } = response.data
        console.log('Customer:', customer);


    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error(error.response?.data, error);
        } else if (error instanceof Error) {
            throw error;
        }
    }
}


