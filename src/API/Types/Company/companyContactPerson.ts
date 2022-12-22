import ContactPersonRole from '../Enums/contactPersonRole'
import { TFileUpdateRequest } from '../fileRequest'
import { TPhone } from '../phone'
import { TPosition } from '../position'

export type TCompanyContactPersonCreateRequest = {
  email: string
  role: ContactPersonRole
  firstName: string
  lastName: string
  position?: TPosition
  phone?: TPhone
}

export type TCompanyContactPersonUpdateRequest =
  TCompanyContactPersonCreateRequest & {
    picture: TFileUpdateRequest
  }
