import { PublicHttpClient } from 'Services/HttpClient'
import { useQuery } from 'react-query'
import { TCountrySettingsResponse } from 'API/Types/countrySettings'

export enum CountrySettingsQueryKeys {
  countrySettings = 'country-settings'
}

const fetchCountrySettings = async (): Promise<TCountrySettingsResponse> =>
  PublicHttpClient.get('/api/v1/country-settings')

export const useCountrySettings = () =>
  useQuery(CountrySettingsQueryKeys.countrySettings, () =>
    fetchCountrySettings()
  )
