import { TCandidateSalaryRequest } from 'API/Types/Candidate/candidateSalary'
import { TCandidatesResponse } from 'API/Types/Candidate/candidatesBriefGet'
import { HttpClient } from 'Services/HttpClient'

export const updateCandidateSalary = async (
  candidateId: string,
  data: TCandidateSalaryRequest
): Promise<TCandidatesResponse> =>
  HttpClient.put(`/api/v1/candidates/${candidateId}/salary`, data)
