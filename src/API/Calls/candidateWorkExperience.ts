import { TCandidatesResponse } from 'API/Types/Candidate/candidatesBriefGet'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import { HttpClient } from 'Services/HttpClient'

export const addCandidateWorkExperience = async (
  candidateId: string,
  data: TCandidateWorkExperience
): Promise<TCandidatesResponse> =>
  HttpClient.post(`/api/v1/candidates/${candidateId}/work-experiences`, data)

export const updateCandidateWorkExperience = async (
  candidateId: string,
  data: TCandidateWorkExperience
): Promise<TCandidatesResponse> =>
  HttpClient.put(
    `/api/v1/candidates/${candidateId}/work-experiences/${data.id}`,
    data
  )

export const removeCandidateWorkExperience = async (
  candidateId: string,
  workExperienceId: string
): Promise<TCandidatesResponse> =>
  HttpClient.delete(
    `/api/v1/candidates/${candidateId}/work-experiences/${workExperienceId}`
  )
