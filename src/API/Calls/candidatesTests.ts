import { TCandidateTestsResponse } from 'API/Types/Candidate/candidateTestsGet'
import { useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

export enum CandidateTestsQueryKeys {
  candidateTests = 'candidate-tests',
  testsPackage = 'tests-package'
}

export const fetchCandidateTests = async (
  candidateId: string
): Promise<TCandidateTestsResponse> =>
  HttpClient.get(`/api/v1/candidate-tests/${candidateId}`)

export const createLogicalTest = async (
  candidateId: string
): Promise<TCandidateTestsResponse> =>
  HttpClient.post(`api/v1/candidate-tests/${candidateId}/logical`)

export const createPersonalityTest = async (
  candidateId: string
): Promise<TCandidateTestsResponse> =>
  HttpClient.post(`api/v1/candidate-tests/${candidateId}/personality`)

export const useCandidateTests = (candidateId: string) =>
  useQuery(
    [CandidateTestsQueryKeys.candidateTests, candidateId],
    () => fetchCandidateTests(candidateId),
    { enabled: !!candidateId }
  )
