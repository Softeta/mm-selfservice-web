import { all, takeLatest } from 'redux-saga/effects'
import { fetchSelfSaga } from './fetchSelfSaga'
import { registerMyselfSaga } from './registerMyselfSaga'
import { setLegalTermsSaga } from './setLegalTermsSaga'
import { setSettingsSaga } from './setSettingsSaga'

function* contactPersonSaga() {
  yield all([
    takeLatest('contactPerson/getSelfRequest', fetchSelfSaga),
    takeLatest('contactPerson/registerSelfRequest', registerMyselfSaga),
    takeLatest('contactPerson/setLegalTerms', setLegalTermsSaga),
    takeLatest('contactPerson/setSettings', setSettingsSaga)
  ])
}

export default contactPersonSaga
