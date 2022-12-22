import { PayloadAction } from '@reduxjs/toolkit'
import { updateCompetencies } from 'API/Calls/candidateCompetencies'
import { TUpdateCandidateCompetenciesRequest } from 'API/Types/Candidate/candidateCompetencies'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'

export function* updateCompetenciesSaga(
  action: PayloadAction<TUpdateCandidateCompetenciesRequest>
) {
  yield executeCandidateProfileSaga(updateCompetencies, action)
}
