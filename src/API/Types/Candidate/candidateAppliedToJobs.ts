import JobStages from "../Enums/jobStages"
import WorkTypes from "../Enums/workType"
import { TPagedResponse } from "../pagedResponse"
import { TPosition } from "../position"

export type TCandidateAppliedToJobsResponse = {
  data: TPagedResponse<TCandidateAppliedToJob>
}

export type TCandidateAppliedToJob = {
  jobId: string
  company: {
    name: string
    logoUri: string
  }
  position: TPosition
  freelance?: WorkTypes
  permanent?: WorkTypes
  jobStage: JobStages
  startDate?: Date
  deadlineDate?: Date
}

export type TCandidateAppliedJobIdsResponse = {
  data: string[]
}
