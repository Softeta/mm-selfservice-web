import ActivityStatus from '../Enums/activityStatus'
import CandidateStatus from '../Enums/candidateStatus'
import WorkFormats from '../Enums/workFormats'
import WorkingHoursType from '../Enums/workingHoursType'
import WorkTypes from '../Enums/workType'
import { TFileResponse } from '../fileResponse'
import { THobby } from '../hobbies'
import { TIndustry } from '../industries'
import { TLanguage } from '../languages'
import { TPhone } from '../phone'
import { TPosition } from '../position'
import { TSkill } from '../skills'
import { TVideo } from '../videos'
import { TCandidateBrief } from './candidatesBriefGet'
import { TCandidateCourseResponse } from './Common/candidateCourse'
import { TCandidateEducationResponse } from './Common/candidateEducation'
import { TCandidateWorkExperience } from './Common/candidateWorkExperience'
import { LegalInformationAgreement } from './Common/legalInformationAgreement'

export type TCandidateResponse = {
  data: TCandidate
}

export type TCandidate = TCandidateBrief & {
  status: CandidateStatus
  isEmailVerified: boolean
  phone?: TPhone
  bio?: string
  curriculumVitae?: TFileResponse
  personalWebsiteUrl?: string
  hobbies: THobby[]
  birthDate?: string
  weeklyWorkHours?: number
  activityStatuses?: ActivityStatus[]
  formats?: WorkFormats[]
  workTypes?: WorkTypes[]
  workingHourTypes?: WorkingHoursType[]
  skills: TSkill[]
  desiredSkills?: TSkill[]
  yearsOfExperience?: number
  industries: TIndustry[]
  languages?: TLanguage[]
  systemLanguage?: string
  termsAndConditions?: LegalInformationAgreement
  marketingAcknowledgement?: LegalInformationAgreement
  candidateCourses: TCandidateCourseResponse[]
  candidateEducations: TCandidateEducationResponse[]
  candidateWorkExperiences: TCandidateWorkExperience[]
  video: TVideo
  currentPosition?: TPosition
}
