import { TSelectedCandidateResponse } from 'API/Types/Jobs/selectedCandidateGet'
import { TShortlistResponse } from 'API/Types/Jobs/shortlistGet'
import { useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

export enum SelectedCandidatesQueryKeys {
  shortlist = 'shortlist',
  shortlistedCandidate = 'shortlistedCandidate'
}

export const fetchShortlist = async (
  jobId: string,
  queryString: string
): Promise<TShortlistResponse> =>
  HttpClient.get(`/api/v1/job-candidates/${jobId}/shortlist?${queryString}`)

export const useShortlist = (jobId: string, queryString: string) =>
  useQuery([SelectedCandidatesQueryKeys.shortlist, jobId], () =>
    fetchShortlist(jobId, queryString)
  )

export const fetchShortlistedCandidate = async (
  jobId: string,
  candidateId: string
): Promise<TSelectedCandidateResponse> =>
  HttpClient.get(`/api/v1/job-candidates/${jobId}/shortlist/candidates/${candidateId}`)

export const useShortlistedCandidate = (jobId: string, candidateId: string) =>
  useQuery([SelectedCandidatesQueryKeys.shortlistedCandidate, jobId], () =>
    fetchShortlistedCandidate(jobId, candidateId)
  )
