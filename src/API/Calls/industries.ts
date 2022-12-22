import { TIndustriesResponse } from 'API/Types/industries'
import { useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

export enum IndustriesQueryKeys {
  industries = 'industries'
}

const fetchIndustries = async (
  search?: string
): Promise<TIndustriesResponse> => {
  const searchQuery = search ? `?search=${search}` : ''
  return HttpClient.get(`/api/v1/industries${searchQuery}`)
}

export const useIndustries = (search?: string) =>
  useQuery(`${IndustriesQueryKeys.industries}.${search}`, () =>
    fetchIndustries(search)
  )
