import { all, fork } from 'redux-saga/effects'
import candidateProfileSaga from './CandidateProfile'
import contactPersonSaga from './ContactPerson'
import companyRegistrationSaga from './CompanyRegistration'
import createJobSaga from './CreateJob'

export function* rootSaga() {
  yield all([
    fork(candidateProfileSaga),
    fork(contactPersonSaga),
    fork(companyRegistrationSaga),
    fork(createJobSaga)
  ])
}
