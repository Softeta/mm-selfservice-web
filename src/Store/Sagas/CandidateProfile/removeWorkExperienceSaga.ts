import { PayloadAction } from '@reduxjs/toolkit'
import { removeCandidateWorkExperience } from 'API/Calls/candidateWorkExperience'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'

export function* removeWorkExperienceSaga(action: PayloadAction<string>) {
  yield executeCandidateProfileSaga(removeCandidateWorkExperience, action)
}
