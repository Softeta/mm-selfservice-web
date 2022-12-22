import { TAddress } from '../address'
import { JobRequest } from '../Company/companyRegister'
import CompanyWorkingHoursType from '../Enums/companyWorkingHours'
import SeniorityLevels from '../Enums/seniorityLevels'
import WorkFormats from '../Enums/workFormats'
import { TIndustry } from '../industries'
import { TLanguage } from '../languages'
import { TSkill } from '../skills'
import { TJobSalaryBudget } from './Common/jobSalaryBudget'

export type TJobStep1Request = JobRequest & {
  companyId: string
}

export type TJobStep4Request = {
  description?: string
}

export type TJobStep5Request = {
  skills?: TSkill[]
  industries?: TIndustry[]
  languages?: TLanguage[]
  seniorities?: SeniorityLevels[]
}

export type TPermanentSection = {
  hourlyBudget?: TJobSalaryBudget
  monthlyBudget?: TJobSalaryBudget
}

export type TFreelanceSection = TPermanentSection & {
  companyWorkingHourTypes?: CompanyWorkingHoursType[]
  hoursPerProject?: number
}

export type TJobStep6SharedRequest = {
  weeklyWorkHours?: number
  currency?: string
  formats?: WorkFormats[]
  address?: TAddress
}

export type TJobStep6PermanentRequest = TJobStep6SharedRequest & {
  hourlyBudget?: TJobSalaryBudget
  monthlyBudget?: TJobSalaryBudget
}

export type TJobStep6FreelanceRequest = TJobStep6PermanentRequest & {
  companyWorkingHourTypes?: CompanyWorkingHoursType[]
  hoursPerProject?: number
}

export type TJobStep6Request = TJobStep6SharedRequest & {
  permanent?: TPermanentSection
  freelance?: TFreelanceSection
}
