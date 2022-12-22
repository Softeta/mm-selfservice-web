import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TCandidateActivityStatusRequest } from 'API/Types/Candidate/candidateActivityStatus'
import { TCandidateAppliedJobIdsResponse } from 'API/Types/Candidate/candidateAppliedToJobs'
import { TUpdateCandidateCompetenciesRequest } from 'API/Types/Candidate/candidateCompetencies'
import { TCandidateContactInformationRequest } from 'API/Types/Candidate/candidateContactInformation'
import { TCandidate } from 'API/Types/Candidate/candidateGet'
import { TUpdateCandidateHobbiesRequest } from 'API/Types/Candidate/candidateHobbies'
import { TCandidateLinkedInUrlRequest } from 'API/Types/Candidate/candidateLinkedInUrl'
import { TCandidateSalaryRequest } from 'API/Types/Candidate/candidateSalary'
import { TCandidateWorkTermsRequest } from 'API/Types/Candidate/candidateWorkTerms'
import { TCandidateWorkTypesRequest } from 'API/Types/Candidate/candidateWorkTypes'
import {
  TAddCandidateCourseRequest,
  TCandidateCourseResponse
} from 'API/Types/Candidate/Common/candidateCourse'
import {
  TAddCandidateEducationRequest,
  TCandidateEducationResponse
} from 'API/Types/Candidate/Common/candidateEducation'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import { TRegisterMyselfRequest } from 'API/Types/Candidate/registerMyself'
import { CoreInformationStatus } from 'API/Types/Enums/coreInformationStatus'
import WorkExperienceType from 'API/Types/Enums/workExperienceType'
import { TErrorResponse } from 'API/Types/errorResponse'
import { TLegalTerms } from 'API/Types/legalAgreement'
import { TSettings } from 'API/Types/settings'
import { TSettingsUpdateState } from '../Types/settingsUpdateState'
import { TCandidateProfileState } from './Types/candidateProfileState'
import {
  TUpdateCandidateCourse,
  TUpdateCandidateCurriculumVitae,
  TUpdateCandidateEducation,
  TUpdateCandidatePicture
} from './Types/candidateUpdateTypes'

export type TStateUpdate = {
  pending: boolean
  error?: TErrorResponse
}

const initialState: TCandidateProfileState = Object.freeze({
  loadingData: {
    pending: true
  }
})

