import { PayloadAction } from '@reduxjs/toolkit'
import { updateCoreInformationStep2Update } from 'API/Calls/candidateCoreInformation'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import { executeCandidateProfileSaga } from '../Utils/profileSagaUtils'

export function* Step2UpdateSaga(
  action: PayloadAction<TCandidateWorkExperience>
) {
  yield executeCandidateProfileSaga(updateCoreInformationStep2Update, action)
}
