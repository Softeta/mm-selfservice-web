import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import {
  TAddCandidateEducationRequest,
  TUpdateCandidateEducationRequest
} from 'API/Types/Candidate/Common/candidateEducation'
import { HttpClient } from 'Services/HttpClient'

export const createEducation = async (
  candidateId: string,
  data: TAddCandidateEducationRequest
): Promise<TCandidateResponse> =>
  HttpClient.post(`/api/v1/candidates/${candidateId}/educations`, data)

export const updateEducation = async (
  candidateId: string,
  educationId: string,
  data: TUpdateCandidateEducationRequest
): Promise<TCandidateResponse> =>
  HttpClient.put(
    `/api/v1/candidates/${candidateId}/educations/${educationId}`,
    data
  )

export const deleteEducation = async (
  candidateId: string,
  educationId: string
): Promise<TCandidateResponse> =>
  HttpClient.delete(
    `/api/v1/candidates/${candidateId}/educations/${educationId}`
  )
