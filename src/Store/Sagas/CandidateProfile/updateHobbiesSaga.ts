import { PayloadAction } from '@reduxjs/toolkit'
import { updateHobbies } from 'API/Calls/candidateHobbies'
import { TUpdateCandidateHobbiesRequest } from 'API/Types/Candidate/candidateHobbies'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'

export function* updateHobbiesSaga(
  action: PayloadAction<TUpdateCandidateHobbiesRequest>
) {
  yield executeCandidateProfileSaga(updateHobbies, action)
}
