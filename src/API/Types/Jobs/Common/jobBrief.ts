import WorkTypes from "API/Types/Enums/workType"
import { TJobContactPerson } from "./jobContactPerson"
import { TJobEmployee } from "./jobEmployee"

export type TJobBrief = {
  jobId: string
  companyName: string
  companyLogoUri?: string
  position: string
  freelance?: WorkTypes
  permanent?: WorkTypes
  jobStage: string
  deadlineDate?: Date
  assignedTo?: TJobEmployee[]
  isPriority: boolean
  createdAt: Date
  owner?: TJobEmployee
  mainContact?: TJobContactPerson
}
