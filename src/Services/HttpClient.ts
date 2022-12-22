import axios from 'axios'
import { acquireAccessToken } from './AzureMsal'

const aziosRequestConfig = {
  baseURL: import.meta.env.VITE_FRONTOFFICE_API,
  headers: {
    'Content-type': 'application/json'
  },
  timeout: 60000
}

export const PublicHttpClient = axios.create(aziosRequestConfig)
export const HttpClient = axios.create(aziosRequestConfig)

HttpClient.interceptors.request.use(async (config) => {
  const token = await acquireAccessToken()
  if (token == null) {
    return config
  }

  // eslint-disable-next-line no-param-reassign
  config.headers!.Authorization = `Bearer ${token}`
  return config
})
