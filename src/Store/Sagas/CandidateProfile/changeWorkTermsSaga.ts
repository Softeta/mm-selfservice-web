import { PayloadAction } from '@reduxjs/toolkit'
import { setCandidateWorkTerms } from 'API/Calls/candidateWorkTerms'
import { TCandidateWorkTermsRequest } from 'API/Types/Candidate/candidateWorkTerms'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'

export function* changeWorkTermsSaga(
  action: PayloadAction<TCandidateWorkTermsRequest>
) {
  yield executeCandidateProfileSaga(setCandidateWorkTerms, action)
}
