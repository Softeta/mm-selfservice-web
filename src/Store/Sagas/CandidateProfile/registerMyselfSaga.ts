import { PayloadAction } from '@reduxjs/toolkit'
import { registerMyself } from 'API/Calls/candidates'
import { TRegisterMyselfRequest } from 'API/Types/Candidate/registerMyself'
import { put, call } from 'redux-saga/effects'
import { candidateProfileSlice } from 'Store/Slices/CandidateProfile/candidateProfileReducer'

const { setCandidate } = candidateProfileSlice.actions

export function* registerMyselfSaga(
  action: PayloadAction<TRegisterMyselfRequest>
) {
  try {
    const { data } = yield call(registerMyself, action.payload)
    yield put(setCandidate(data))
    // eslint-disable-next-line no-empty
  } catch (error) {}
}
