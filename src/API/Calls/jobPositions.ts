import { TPositionResponse, TAddPositionResponse } from 'API/Types/position'
import { useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

export enum JobPositionQueryKeys {
  jobPositions = 'jobPositions'
}

const fetchJobPositions = async (
  search?: string
): Promise<TPositionResponse> => {
  const searchQuery = search ? `?search=${search}` : ''
  return HttpClient.get(`/api/v1/job-positions${searchQuery}&pageSize=10`)
}

export const useJobPositions = (search?: string) =>
  useQuery(
    `${JobPositionQueryKeys.jobPositions}.${search}`,
    () => fetchJobPositions(search),
    { enabled: false }
  )

export const addJobPosition = async (
  position: string
): Promise<TAddPositionResponse> =>
  HttpClient.post('/api/v1/job-positions/', { code: position })
