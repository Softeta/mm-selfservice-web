import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TContactPerson } from 'API/Types/Company/contactPerson'
import { TContacPersonSelfRegistrationRequest } from 'API/Types/Company/contactPersonSelfRegistration'
import { TErrorResponse } from 'API/Types/errorResponse'
import { TLegalTerms } from 'API/Types/legalAgreement'
import { TSettings } from 'API/Types/settings'
import { TSettingsUpdateState } from '../Types/settingsUpdateState'
import { TContactPersonState } from './Types/contactPersonState'

export type TStateUpdate = {
  pending: boolean
  error?: TErrorResponse
}

const initialState: TContactPersonState = Object.freeze({
  loadingData: {
    pending: true
  }
})

export const contactPersonSlice = createSlice({
  name: 'contactPerson',
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
      action: PayloadAction<TContacPersonSelfRegistrationRequest>
    ) => {
      state.loadingData = {
        ...state.loadingData,
        pending: true
      }
    },
    setContactPerson: (state, action: PayloadAction<TContactPerson>) => {
      state.loadingData = {
        ...state.loadingData,
        pending: false
      }
      state.contactPersonExists = true
      state.contactPerson = action.payload
    },
    setPending: (state, action: PayloadAction<boolean>) => {
      state.loadingData = {
        ...state.loadingData,
        pending: action.payload
      }
    },
    changeState: (state, action: PayloadAction<TContactPersonState>) => {
      const payload = action.payload
      state.loadingData = payload.loadingData ?? state.loadingData
      state.contactPerson = payload.contactPerson ?? state.contactPerson
      state.contactPersonExists =
        payload.contactPersonExists ?? state.contactPersonExists
    },
    setLegalTerms: (state, action: PayloadAction<TLegalTerms>) => {
      if (state.contactPerson) {
        state.contactPersonPrevious = { ...state.contactPerson }
      }

      const payload = action.payload
      state.contactPerson!.termsAndConditions = {
        agreed: payload.termsAgreement,
        modifiedAt: new Date().toISOString()
      }
      state.contactPerson!.marketingAcknowledgement = {
        agreed: payload.marketingAgreement,
        modifiedAt: new Date().toISOString()
      }
    },
    setTermsPending: (state, action: PayloadAction<boolean>) => {
      state.loadingData = {
        ...state.loadingData,
        termsPending: action.payload
      }
    },
    setSettings: (state, action: PayloadAction<TSettings>) => {
      state.contactPersonPrevious = { ...state.contactPerson! }
      const payload = action.payload
      state.contactPerson!.systemLanguage = payload.systemLanguage
      state.contactPerson!.marketingAcknowledgement = {
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
    }
  }
})

export default contactPersonSlice.reducer

export const {
  getSelfRequest,
  registerSelfRequest,
  setContactPerson,
  setPending,
  changeState,
  setLegalTerms,
  setTermsPending,
  setSettings,
  setSettingsUpdateState
} = contactPersonSlice.actions
