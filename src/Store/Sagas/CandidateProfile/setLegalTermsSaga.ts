import { PayloadAction } from '@reduxjs/toolkit'
import { updateCandidateLegalTerms } from 'API/Calls/candidates'
import { TLegalTerms } from 'API/Types/legalAgreement'
import { put } from 'redux-saga/effects'
import { setTermsPending } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { executeCandidateProfileSaga } from './Utils/profileSagaUtils'

export function* setLegalTermsSaga(action: PayloadAction<TLegalTerms>) {
  yield put(setTermsPending(true))
  yield executeCandidateProfileSaga(updateCandidateLegalTerms, action, {
    onFinally: () => put(setTermsPending(false))
  })
}
