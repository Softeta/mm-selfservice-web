import { getSelf } from 'API/Calls/candidates'
import { TErrorResponse } from 'API/Types/errorResponse'
import { put, call } from 'redux-saga/effects'
import {
  candidateProfileSlice,
  changeState
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'

const { setCandidate } = candidateProfileSlice.actions

export function* fetchSelfSaga() {
  try {
    const { data } = yield call(getSelf)
    yield put(setCandidate(data))
  } catch (error) {
    const errorResponse = error as TErrorResponse
    const code = errorResponse.response.status
    if (code < 500) {
      yield put(
        changeState({
          candidateExists: false,
          loadingData: {
            pending: false
          }
        })
      )
    } else {
      yield put(
        changeState({
          loadingData: {
            pending: false
          }
        })
      )
    }
  }
}
