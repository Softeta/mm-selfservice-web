import { all, takeLatest } from 'redux-saga/effects'
import { initJobSaga } from './initJobSaga'
import { setCoreInformationStep4Saga } from './setCoreInformationStep4Saga'
import { setCoreInformationStep5Saga } from './setCoreInformationStep5Saga'
import { setCoreInformationStep6FreelanceAndPermanentSaga } from './setCoreInformationStep6FreelanceAndPermanentSaga'
import { setCoreInformationStep6FreelanceSaga } from './setCoreInformationStep6FreelanceSaga'
import { setCoreInformationStep6PermanentSaga } from './setJobCoreInformationStep6PermanentSaga'

function* createJobSaga() {
  yield all([
    takeLatest('createJob/initJob', initJobSaga),
    takeLatest(
      'createJob/setCoreInformationStep4',
      setCoreInformationStep4Saga
    ),
    takeLatest(
      'createJob/setCoreInformationStep5',
      setCoreInformationStep5Saga
    ),
    takeLatest(
      'createJob/setCoreInformationStep6Freelance',
      setCoreInformationStep6FreelanceSaga
    ),
    takeLatest(
      'createJob/setCoreInformationStep6Permanent',
      setCoreInformationStep6PermanentSaga
    ),
    takeLatest(
      'createJob/setCoreInformationStep6FreelanceAndPermanent',
      setCoreInformationStep6FreelanceAndPermanentSaga
    )
  ])
}

export default createJobSaga
