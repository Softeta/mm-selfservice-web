import { TAddress } from '../address'
import CompanyStatus from '../Enums/companyStatus'
import { TIndustry } from '../industries'
import { TContactPerson } from './contactPerson'

export type TCompanyResponse = {
  data: TCompany
}

export type TCompany = {
  id: string
  name: string
  registrationNumber: string
  address?: TAddress
  industries?: TIndustry[]
  websiteUrl?: string
  linkedInUrl?: string
  glassdoorUrl?: string
  contactPersons?: TContactPerson[]
  status: CompanyStatus
}
