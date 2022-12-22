import { RootState } from 'Store/Slices/rootReducer'

export const getCompanyId = (state: RootState) =>
  state.contactPerson?.contactPerson?.companyId

export const getContactPersonId = (state: RootState) =>
  state.contactPerson?.contactPerson?.id

export const getState = (state: RootState) => state.contactPerson
