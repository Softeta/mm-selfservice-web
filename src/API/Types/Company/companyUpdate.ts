import { TAddress } from '../address'
import { TFileUpdateRequest } from '../fileRequest'
import { TIndustry } from '../industries'

export type TCompanyUpdateRequest = {
  websiteUrl?: string
  linkedInUrl?: string
  glassdoorUrl?: string
  logo?: TFileUpdateRequest
  address?: TAddress
  industries?: TIndustry[]
}
