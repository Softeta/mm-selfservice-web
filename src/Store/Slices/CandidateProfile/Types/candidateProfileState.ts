import { TCandidate } from 'API/Types/Candidate/candidateGet'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import { CoreInformationStatus } from 'API/Types/Enums/coreInformationStatus'
import { TSettingsUpdateState } from 'Store/Slices/Types/settingsUpdateState'

export type TCandidateLoadingData = {
  pending?: boolean
  termsPending?: boolean
  settingsUpdateState?: TSettingsUpdateState
}

export type TCandidateProfileState = {
  loadingData?: TCandidateLoadingData
  currentWorkExperience?: TCandidateWorkExperience
  candidate?: TCandidate
  candidateExists?: boolean
  currentWorkExperiencePrevious?: TCandidateWorkExperience
  candidatePrevious?: TCandidate
  coreInformationStatus?: CoreInformationStatus
  candidateAppliedToJobIds?: string[]
}
