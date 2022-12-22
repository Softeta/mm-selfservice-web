import { getSelf } from 'API/Calls/contactPersons'
import { TErrorResponse } from 'API/Types/errorResponse'
import { put, call } from 'redux-saga/effects'
import {
  contactPersonSlice,
  changeState
} from 'Store/Slices/ContactPerson/contactPersonReducer'

const { setContactPerson } = contactPersonSlice.actions

export function* fetchSelfSaga() {
  try {
    const { data } = yield call(getSelf)
    yield put(setContactPerson(data))
  } catch (error) {
    const errorResponse = error as TErrorResponse
    const code = errorResponse.response.status
    if (code < 500) {
      yield put(
        changeState({
          contactPersonExists: false,
          loadingData: {
            pending: false
          }
        })
      )
    } else {
      yield put(
        changeState({
          loadingData: {
            pending: false
          }
        })
      )
    }
  }
}
