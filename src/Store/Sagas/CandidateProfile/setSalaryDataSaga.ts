import { PayloadAction } from '@reduxjs/toolkit'
import { TCandidateSalaryRequest } from 'API/Types/Candidate/candidateSalary'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'
import { updateCandidateSalary } from 'API/Calls/candidateSalary'

export function* setSalaryDataSaga(
  action: PayloadAction<TCandidateSalaryRequest>
) {
  yield executeCandidateProfileSaga(updateCandidateSalary, action)
}
