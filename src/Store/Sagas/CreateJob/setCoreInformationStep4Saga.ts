import { PayloadAction } from '@reduxjs/toolkit'
import { updateJobCoreInformationStep4 } from 'API/Calls/jobCoreInformation'
import { TJobStep4Request } from 'API/Types/Jobs/jobCoreInformation'
import { call, select } from 'redux-saga/effects'
import { getJobId } from 'Store/State/job'

export function* setCoreInformationStep4Saga(
  action: PayloadAction<TJobStep4Request>
) {
  const jobId: ReturnType<typeof getJobId> = yield select(getJobId)
  yield call(updateJobCoreInformationStep4, jobId!, action.payload)
}
