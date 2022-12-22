import { TJobsBriefResponse } from 'API/Types/Jobs/jobBriefGet'
import { TJobResponse } from 'API/Types/Jobs/jobs'
import { useInfiniteQuery, useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'

export enum JobQueryKeys {
  job = 'job',
  jobs = 'jobs',
  jobsPaged = 'jobs-paged',
  jobCalibrated = 'job-calibrated',
  jobsDashboard = 'jobs-dashboard'
}

const fetchJobs = async (
  queryString?: string,
  pageParam?: string
): Promise<TJobsBriefResponse> =>
  HttpClient.get(pageParam || `/api/v1/jobs?${queryString}`)

export const useJobs = (search = '') =>
  useQuery([JobQueryKeys.jobs, search], () => fetchJobs(search))

export const usePagedJobs = (queryParams: string) =>
  useInfiniteQuery<TJobsBriefResponse, string>(
    [JobQueryKeys.jobsPaged, queryParams],
    ({ pageParam }) => fetchJobs(queryParams, pageParam),
    {
      getNextPageParam: (last) => last.data.nextPagePath || undefined
    }
  )

export const fetchJob = async (jobId: string): Promise<TJobResponse> =>
  HttpClient.get(`/api/v1/jobs/${jobId}`)

export const useJob = (jobId?: string) =>
  useQuery([JobQueryKeys.job, jobId], () => fetchJob(jobId!), {
    enabled: !!jobId
  })
