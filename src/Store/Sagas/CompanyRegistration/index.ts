import { all, takeLatest } from 'redux-saga/effects'
import { registerCompanySaga } from './registerCompanySaga'

function* companyRegistrationSaga() {
  yield all([
    takeLatest('companyRegistration/registerCompany', registerCompanySaga)
  ])
}

export default companyRegistrationSaga
