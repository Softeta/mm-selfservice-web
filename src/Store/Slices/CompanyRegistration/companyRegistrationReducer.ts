import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TCompanyRegisterRequest } from 'API/Types/Company/companyRegister'
import { TErrorResponse } from 'API/Types/errorResponse'
import {
  TCompanyRegistrationState,
  TCompanyState,
  TJobInitState
} from './Types/companyRegistrationState'

export type TStateUpdate = {
  pending: boolean
  isStep1Prepared: boolean
  error?: TErrorResponse
}

const initialState: TCompanyRegistrationState = Object.freeze({
  pending: true,
  isStep1Prepared: false,
  job: {
    isUrgent: false,
    workTypes: []
  }
})

export const companyRegistrationSlice = createSlice({
  name: 'companyRegistration',
  initialState,
  reducers: {
    setJob: (state, action: PayloadAction<TJobInitState>) => {
      state.job = action.payload
      state.isStep1Prepared = true
    },
    setCompany: (state, action: PayloadAction<TCompanyState>) => {
      state.pending = false
      state.company = action.payload
    },
    registerCompany: (
      state,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      action: PayloadAction<TCompanyRegisterRequest>
    ) => {
      state.pending = true
    }
  }
})

export default companyRegistrationSlice.reducer

export const { registerCompany, setJob, setCompany } =
  companyRegistrationSlice.actions
