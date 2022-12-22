import { PayloadAction } from '@reduxjs/toolkit'
import { updateCourse } from 'API/Calls/candidateCourse'
import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { call, put, select } from 'redux-saga/effects'
import {
  changeState,
  updateCourses
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TUpdateCandidateCourse } from 'Store/Slices/CandidateProfile/Types/candidateUpdateTypes'
import { getCandidateId, getState } from 'Store/State/candidate'

export function* updateCourseSaga(
  action: PayloadAction<TUpdateCandidateCourse>
) {
  const payload = action.payload
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )
  const state: ReturnType<typeof getState> = yield select(getState)

  try {
    const response = (yield call(
      updateCourse,
      candidateId!,
      payload.id,
      payload.request
    )) as TCandidateResponse

    yield put(updateCourses(response.data.candidateCourses))
  } catch (error) {
    yield put(
      changeState({
        candidate: state.candidatePrevious
      })
    )
  }
}
