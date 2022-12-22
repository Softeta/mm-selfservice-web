import ContactPersonRole from '../Enums/contactPersonRole'
import ContactPersonStage from '../Enums/contactPersonStage'
import { TFileResponse } from '../fileResponse'
import { TLegalAgreement } from '../legalAgreement'
import { TPhone } from '../phone'
import { TPosition } from '../position'

export type TContactPerson = {
  id: string
  companyId: string
  email: string
  stage: ContactPersonStage
  role: ContactPersonRole
  isEmailVerified: boolean
  firstName?: string
  lastName?: string
  position?: TPosition
  phone?: TPhone
  picture?: TFileResponse
  systemLanguage?: string
  termsAndConditions?: TLegalAgreement
  marketingAcknowledgement?: TLegalAgreement
}
