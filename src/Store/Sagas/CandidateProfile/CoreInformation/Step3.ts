import { PayloadAction } from '@reduxjs/toolkit'
import { updateCoreInformationStep3 } from 'API/Calls/candidateCoreInformation'
import { TCandidateWorkTypesRequest } from 'API/Types/Candidate/candidateWorkTypes'
import { executeCandidateProfileSaga } from '../Utils/profileSagaUtils'

export function* Step3Saga(action: PayloadAction<TCandidateWorkTypesRequest>) {
  yield executeCandidateProfileSaga(updateCoreInformationStep3, action)
}
