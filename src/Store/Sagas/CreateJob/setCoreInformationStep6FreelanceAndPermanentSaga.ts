import { PayloadAction } from '@reduxjs/toolkit'
import { updateJobCoreInformationStep6FreelanceAndPermanent } from 'API/Calls/jobCoreInformation'
import { TJobStep6Request } from 'API/Types/Jobs/jobCoreInformation'
import { call, put, select } from 'redux-saga/effects'
import { setJob } from 'Store/Slices/CompanyRegistration/companyRegistrationReducer'
import { getJobId } from 'Store/State/job'

export function* setCoreInformationStep6FreelanceAndPermanentSaga(
  action: PayloadAction<TJobStep6Request>
) {
  const jobId: ReturnType<typeof getJobId> = yield select(getJobId)
  const { data } = yield call(
    updateJobCoreInformationStep6FreelanceAndPermanent,
    jobId!,
    action.payload
  )

  yield put(setJob(data))
}
