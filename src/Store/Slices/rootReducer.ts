import { combineReducers } from '@reduxjs/toolkit'
import candidateProfileReducer from './CandidateProfile/candidateProfileReducer'
import contactPersonReducer from './ContactPerson/contactPersonReducer'
import companyRegistrationReducer from './CompanyRegistration/companyRegistrationReducer'
import shortlistReducer from './Shortlist/shortlistReducer'
import createJobReducer from './CreateJob/createJobReducer'

export const rootReducer = combineReducers({
  candidateProfile: candidateProfileReducer,
  contactPerson: contactPersonReducer,
  companyRegistration: companyRegistrationReducer,
  shortlist: shortlistReducer,
  createJob: createJobReducer
})

export type RootState = ReturnType<typeof rootReducer>
