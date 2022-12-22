import { PayloadAction } from '@reduxjs/toolkit'
import { fetchJob } from 'API/Calls/jobs'
import { put, call } from 'redux-saga/effects'
import { setJob } from 'Store/Slices/CreateJob/createJobReducer'

export function* initJobSaga(action: PayloadAction<string | undefined>) {
  try {
    const jobId = action.payload
    if (jobId) {
      const { data } = yield call(fetchJob, jobId)
      yield put(setJob(data))
    } else {
      yield put(setJob())
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}
}
