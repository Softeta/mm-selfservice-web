import { PayloadAction } from '@reduxjs/toolkit'
import { setCandidateCurriculumVitae } from 'API/Calls/candidateCurriculumVitae'
import { call, put, select } from 'redux-saga/effects'
import { changeState } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TUpdateCandidateCurriculumVitae } from 'Store/Slices/CandidateProfile/Types/candidateUpdateTypes'
import { getCandidateId, getState } from 'Store/State/candidate'

export function* setCandidateCurriculumVitaeSaga(
  action: PayloadAction<TUpdateCandidateCurriculumVitae>
) {
  const state: ReturnType<typeof getState> = yield select(getState)
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )

  try {
    yield call(setCandidateCurriculumVitae, candidateId!, {
      curriculumVitae: action.payload.curriculumVitaeCache,
      bio: action.payload.bio
    })
  } catch (error) {
    yield put(
      changeState({
        candidate: state.candidatePrevious
      })
    )
  }
}
