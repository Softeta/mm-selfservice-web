import { TAddress } from '../address'
import { TPhone } from '../phone'

export type TCandidateContactInformationRequest = {
  firstName: string
  lastName: string
  phone?: TPhone
  address?: TAddress
}
