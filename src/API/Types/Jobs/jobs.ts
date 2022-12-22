import { TJobCompanyResponse } from './Common/jobCompanyResponse'
import { TJobEmployee } from './Common/jobEmployee'
import { TJobYearExperience } from './Common/jobYearExperience'
import { TJobFreelance } from './Common/jobFreelance'
import { TJobPermanent } from './Common/jobPermanent'
import { TPosition } from '../position'
import { TSkill } from '../skills'
import { TIndustry } from '../industries'
import { TLanguage } from '../languages'
import JobStages from '../Enums/jobStages'
import SeniorityLevels from '../Enums/seniorityLevels'
import WorkingHoursType from '../Enums/workingHoursType'
import WorkTypes from '../Enums/workType'
import WorkFormats from '../Enums/workFormats'

export type TJobUpdateRequest = {
  ownerId: string
  position: TPosition
  deadLineDate?: Date
  description?: string
  industry?: string
  startDate?: Date
  endDate?: Date
  currency?: string
  weeklyWorkHours?: number
  freelance?: TJobFreelance
  permanent?: TJobPermanent
  isPriority: boolean
  isUrgent: boolean
  workingHourTypes: string[]
  workTypes: string[]
  assignedEmployees: string[]
  skills: TSkill[]
  industries: TIndustry[]
  seniorities: string[]
  languages: TLanguage[]
  formats: string[]
}

export type TJobResponse = {
  data: TJob
}

export type TJob = {
  id: string
  company: TJobCompanyResponse
  owner: TJobEmployee
  position: TPosition
  yearExperience?: TJobYearExperience
  deadLineDate?: Date
  description?: string
  stage: JobStages
  isPublished: boolean
  sharingDate?: Date
  startDate?: Date
  endDate?: Date
  currency?: string
  freelance?: TJobFreelance
  permanent?: TJobPermanent
  weeklyHours?: number
  isPriority: boolean
  isUrgent: boolean
  workingHourTypes?: WorkingHoursType[]
  workTypes: WorkTypes[]
  assignedEmployees: TJobEmployee[]
  skills: TSkill[]
  industries: TIndustry[]
  seniorities: SeniorityLevels[]
  languages: TLanguage[]
  formats: WorkFormats[]
  isArchived: boolean
  isActivated: boolean
  parentJobId?: string
}
