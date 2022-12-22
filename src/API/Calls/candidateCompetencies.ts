import { TUpdateCandidateCompetenciesRequest } from 'API/Types/Candidate/candidateCompetencies'
import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { HttpClient } from 'Services/HttpClient'

export const updateCompetencies = async (
  candidateId: string,
  data: TUpdateCandidateCompetenciesRequest
): Promise<TCandidateResponse> =>
  HttpClient.put(`/api/v1/candidates/${candidateId}/competencies`, data)
