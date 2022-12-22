import { PayloadAction } from '@reduxjs/toolkit'
import { setCandidatePicture } from 'API/Calls/candidatePictures'
import { call, put, select } from 'redux-saga/effects'
import { changeState } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TUpdateCandidatePicture } from 'Store/Slices/CandidateProfile/Types/candidateUpdateTypes'
import { getCandidateId, getState } from 'Store/State/candidate'

export function* setCandidatePictureSaga(
  action: PayloadAction<TUpdateCandidatePicture>
) {
  const state: ReturnType<typeof getState> = yield select(getState)
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )

  try {
    yield call(setCandidatePicture, candidateId!, {
      picture: action.payload.pictureCache
    })
  } catch (error) {
    yield put(
      changeState({
        candidate: state.candidatePrevious
      })
    )
  }
}
