import { PayloadAction } from '@reduxjs/toolkit'
import { updateContactPersonLegalTerms } from 'API/Calls/contactPersons'
import { TLegalTerms } from 'API/Types/legalAgreement'
import { put } from 'redux-saga/effects'
import { setTermsPending } from 'Store/Slices/ContactPerson/contactPersonReducer'
import { executeContactPersonSaga } from './Utils/contactPersonSagaUtils'

export function* setLegalTermsSaga(action: PayloadAction<TLegalTerms>) {
  yield put(setTermsPending(true))
  yield executeContactPersonSaga(updateContactPersonLegalTerms, action, {
    onFinally: () => put(setTermsPending(false))
  })
}
