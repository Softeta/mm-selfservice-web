import axios from 'axios'

export const AutocompleteGeocoderHttpClient = axios.create({
  baseURL: import.meta.env.VITE_FRONTOFFICE_AUTOCOMPLETE_GEOCODER_API,
  headers: {
    'Content-type': 'application/json'
  }
})

AutocompleteGeocoderHttpClient.interceptors.request.use(async (config) => ({
  ...config,
  params: {
    ...config.params,
    language: 'en',
    apiKey: import.meta.env.VITE_FRONTOFFICE_GEOCODER_API_KEY
  }
}))
