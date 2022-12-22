import { THobbiesResponse } from 'API/Types/hobbies'
import { useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

export enum HobbiesQueryKeys {
  hobbies = 'hobbies'
}

const fetchHobbies = async (search?: string): Promise<THobbiesResponse> => {
  const searchQuery = search ? `?search=${search}` : ''
  return HttpClient.get(`/api/v1/hobbies${searchQuery}`)
}

export const useHobbies = (search?: string) =>
  useQuery(`${HobbiesQueryKeys.hobbies}.${search}`, () => fetchHobbies(search))
