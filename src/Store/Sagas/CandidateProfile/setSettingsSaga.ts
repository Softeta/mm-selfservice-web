import { PayloadAction } from '@reduxjs/toolkit'
import { updateCandidateSettings } from 'API/Calls/candidates'
import { TSettings } from 'API/Types/settings'
import { put } from 'redux-saga/effects'
import { setSettingsUpdateState } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TSettingsUpdateState } from 'Store/Slices/Types/settingsUpdateState'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'

export function* setSettingsSaga(action: PayloadAction<TSettings>) {
  yield put(setSettingsUpdateState(TSettingsUpdateState.loading))
  yield executeCandidateProfileSaga(updateCandidateSettings, action, {
    onFailure: () => put(setSettingsUpdateState(TSettingsUpdateState.error)),
    onSuccess: () => put(setSettingsUpdateState(TSettingsUpdateState.success))
  })
}
