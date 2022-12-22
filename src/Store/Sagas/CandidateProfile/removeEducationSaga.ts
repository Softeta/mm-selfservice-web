import { PayloadAction } from '@reduxjs/toolkit'
import { deleteEducation } from 'API/Calls/candidateEducation'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'

export function* removeEducationSaga(action: PayloadAction<string>) {
  yield executeCandidateProfileSaga(deleteEducation, action)
}