export const candidateProfileSlice = createSlice({
  name: 'candidateProfile',
  initialState,
  reducers: {
    getSelfRequest: (state) => {
      state.loadingData = {
        ...state.loadingData,
        pending: true
      }
    },
    registerSelfRequest: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<TRegisterMyselfRequest>
    ) => {
      state.loadingData = {
        ...state.loadingData,
        pending: true
      }
      state.coreInformationStatus = CoreInformationStatus.InProgress
    },
    setCandidate: (state, action: PayloadAction<TCandidate>) => {
      state.loadingData = {
        ...state.loadingData,
        pending: false
      }
      state.candidateExists = true
      state.candidate = action.payload
      state.candidatePrevious = action.payload

      const currentExperience = action.payload.candidateWorkExperiences.find(
        (x) => !x.to && x.type === WorkExperienceType.Job
      )

      if (currentExperience) {
        state.currentWorkExperience = currentExperience
        state.currentWorkExperiencePrevious = currentExperience
      }
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state.loadingData = {
        ...state.loadingData,
        pending: action.payload
      }
    },
    updateCoreInformationStep1: (
      state,
      action: PayloadAction<TCandidateActivityStatusRequest>
    ) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.activityStatuses = action.payload.activityStatuses
    },
    updateCoreInformationStep2Add: (
      state,
      action: PayloadAction<TCandidateWorkExperience>
    ) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.candidateWorkExperiences = [action.payload]
    },
    updateCoreInformationStep2Update: (
      state,
      action: PayloadAction<TCandidateWorkExperience>
    ) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.candidateWorkExperiences = [action.payload]
    },
    updateCoreInformationStep3: (
      state,
      action: PayloadAction<TCandidateWorkTypesRequest>
    ) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.workTypes = action.payload.workTypes
    },
    updateCoreInformationStep4: (
      state,
      action: PayloadAction<TCandidateContactInformationRequest>
    ) => {
      state.candidatePrevious = { ...state.candidate! }
      const payload = action.payload

      state.candidate!.firstName = payload.firstName
      state.candidate!.lastName = payload.lastName
      state.candidate!.phone = payload.phone
      state.candidate!.address = payload.address
    },
    completeCoreInformation: (
      state,
      action: PayloadAction<TCandidateLinkedInUrlRequest>
    ) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.linkedInUrl = action.payload.linkedInUrl
      state.coreInformationStatus = CoreInformationStatus.Completing
    },
    addWorkExperience: (
      state,
      action: PayloadAction<TCandidateWorkExperience>
    ) => {
      const payload = action.payload
      if (payload.isCurrentJob && payload.type == WorkExperienceType.Job) {
        state.currentWorkExperiencePrevious = {
          ...state.currentWorkExperience!
        }

        state.currentWorkExperience = payload
      }
    },
    updateWorkExperience: (
      state,
      action: PayloadAction<TCandidateWorkExperience>
    ) => {
      const payload = action.payload
      if (payload.isCurrentJob && payload.type == WorkExperienceType.Job) {
        state.currentWorkExperiencePrevious = {
          ...state.currentWorkExperience!
        }

        state.currentWorkExperience = payload
      }
    },
    updateWorkExperiences: (
      state,
      action: PayloadAction<TCandidateWorkExperience[]>
    ) => {
      state.candidatePrevious = { ...state.candidate! }

      if (!state.candidate?.candidateWorkExperiences) {
        state.candidate!.candidateWorkExperiences = []
      }

      state.candidate!.candidateWorkExperiences = action.payload
      const currentExperience = action.payload.find(
        (w) => w.isCurrentJob && w.type == WorkExperienceType.Job
      )

      if (currentExperience) {
        state.currentWorkExperience = currentExperience
      }
    },
    removeWorkExperience: (state, action: PayloadAction<string>) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.candidateWorkExperiences =
        state.candidate!.candidateWorkExperiences.filter(
          (x) => x.id != action.payload
        )
    },
    addEducation: (
      state,
      action: PayloadAction<TAddCandidateEducationRequest>
    ) => {},
    updateEducation: (
      state,
      action: PayloadAction<TUpdateCandidateEducation>
    ) => {},
    updateEducations: (
      state,
      action: PayloadAction<TCandidateEducationResponse[]>
    ) => {
      state.candidatePrevious = { ...state.candidate! }

      if (!state.candidate?.candidateEducations) {
        state.candidate!.candidateEducations = []
      }

      state.candidate!.candidateEducations = action.payload
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.candidateEducations =
        state.candidate!.candidateEducations.filter(
          (x) => x.id != action.payload
        )
    },
    addCourse: (state, action: PayloadAction<TAddCandidateCourseRequest>) => {},
    updateCourse: (state, action: PayloadAction<TUpdateCandidateCourse>) => {},
    updateCourses: (
      state,
      action: PayloadAction<TCandidateCourseResponse[]>
    ) => {
      state.candidatePrevious = { ...state.candidate! }

      if (!state.candidate?.candidateCourses) {
        state.candidate!.candidateCourses = []
      }

      state.candidate!.candidateCourses = action.payload
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.candidateCourses =
        state.candidate!.candidateCourses.filter((x) => x.id != action.payload)
    },
    updateCompetencies: (
      state,
      action: PayloadAction<TUpdateCandidateCompetenciesRequest>
    ) => {
      state.candidatePrevious = { ...state.candidate! }

      const payload = action.payload
      state.candidate!.skills = payload.skills || state.candidate!.skills

      state.candidate!.languages =
        payload.languages || state.candidate!.languages

      state.candidate!.industries =
        payload.industries || state.candidate!.industries
    },
    changeState: (state, action: PayloadAction<TCandidateProfileState>) => {
      const payload = action.payload
      state.loadingData = payload.loadingData ?? state.loadingData
      state.candidate = payload.candidate ?? state.candidate
      state.candidateExists = payload.candidateExists ?? state.candidateExists
      state.currentWorkExperience =
        payload.currentWorkExperience ?? state.currentWorkExperience
      state.coreInformationStatus =
        payload.coreInformationStatus ?? state.coreInformationStatus
    },
    setWorkTerms: (
      state,
      action: PayloadAction<TCandidateWorkTermsRequest>
    ) => {
      state.candidatePrevious = { ...state.candidate! }

      const payload = action.payload
      state.candidate!.workingHourTypes =
        payload.workingHoursTypes || state.candidate!.workingHourTypes

      state.candidate!.startDate =
        payload.startDate || state.candidate!.startDate

      state.candidate!.formats = payload.formats || state.candidate!.formats

      state.candidate!.weeklyWorkHours =
        payload.weeklyWorkHours || state.candidate!.weeklyWorkHours
    },
    setSalaryData: (state, action: PayloadAction<TCandidateSalaryRequest>) => {
      const payload = action.payload
      state.candidatePrevious = { ...state.candidate! }

      state.candidate!.currency = payload.currency || state.candidate?.currency

      if (payload.freelanceHourlySalary || payload.freelanceMonthlySalary) {
        state.candidate!.freelance = {
          hourlySalary: payload.freelanceHourlySalary,
          monthlySalary: payload.freelanceMonthlySalary
        }
      }

      if (payload.fullTimeMonthlySalary) {
        state.candidate!.permanent = {
          monthlySalary: payload.fullTimeMonthlySalary
        }
      }
    },
    setLegalTerms: (state, action: PayloadAction<TLegalTerms>) => {
      state.candidatePrevious = { ...state.candidate! }
      const payload = action.payload
      state.candidate!.termsAndConditions = {
        agreed: payload.termsAgreement,
        modifiedAt: payload.modifiedAt
      }
      state.candidate!.marketingAcknowledgement = {
        agreed: payload.marketingAgreement,
        modifiedAt: payload.modifiedAt
      }
    },
    setTermsPending: (state, action: PayloadAction<boolean>) => {
      state.loadingData = {
        ...state.loadingData,
        termsPending: action.payload
      }
    },
    setCandidatePicture: (
      state,
      action: PayloadAction<TUpdateCandidatePicture>
    ) => {
      state.candidatePrevious = { ...state.candidate! }

      if (action.payload.pictureCache.hasChanged) {
        state.candidate!.picture = action.payload.picture
      }
    },
    updateHobbies: (
      state,
      action: PayloadAction<TUpdateCandidateHobbiesRequest>
    ) => {
      state.candidatePrevious = { ...state.candidate! }

      const payload = action.payload
      state.candidate!.hobbies = payload.hobbies
    },
    setCandidateCurriculumVitae: (
      state,
      action: PayloadAction<TUpdateCandidateCurriculumVitae>
    ) => {
      state.candidatePrevious = { ...state.candidate! }
      state.candidate!.bio = action.payload.bio

      if (action.payload.curriculumVitaeCache.hasChanged) {
        state.candidate!.curriculumVitae = action.payload.curriculumVitae
      }
    },
    setSettings: (state, action: PayloadAction<TSettings>) => {
      state.candidatePrevious = { ...state.candidate! }
      const payload = action.payload
      state.candidate!.systemLanguage = payload.systemLanguage
      state.candidate!.marketingAcknowledgement = {
        agreed: payload.marketingAcknowledgement,
        modifiedAt: payload.modifiedAt
      }
    },
    setSettingsUpdateState: (
      state,
      action: PayloadAction<TSettingsUpdateState>
    ) => {
      state.loadingData = {
        ...state.loadingData,
        settingsUpdateState: action.payload
      }
    },
    getCandidateAppliedJobIds: () => {},
    setCandidateAppliedJobIds: (state, action: PayloadAction<string[]>) => {
      state.candidateAppliedToJobIds = action.payload
    },
    AppliedToJob: (state, action: PayloadAction<string>) => {
      state.candidateAppliedToJobIds = [
        ...state.candidateAppliedToJobIds!,
        action.payload
      ]
    }
  }
})

export default candidateProfileSlice.reducer

export const {
  getSelfRequest,
  registerSelfRequest,
  updateCoreInformationStep1,
  updateCoreInformationStep2Add,
  updateCoreInformationStep2Update,
  updateCoreInformationStep3,
  updateCoreInformationStep4,
  completeCoreInformation,
  updateWorkExperiences,
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  setPending,
  changeState,
  updateEducations,
  addEducation,
  updateEducation,
  removeEducation,
  addCourse,
  updateCourse,
  removeCourse,
  updateCourses,
  updateCompetencies,
  setWorkTerms,
  setLegalTerms,
  setTermsPending,
  setSalaryData,
  setCandidatePicture,
  updateHobbies,
  setCandidateCurriculumVitae,
  setCandidate,
  setSettings,
  setSettingsUpdateState,
  getCandidateAppliedJobIds,
  setCandidateAppliedJobIds,
  AppliedToJob
} = candidateProfileSlice.actions
