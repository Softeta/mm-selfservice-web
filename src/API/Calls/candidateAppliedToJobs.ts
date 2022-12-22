import { TCandidateAppliedToJobsResponse } from "API/Types/Candidate/candidateAppliedToJobs";
import { QueryClient, useInfiniteQuery, useQuery } from "react-query";
import { HttpClient } from "Services/HttpClient";

export enum CandidateAppliedToJobsQueryKeys {
  candidateAppliedToJobs = 'candidateAppliedToJobs',
  candidateAppliedToJobsPaged = 'candidateAppliedToJobsPaged'
}

export const usePagedCandidateApplieddInJobs = (
  candidateId: string,
  queryParams?: string
) =>
  useInfiniteQuery<TCandidateAppliedToJobsResponse, string>(
    [CandidateAppliedToJobsQueryKeys.candidateAppliedToJobsPaged, queryParams],
    ({ pageParam }) =>
      fetchCandidateSelectedInJobs(candidateId, queryParams, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined
    }
  )

export const useCandidateApplieddInJobs = (
  candidateId: string,
  queryParams?: string
) => useQuery([CandidateAppliedToJobsQueryKeys.candidateAppliedToJobs, queryParams], () =>
      fetchCandidateSelectedInJobs(candidateId, queryParams)
)

export const fetchCandidateSelectedInJobs = async (
  candidateId: string,
  queryString?: string,
  pageParam?: string
): Promise<TCandidateAppliedToJobsResponse> =>
  HttpClient.get(
    pageParam ||
    `/api/v1/candidates/${candidateId}/applied-jobs?${queryString}`
  )

  export const fetchCandidateAppliedInJobIds = async (
    candidateId: string,
  ): Promise<string[]> =>
    HttpClient.get(`/api/v1/candidates/${candidateId}/applied-jobs/job-ids`)

  export const applyToJob = async (
    candidateId: string,
    jobId: string,
    queryClient: QueryClient
  ): Promise<void> => {
    queryClient.removeQueries(CandidateAppliedToJobsQueryKeys.candidateAppliedToJobs)
    queryClient.removeQueries(CandidateAppliedToJobsQueryKeys.candidateAppliedToJobsPaged)
    
    return HttpClient.post(`/api/v1/candidates/${candidateId}/applied-jobs/${jobId}`)
  }
    