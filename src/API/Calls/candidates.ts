import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { TRegisterMyselfRequest } from 'API/Types/Candidate/registerMyself'
import { TLegalTerms } from 'API/Types/legalAgreement'
import { TSettings } from 'API/Types/settings'
import { useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

export enum CandidateQueryKeys {
  candidates = 'candidates',
  candidate = 'candidate',
  candidateUpdate = 'candidateUpdate',
  jobCandidates = 'jobCandidates',
  self = 'self'
}

export const fetchCandidate = async (
  candidateId: string
): Promise<TCandidateResponse> =>
  HttpClient.get(`/api/v1/candidates/${candidateId}`)

export const useCandidate = (candidateId?: string) =>
  useQuery(
    [CandidateQueryKeys.candidate, candidateId],
    () => fetchCandidate(candidateId!),
    { enabled: !!candidateId }
  )

export const registerMyself = async (
  data: TRegisterMyselfRequest
): Promise<TCandidateResponse> =>
  HttpClient.post(`api/v1/candidates/register`, data)

export const getSelf = async (): Promise<TCandidateResponse> =>
  HttpClient.get(`api/v1/candidates/self`)

export const useSelf = () => useQuery([CandidateQueryKeys.self], getSelf)

export const verifyCandidate = async (
  candidateId: string,
  verificationKey: string
): Promise<TCandidateResponse> =>
  HttpClient.put(`/api/v1/candidates/${candidateId}/verify/${verificationKey}`)

export const requestEmailVerification = async (): Promise<void> =>
  HttpClient.put(`/api/v1/candidates/request-verification`)

export const updateCandidateLegalTerms = async (
  candidateId: string,
  terms: TLegalTerms
): Promise<TCandidateResponse> =>
  HttpClient.put(`api/v1/candidates/${candidateId}/legal-terms`, terms)

export const updateCandidateSettings = async (
  candidateId: string,
  settings: TSettings
): Promise<TCandidateResponse> =>
  HttpClient.put(`api/v1/candidates/${candidateId}/settings`, settings)
