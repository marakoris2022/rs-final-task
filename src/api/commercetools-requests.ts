import axios from 'axios'
import CountryCode from './country-codes'

const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com'
const API_URL = 'https://api.europe-west1.gcp.commercetools.com'
const PROJECT_KEY = 'rsteam-games-store'
const CLIENT_ID = 'wgPhvpiwHB8re0G4y3siwiJH'
const CLIENT_SECRET = 'WdEJqyDjvG6W-RL1o11Meoe16kCmE3kA'

interface DataToCreateCustomer {
  email: string
  firstName: string
  lastName: string
  password: string
  dateOfBirth: string
  addresses: [
    {
      country: CountryCode
      city: string
      streetName: string
      postalCode: string
    },
  ]
}

interface Token {
  access_token: string
  expires_in: number
  scope: string
  token_type: string
}

interface customerToken {
  access_token: string
  expires_in: number
  scope: string
  refresh_token: string
  token_type: string
}

class CommerceToolsAPI {
  private _authUrl: string
  private _apiUrl: string
  private _projectKey: string
  private _clientId: string
  private _clientSecret: string
  private _token: Token | null
  private _customerData: object | null
  private _customerToken: customerToken | null

  constructor(
    authUrl: string,
    apiUrl: string,
    projectKey: string,
    clientId: string,
    clientSecret: string,
  ) {
    this._authUrl = authUrl
    this._apiUrl = apiUrl
    this._projectKey = projectKey
    this._clientId = clientId
    this._clientSecret = clientSecret
    this._token = null
    this._customerToken = null
    this._customerData = {}
  }

  loggedCustomer = {
    updateCustomer: {
      changeEmail: async (email: string) => {
        // ОТПРАВКА ЗАПРОСА НА СЕРВЕР ДЛЯ ОБНОВЛЕНИЯ ЕМЕЙЛА

        const updatedCustomerData = { ...this._customerData, email }
        this._customerData = updatedCustomerData
      },
    },

    getCustomerData: () => {
      return this._customerData
    },
  }

  async initialize() {
    try {
      this._token = await this.getToken()
      return this._token
    } catch (error) {
      console.error('Произошла ошибка при получении токена:', error)
    }
  }

  async createCustomer(userData: DataToCreateCustomer) {
    try {
      const headers = {
        Authorization: `${this._token?.token_type} ${this._token?.access_token}`,
        'Content-Type': 'application/json',
      }

      const { email, firstName, lastName, password, dateOfBirth, addresses } =
        userData

      const body = {
        email,
        firstName,
        lastName,
        password,
        dateOfBirth,
        addresses,
      }

      const resp = await axios.post(
        `${this._apiUrl}/${this._projectKey}/customers`,
        body,
        { headers },
      )

      console.log(resp.data)

      return resp.data
    } catch (error) {
      console.error('Err', error)
    }
  }

  private async getToken(): Promise<Token | null> {
    try {
      let token: Token

      if (localStorage.getItem('tokenRSTeam')) {
        token = JSON.parse(localStorage.getItem('tokenRSTeam') as string)
      } else {
        const authString = `${this._clientId}:${this._clientSecret}`
        const encodedAuthString = btoa(authString)

        const tokenUrl = `${this._authUrl}/oauth/token?grant_type=client_credentials`

        const headers = {
          Authorization: `Basic ${encodedAuthString}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        }

        const resp = await axios.post<Token>(tokenUrl, null, { headers })

        token = resp.data

        localStorage.setItem('tokenRSTeam', JSON.stringify(token))
      }

      return token
    } catch (err) {
      console.error('Error', err)
      return null
    }
  }

  async loginCustomer(email: string, password: string) {
    try {
      const loginUrl = `${this._apiUrl}/${this._projectKey}/login`

      const headers = {
        Authorization: `${this._token?.token_type} ${this._token?.access_token}`,
        'Content-Type': 'application/json',
      }

      const body = {
        email,
        password,
      }

      const resp = await axios.post(loginUrl, body, { headers })

      this._customerData = {
        // ЗАПОЛНИТЬ ОБЪЕКТ С ДАННЫМИ
        name: 'test',
        lastName: 'sss',
      }

      this._customerToken = resp.data.token // ТОКЕН ПОЛЬЗОВАТЕЛЯ

      return resp.data
    } catch (err) {
      console.log('Err', err)
    }
  }
}

const CommerceTools = new CommerceToolsAPI(
  AUTH_URL,
  API_URL,
  PROJECT_KEY,
  CLIENT_ID,
  CLIENT_SECRET,
)

// CommerceTools.loggedCustomer.updateCustomer.changeEmail('newEmail')
// CommerceTools.loggedCustomer.getCustomerData()

// setTimeout(() => {
//   const userData: DataToCreateUser = {
//     firstName: 'Vasya',
//     lastName: 'Tesst',
//     email: 'vasya@test.com',
//     dateOfBirth: '2001-11-25',
//     password: '123',
//     addresses: [
//       {
//         country: 'UA',
//         streetName: 'tesssteeet',
//         postalCode: '343434',
//         city: 'kiev',
//       },
//     ],
//   }
//   CommerceTools.createCustomer(userData)
// }, 5000)

// setTimeout(() => {
//   CommerceTools.userLogin('sas@test.com', '123')
// }, 5000)

export { CommerceTools }
export type { Token }
