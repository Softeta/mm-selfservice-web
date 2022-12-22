import { TJobsRecommendedResponse } from "API/Types/Jobs/jobRecommendedGet";
import { TRecommendedJobsRequest } from "API/Types/recommendedJobs";
import { useInfiniteQuery, useQuery } from "react-query";
import { HttpClient } from "Services/HttpClient";

export enum RecommendedJobQueryKeys {
  recommendedJobsPaged = 'recommededJobs-jobs-paged',
  recommededJobs = 'recommededJobs-jobs'
}

const getRecommendedJobs = async (
  candidateId: string,
  queryParams: string,
  request: TRecommendedJobsRequest,
  pageParam?: string): Promise<TJobsRecommendedResponse> => 
  HttpClient.post(pageParam || `/api/v1/jobs/${candidateId}/recommended-jobs?${queryParams}`, request)

export const usePagedRecommendedJobs = (candidateId: string, request: TRecommendedJobsRequest, queryParams: string) =>
  useInfiniteQuery<TJobsRecommendedResponse, string>(
    [],
    ({ pageParam }) => getRecommendedJobs(candidateId, queryParams, request, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined
    }
  )

export const useRecommendedJobs = (candidateId: string, request: TRecommendedJobsRequest, queryParams = '') =>
  useQuery([RecommendedJobQueryKeys.recommededJobs, queryParams],
    () => getRecommendedJobs(candidateId, queryParams, request))