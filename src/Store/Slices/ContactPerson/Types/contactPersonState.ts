import { TContactPerson } from 'API/Types/Company/contactPerson'
import { TSettingsUpdateState } from 'Store/Slices/Types/settingsUpdateState'

export type TContactPersonLoadingData = {
  pending?: boolean
  termsPending?: boolean
  settingsUpdateState?: TSettingsUpdateState
}

export type TContactPersonState = {
  loadingData?: TContactPersonLoadingData
  contactPersonExists?: boolean
  contactPerson?: TContactPerson
  contactPersonPrevious?: TContactPerson
}
