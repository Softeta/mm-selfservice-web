import { PayloadAction } from '@reduxjs/toolkit'
import { createCourse } from 'API/Calls/candidateCourse'
import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { TAddCandidateCourseRequest } from 'API/Types/Candidate/Common/candidateCourse'
import { call, put, select } from 'redux-saga/effects'
import { updateCourses } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { getCandidateId } from 'Store/State/candidate'

export function* addCourseSaga(
  action: PayloadAction<TAddCandidateCourseRequest>
) {
  const payload = action.payload
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )
  const response = (yield call(
    createCourse,
    candidateId!,
    payload
  )) as TCandidateResponse

  yield put(updateCourses(response.data.candidateCourses))
}
