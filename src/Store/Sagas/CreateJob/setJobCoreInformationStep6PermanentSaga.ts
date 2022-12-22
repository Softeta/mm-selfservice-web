import { PayloadAction } from '@reduxjs/toolkit'
import { updateJobCoreInformationStep6Permanent } from 'API/Calls/jobCoreInformation'
import { TJobStep6PermanentRequest } from 'API/Types/Jobs/jobCoreInformation'
import { call, put, select } from 'redux-saga/effects'
import { setJob } from 'Store/Slices/CompanyRegistration/companyRegistrationReducer'
import { getJobId } from 'Store/State/job'

export function* setCoreInformationStep6PermanentSaga(
  action: PayloadAction<TJobStep6PermanentRequest>
) {
  const jobId: ReturnType<typeof getJobId> = yield select(getJobId)
  const { data } = yield call(
    updateJobCoreInformationStep6Permanent,
    jobId!,
    action.payload
  )

  yield put(setJob(data))
}
