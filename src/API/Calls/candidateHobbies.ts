import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { TUpdateCandidateHobbiesRequest } from 'API/Types/Candidate/candidateHobbies'
import { HttpClient } from 'Services/HttpClient'

export const updateHobbies = async (
  candidateId: string,
  data: TUpdateCandidateHobbiesRequest
): Promise<TCandidateResponse> =>
  HttpClient.put(`/api/v1/candidates/${candidateId}/hobbies`, data)
