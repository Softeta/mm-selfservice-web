import { TAddress } from 'API/Types/address'
import { TCompanySearch } from 'API/Types/Company/companySearchGet'
import WorkTypes from 'API/Types/Enums/workType'
import { TIndustry } from 'API/Types/industries'
import { TPhone } from 'API/Types/phone'
import { TPosition } from 'API/Types/position'

export type TCompanyRegistrationState = {
  pending?: boolean
  isStep1Prepared?: boolean
  company?: TCompanyState
  job?: TJobInitState
}

export type TCompanyState = {
  company: TCompanySearch
  address: TAddress
  industries?: TIndustry[]
  firstName: string
  lastName: string
  position?: TPosition
  phone?: TPhone
}

export type TJobInitState = {
  position?: TPosition
  startDate?: Date
  endDate?: Date
  isUrgent: boolean
  workTypes: WorkTypes[]
}
