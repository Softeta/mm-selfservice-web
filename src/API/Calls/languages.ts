import {
  TLanguagesResponse,
  TRecommendedLanguagesResponse
} from 'API/Types/languages'
import { useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

const enableAutomaticFetch = false

export enum LanguagesQueryKeys {
  languages = 'languages',
  reocommendedLanguages = 'recommended-languages'
}

const fetchRecommendedLanguages =
  async (): Promise<TRecommendedLanguagesResponse> => {
    return HttpClient.get(`/api/v1/languages/recommended`)
  }

export const useRecommendedLanguages = () =>
  useQuery(LanguagesQueryKeys.reocommendedLanguages, () =>
    fetchRecommendedLanguages()
  )

const fetchLanguages = async (search?: string): Promise<TLanguagesResponse> => {
  const searchQuery = search ? `?search=${search}` : ''
  return HttpClient.get(`/api/v1/languages${searchQuery}`)
}

export const useLanguages = (search?: string) =>
  useQuery(
    `${LanguagesQueryKeys.languages}.${search}`,
    () => fetchLanguages(search),
    {
      enabled: enableAutomaticFetch
    }
  )
