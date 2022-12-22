import { TCandidatesResponse } from 'API/Types/Candidate/candidatesBriefGet'
import { TCandidateWorkTermsRequest } from 'API/Types/Candidate/candidateWorkTerms'
import { HttpClient } from 'Services/HttpClient'

export const setCandidateWorkTerms = async (
  candidateId: string,
  data: TCandidateWorkTermsRequest
): Promise<TCandidatesResponse> =>
  HttpClient.put(`/api/v1/candidates/${candidateId}/work-terms`, data)
