import { TAddress } from '../address'
import { TIndustry } from '../industries'
import { TJob } from '../Jobs/jobs'
import { TPosition } from '../position'
import { TCompany } from './companyGet'

export type TCompanyRegisterRequest = {
  name: string
  registrationNumber: string
  address?: TAddress
  person: TFirstPerson
  industries?: TIndustry[]
  job: JobRequest
}

type TFirstPerson = {
  firstName: string
  lastName: string
  position?: TPosition
  phone?: {
    countryCode?: string
    number?: string
  }
}

export type JobRequest = {
  position: TPosition
  startDate?: Date
  endDate?: Date
  isUrgent: boolean
  workTypes: string[]
}

export type TCompanyRegistration = {
  company: TCompany
  job?: TJob
  errorCode?: string
}

export type TCompanyRegistrationResponse = {
  data: TCompanyRegistration
}
