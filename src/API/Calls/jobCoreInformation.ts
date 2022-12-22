import {
  TJobStep1Request,
  TJobStep4Request,
  TJobStep5Request,
  TJobStep6FreelanceRequest,
  TJobStep6PermanentRequest,
  TJobStep6Request
} from 'API/Types/Jobs/jobCoreInformation'
import { TJobResponse } from 'API/Types/Jobs/jobs'
import { QueryClient } from 'react-query';
import { HttpClient } from 'Services/HttpClient'
import { JobQueryKeys } from './jobs';

export const initalizeJob = async (
  data: TJobStep1Request,
  queryClient: QueryClient
): Promise<TJobResponse> => {
  queryClient.removeQueries(JobQueryKeys.jobs);
  queryClient.removeQueries(JobQueryKeys.jobsPaged);
  return HttpClient.post(`/api/v1/jobs/step1`, data)
}

export const updateJobCoreInformationStep4 = async (
  jobId: string,
  data: TJobStep4Request
): Promise<TJobResponse> => HttpClient.put(`/api/v1/jobs/${jobId}/step4`, data)

export const updateJobCoreInformationStep5 = async (
  jobId: string,
  data: TJobStep5Request
): Promise<TJobResponse> => HttpClient.put(`/api/v1/jobs/${jobId}/step5`, data)

export const updateJobCoreInformationStep6Freelance = async (
  jobId: string,
  data: TJobStep6FreelanceRequest
): Promise<TJobResponse> =>
  HttpClient.put(`/api/v1/jobs/${jobId}/step6/freelance`, data)

export const updateJobCoreInformationStep6Permanent = async (
  jobId: string,
  data: TJobStep6PermanentRequest
): Promise<TJobResponse> =>
  HttpClient.put(`/api/v1/jobs/${jobId}/step6/permanent`, data)

export const updateJobCoreInformationStep6FreelanceAndPermanent = async (
  jobId: string,
  data: TJobStep6Request
): Promise<TJobResponse> => HttpClient.put(`/api/v1/jobs/${jobId}/step6`, data)
