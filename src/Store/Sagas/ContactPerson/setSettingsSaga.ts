import { PayloadAction } from '@reduxjs/toolkit'
import { updateContactPersonSettings } from 'API/Calls/contactPersons'
import { TSettings } from 'API/Types/settings'
import { put } from 'redux-saga/effects'
import { setSettingsUpdateState } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TSettingsUpdateState } from 'Store/Slices/Types/settingsUpdateState'
import { executeContactPersonSaga } from './Utils/contactPersonSagaUtils'

export function* setSettingsSaga(action: PayloadAction<TSettings>) {
  yield put(setSettingsUpdateState(TSettingsUpdateState.loading))
  yield executeContactPersonSaga(updateContactPersonSettings, action, {
    onFailure: () => put(setSettingsUpdateState(TSettingsUpdateState.error)),
    onSuccess: () => put(setSettingsUpdateState(TSettingsUpdateState.success))
  })
}
