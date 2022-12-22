import { PayloadAction } from '@reduxjs/toolkit'
import { updateEducation } from 'API/Types/Candidate/candidateEducation'
import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { call, put, select } from 'redux-saga/effects'
import {
  changeState,
  updateEducations
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TUpdateCandidateEducation } from 'Store/Slices/CandidateProfile/Types/candidateUpdateTypes'
import { getCandidateId, getState } from 'Store/State/candidate'

export function* updateEducationSaga(
  action: PayloadAction<TUpdateCandidateEducation>
) {
  const payload = action.payload
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )
  const state: ReturnType<typeof getState> = yield select(getState)

  try {
    const response = (yield call(
      updateEducation,
      candidateId!,
      payload.id,
      payload.request
    )) as TCandidateResponse

    yield put(updateEducations(response.data.candidateEducations))
  } catch (error) {
    yield put(
      changeState({
        candidate: state.candidatePrevious
      })
    )
  }
}
