import { TCandidateActivityStatusRequest } from 'API/Types/Candidate/candidateActivityStatus'
import { TCandidateContactInformationRequest } from 'API/Types/Candidate/candidateContactInformation'
import { TCandidateLinkedInUrlRequest } from 'API/Types/Candidate/candidateLinkedInUrl'
import { TCandidatesResponse } from 'API/Types/Candidate/candidatesBriefGet'
import { TCandidateWorkTypesRequest } from 'API/Types/Candidate/candidateWorkTypes'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import { HttpClient } from 'Services/HttpClient'

export const updateCoreInformationStep1 = async (
  candidateId: string,
  data: TCandidateActivityStatusRequest
): Promise<TCandidatesResponse> =>
  HttpClient.put(
    `/api/v1/candidates/${candidateId}/core-information/step-1`,
    data
  )

export const updateCoreInformationStep2Add = async (
  candidateId: string,
  data: TCandidateWorkExperience
): Promise<TCandidatesResponse> =>
  HttpClient.post(
    `/api/v1/candidates/${candidateId}/core-information/step-2`,
    data
  )

export const updateCoreInformationStep2Update = async (
  candidateId: string,
  data: TCandidateWorkExperience
): Promise<TCandidatesResponse> =>
  HttpClient.put(
    `/api/v1/candidates/${candidateId}/core-information/step-2/${data.id}`,
    data
  )

export const updateCoreInformationStep3 = async (
  candidateId: string,
  data: TCandidateWorkTypesRequest
): Promise<TCandidatesResponse> =>
  HttpClient.put(
    `/api/v1/candidates/${candidateId}/core-information/step-3`,
    data
  )

export const updateCoreInformationStep4 = async (
  candidateId: string,
  data: TCandidateContactInformationRequest
): Promise<TCandidatesResponse> =>
  HttpClient.put(
    `/api/v1/candidates/${candidateId}/core-information/step-4`,
    data
  )

export const completeCoreInformation = async (
  candidateId: string,
  data: TCandidateLinkedInUrlRequest
): Promise<TCandidatesResponse> =>
  HttpClient.put(
    `/api/v1/candidates/${candidateId}/core-information/completed`,
    data
  )
