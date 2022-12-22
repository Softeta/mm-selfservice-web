import JobStages from '../Enums/jobStages'
import SelectedCandidateStages from '../Enums/selectedCandidateStages'
import WorkTypes from '../Enums/workType'
import { TFileUpdateRequest } from '../fileRequest'
import { TFileResponse } from '../fileResponse'
import { TPagedResponse } from '../pagedResponse'
import { TPosition } from '../position'

export type TCandidateJobsResponse = {
  data: TPagedResponse<TCandidateJobBrief>
}

export type TCandidateJobResponse = {
  data: TCandidateJob
}

export type TCandidateJobBrief = {
  id: string
  jobId: string
  company: {
    name: string
    logoUri: string
  }
  position: TPosition
  coverLetter: string
  hasMotivationVideo: boolean
  hasApplied: boolean
}

export type TCandidateJob = {
  id: string
  jobId: string
  candidateId: string
  company: {
    name: string
    logoUri: string
  }
  position: TPosition
  deadlineDate?: Date
  freelance?: WorkTypes
  permanent?: WorkTypes
  jobStage: JobStages
  startDate?: Date
  stage: SelectedCandidateStages
  motivationVideo?: TFileResponse
  coverLetter?: string
  isJobArchived: boolean
  hasApplied: boolean
}

export type TCandidateJobMotivationRequest = {
  coverLetter?: string
  motivationVideo?: TFileUpdateRequest
}
