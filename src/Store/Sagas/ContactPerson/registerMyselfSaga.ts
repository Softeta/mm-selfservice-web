import { PayloadAction } from '@reduxjs/toolkit'
import { registerMyself } from 'API/Calls/contactPersons'
import { TContacPersonSelfRegistrationRequest } from 'API/Types/Company/contactPersonSelfRegistration'
import { put, call } from 'redux-saga/effects'
import { contactPersonSlice } from 'Store/Slices/ContactPerson/contactPersonReducer'

const { setContactPerson } = contactPersonSlice.actions

export function* registerMyselfSaga(
  action: PayloadAction<TContacPersonSelfRegistrationRequest>
) {
  try {
    const { data } = yield call(registerMyself, action.payload)
    yield put(setContactPerson(data))
    // eslint-disable-next-line no-empty
  } catch (error) {}
}
