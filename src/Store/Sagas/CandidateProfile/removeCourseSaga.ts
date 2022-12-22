import { PayloadAction } from '@reduxjs/toolkit'
import { deleteCourse } from 'API/Calls/candidateCourse'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'

export function* removeCourseSaga(action: PayloadAction<string>) {
  yield executeCandidateProfileSaga(deleteCourse, action)
}
