import { PayloadAction } from '@reduxjs/toolkit'
import { updateJobCoreInformationStep5 } from 'API/Calls/jobCoreInformation'
import { TJobStep5Request } from 'API/Types/Jobs/jobCoreInformation'
import { call, select } from 'redux-saga/effects'
import { getJobId } from 'Store/State/job'

export function* setCoreInformationStep5Saga(
  action: PayloadAction<TJobStep5Request>
) {
  const jobId: ReturnType<typeof getJobId> = yield select(getJobId)
  yield call(updateJobCoreInformationStep5, jobId!, action.payload)
}
