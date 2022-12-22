import { PayloadAction } from '@reduxjs/toolkit'
import { updateCoreInformationStep4 } from 'API/Calls/candidateCoreInformation'
import { TCandidateContactInformationRequest } from 'API/Types/Candidate/candidateContactInformation'
import { executeCandidateProfileSaga } from '../Utils/profileSagaUtils'

export function* Step4Saga(
  action: PayloadAction<TCandidateContactInformationRequest>
) {
  yield executeCandidateProfileSaga(updateCoreInformationStep4, action)
}
