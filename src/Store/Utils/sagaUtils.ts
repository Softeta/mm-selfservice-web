import { Action } from '@reduxjs/toolkit'
import { call, put } from 'redux-saga/effects'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...args: any[]) => any

export type TOnEvent = {
  onSuccess?: () => any
  onFailure?: () => any
  onFinally?: () => any
}

export type TSagaAction<Fn extends FunctionType, A extends Action> = {
  action: Fn
  reset?: A
  onEvent?: TOnEvent
}

export function* executeSaga<Fn extends FunctionType, A extends Action>(
  params: TSagaAction<Fn, A>,
  ...args: Parameters<Fn>
) {
  try {
    yield call<FunctionType>(params.action, ...args)

    if (params.onEvent?.onSuccess) {
      yield params.onEvent?.onSuccess()
    }
  } catch (error) {
    if (params.reset) {
      yield put(params.reset)
    }

    if (params.onEvent?.onFailure) {
      yield params.onEvent?.onFailure()
    }
  }

  if (params.onEvent?.onFinally) {
    yield params.onEvent?.onFinally()
  }
}
