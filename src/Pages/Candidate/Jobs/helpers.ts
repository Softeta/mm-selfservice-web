import { TCandidateAppliedToJob } from 'API/Types/Candidate/candidateAppliedToJobs'
import { TCandidateJob } from 'API/Types/Candidate/candidateJob'
import { TJobBrief } from 'API/Types/Jobs/Common/jobBrief'
import { TJobCard } from 'Components/Molecules/JobsList/JobsList'

export const candidateJobsToJobCards = (
  options?: TCandidateJob[]
): TJobCard[] | undefined => options?.map(candidateJobToJobCard)

export const candidateJobToJobCard = (option: TCandidateJob): TJobCard => ({
  id: option.jobId,
  position: option.position.code,
  company: option.company.name,
  stage: option.stage,
  archived: option.isJobArchived
})

export const appliedJobsToJobCards = (
  options?: TCandidateAppliedToJob[]
): TJobCard[] | undefined => options?.map(appliedJobToJobCard)

export const appliedJobToJobCard = (option: TCandidateAppliedToJob): TJobCard => ({
  id: option.jobId,
  position: option.position.code,
  company: option.company.name
})

export const jobsToJobCards = (options?: TJobBrief[]): TJobCard[] | undefined =>
  options?.map(jobToJobCard)

export const jobToJobCard = (option: TJobBrief): TJobCard => ({
  id: option.jobId,
  position: option.position,
  company: option.companyName,
  createdAt: option.createdAt
})

export const getPreviousMonthDate = () => {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate()).toJSON()
}
