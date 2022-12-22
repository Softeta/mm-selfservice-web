import { PayloadAction } from '@reduxjs/toolkit'
import { registerCompany } from 'API/Calls/companies'
import { TCompanyRegisterRequest } from 'API/Types/Company/companyRegister'
import { put, call } from 'redux-saga/effects'
import { companyRegistrationSlice } from 'Store/Slices/CompanyRegistration/companyRegistrationReducer'

const { setCompany } = companyRegistrationSlice.actions

export function* registerCompanySaga(
  action: PayloadAction<TCompanyRegisterRequest>
) {
  try {
    const { data } = yield call(registerCompany, action.payload)
    yield put(setCompany(data))
    // eslint-disable-next-line no-empty
  } catch (error) {}
}
