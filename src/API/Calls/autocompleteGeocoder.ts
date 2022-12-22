import { TGeocoderSuggestionsResponse } from 'API/Types/Geocoder/geocoder'
import { useQuery } from 'react-query'
import { AutocompleteGeocoderHttpClient } from 'Services/AutocompleteGeocoderHttpClient'

export enum GeocoderSuggestionsQueryKeys {
  geocodeSearch = 'geocode-search'
}

export const fetchGeocoderSuggestions = async (
  search: string,
  isResultTypeCity: boolean
): Promise<TGeocoderSuggestionsResponse> => {
  const searchQuery = search
    ? `?query=${search}${isResultTypeCity ? '&resultType=city' : ''}`
    : ''
  return AutocompleteGeocoderHttpClient.get(`/6.2/suggest.json${searchQuery}`)
}

export const useGeocoderSuggestions = (search = '', isResultTypeCity = false) =>
  useQuery(
    `${GeocoderSuggestionsQueryKeys.geocodeSearch}.${search}`,
    () => fetchGeocoderSuggestions(search, isResultTypeCity),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  )
