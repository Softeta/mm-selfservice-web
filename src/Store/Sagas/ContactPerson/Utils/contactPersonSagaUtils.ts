import { PayloadAction } from '@reduxjs/toolkit'
import { select } from 'redux-saga/effects'
import { changeState } from 'Store/Slices/ContactPerson/contactPersonReducer'
import {
  getCompanyId,
  getContactPersonId,
  getState
} from 'Store/State/contactPerson'
import { executeSaga, TOnEvent } from 'Store/Utils/sagaUtils'

type FunctionType = (companyId: string, contactId: string, request: any) => any

export function* executeContactPersonSaga(
  action: FunctionType,
  data: PayloadAction<any>,
  onEvent?: TOnEvent
) {
  const companyId: ReturnType<typeof getCompanyId> = yield select(getCompanyId)

  const contactPersonId: ReturnType<typeof getContactPersonId> = yield select(
    getContactPersonId
  )

  const state: ReturnType<typeof getState> = yield select(getState)

  yield executeSaga(
    {
      action,
      reset: changeState({
        contactPerson: state.contactPersonPrevious,
        loadingData: state.loadingData
      }),
      onEvent
    },
    companyId!,
    contactPersonId!,
    data.payload
  )
}
