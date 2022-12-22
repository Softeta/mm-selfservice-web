import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  TJobStep4Request,
  TJobStep5Request,
  TJobStep6FreelanceRequest,
  TJobStep6PermanentRequest,
  TJobStep6Request
} from 'API/Types/Jobs/jobCoreInformation'
import { TErrorResponse } from 'API/Types/errorResponse'
import { TJob } from 'API/Types/Jobs/jobs'
import { TCreateJobState } from './Types/createJobState'
import WorkingHoursType from 'API/Types/Enums/workingHoursType'
import CompanyWorkingHoursType from 'API/Types/Enums/companyWorkingHours'

export type TStateUpdate = {
  pending: boolean
  isStep1Prepared: boolean
  error?: TErrorResponse
}

const initialState: TCreateJobState = Object.freeze({
  pending: true
})

export const createJobSlice = createSlice({
  name: 'createJob',
  initialState,
  reducers: {
    setIsAdditionalJobCreationFlow: (state, action: PayloadAction<boolean>) => {
      state.isAdditionalJobCreationFlow = action.payload
    },
    // Job ID is passed to the saga
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initJob: (state, action: PayloadAction<string | undefined>) => {
      state.pending = true
    },
    setJob: (state, action: PayloadAction<TJob | undefined>) => {
      state.job = action.payload
      state.pending = false

      const companyWorkingHours = []
      if (
        state.job?.workingHourTypes?.includes(WorkingHoursType.FullTime) ||
        state.job?.workingHourTypes?.includes(WorkingHoursType.PartTime)
      ) {
        companyWorkingHours.push(CompanyWorkingHoursType.Continuous)
      }
      if (
        state.job?.workingHourTypes?.includes(
          WorkingHoursType.ProjectEmployment
        )
      ) {
        companyWorkingHours.push(CompanyWorkingHoursType.ProjectEmployment)
      }
      state.companyWorkingHours = companyWorkingHours
    },
    setCoreInformationStep4: (
      state,
      action: PayloadAction<TJobStep4Request>
    ) => {
      state.job!.description = action.payload.description
    },
    setCoreInformationStep5: (
      state,
      action: PayloadAction<TJobStep5Request>
    ) => {
      const payload = action.payload
      if (payload.languages) {
        state.job!.languages = payload.languages
      }

      if (payload.industries) {
        state.job!.industries = payload.industries
      }

      if (payload.seniorities) {
        state.job!.seniorities = payload.seniorities
      }

      if (payload.skills) {
        state.job!.skills = payload.skills
      }
    },
    setCoreInformationStep6Freelance: (
      state,
      action: PayloadAction<TJobStep6FreelanceRequest>
    ) => {
      const payload = action.payload
      if (payload.companyWorkingHourTypes) {
        state.companyWorkingHours = payload.companyWorkingHourTypes
      }

      if (payload.address) {
        state!.job!.company.address = payload.address
      }

      if (payload.currency) {
        state!.job!.currency = payload.currency
      }

      if (payload.formats) {
        state!.job!.formats = payload.formats
      }

      state!.job!.freelance = {
        hourlyBudget: payload.hourlyBudget,
        monthlyBudget: payload.monthlyBudget,
        hoursPerProject: payload.hoursPerProject
      }
    },
    setCoreInformationStep6Permanent: (
      state,
      action: PayloadAction<TJobStep6PermanentRequest>
    ) => {
      const payload = action.payload

      if (payload.address) {
        state!.job!.company.address = payload.address
      }

      if (payload.currency) {
        state!.job!.currency = payload.currency
      }

      if (payload.formats) {
        state!.job!.formats = payload.formats
      }

      state!.job!.permanent = {
        monthlyBudget: payload.monthlyBudget
      }
    },
    setCoreInformationStep6FreelanceAndPermanent: (
      state,
      action: PayloadAction<TJobStep6Request>
    ) => {
      const payload = action.payload

      if (payload.freelance?.companyWorkingHourTypes) {
        state.companyWorkingHours = payload.freelance?.companyWorkingHourTypes
      }

      if (payload.address) {
        state!.job!.company.address = payload.address
      }

      if (payload.currency) {
        state!.job!.currency = payload.currency
      }

      if (payload.formats) {
        state!.job!.formats = payload.formats
      }

      if (payload.freelance) {
        state!.job!.freelance = payload.freelance
      }

      if (payload.permanent) {
        state!.job!.permanent = payload.permanent
      }
    }
  }
})

export default createJobSlice.reducer

export const {
  setIsAdditionalJobCreationFlow,
  initJob,
  setJob,
  setCoreInformationStep4,
  setCoreInformationStep5,
  setCoreInformationStep6Freelance,
  setCoreInformationStep6Permanent,
  setCoreInformationStep6FreelanceAndPermanent
} = createJobSlice.actions
