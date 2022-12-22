import { PayloadAction } from '@reduxjs/toolkit'
import { updateJobCoreInformationStep6Freelance } from 'API/Calls/jobCoreInformation'
import { TJobStep6FreelanceRequest } from 'API/Types/Jobs/jobCoreInformation'
import { call, put, select } from 'redux-saga/effects'
import { setJob } from 'Store/Slices/CompanyRegistration/companyRegistrationReducer'
import { getJobId } from 'Store/State/job'

export function* setCoreInformationStep6FreelanceSaga(
  action: PayloadAction<TJobStep6FreelanceRequest>
) {
  const jobId: ReturnType<typeof getJobId> = yield select(getJobId)
  const { data } = yield call(
    updateJobCoreInformationStep6Freelance,
    jobId!,
    action.payload
  )

  yield put(setJob(data))
}
