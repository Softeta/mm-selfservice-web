import {
  TCandidateJobMotivationRequest,
  TCandidateJobResponse,
  TCandidateJobsResponse
} from 'API/Types/Candidate/candidateJob'
import { QueryClient, useInfiniteQuery, useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

export enum CandidateJobQueryKeys {
  candidateJob = 'candidateJob',
  candidateJobs = 'candidateJobs',
  candidateJobsPaged = 'candidateJobsPaged'
}

export const fetchCandidateSelectedInJobs = async (
  candidateId: string,
  queryString?: string,
  pageParam?: string
): Promise<TCandidateJobsResponse> =>
  HttpClient.get(
    pageParam ||
      `/api/v1/candidates/${candidateId}/selected-jobs?${queryString}`
  )

const fetchCandidateSelectedInJob = async (
  jobId: string,
  candidateId: string
  ): Promise<TCandidateJobResponse> =>
    HttpClient.get(`/api/v1/candidates/${candidateId}/selected-jobs/${jobId}`)
  
export const useCandidateSelectedInJobs = (
  candidateId: string,
  search = ''
) => {
  return useQuery([CandidateJobQueryKeys.candidateJobs, search], () =>
    fetchCandidateSelectedInJobs(candidateId, search)
  )
}

export const useCandidateSelectedInJob = (
  jobId: string,
  candidateId: string
) => {
  return useQuery([CandidateJobQueryKeys.candidateJob, `${jobId}${candidateId}`], () =>
  fetchCandidateSelectedInJob(jobId, candidateId)
  )
}

export const usePagedCandidateSelectedInJobs = (
  candidateId: string,
  queryParams?: string
) =>
  useInfiniteQuery<TCandidateJobsResponse, string>(
    [CandidateJobQueryKeys.candidateJobsPaged, queryParams],
    ({ pageParam }) =>
      fetchCandidateSelectedInJobs(candidateId, queryParams, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined
    }
  )

export const updateCandidateJobMotivation = async (
  candidateId: string,
  jobId: string,
  data: TCandidateJobMotivationRequest,
  queryClient: QueryClient
): Promise<TCandidateJobsResponse> => {
  queryClient.removeQueries(CandidateJobQueryKeys.candidateJobs)
  return HttpClient.put(
    `/api/v1/candidates/${candidateId}/selected-jobs/${jobId}`,
    data
  )
}

export const rejectCandidateJob = async (
  candidateId: string,
  jobId: string
): Promise<TCandidateJobsResponse> =>
  HttpClient.patch(
    `/api/v1/candidates/${candidateId}/selected-jobs/${jobId}/rejected`
  )
