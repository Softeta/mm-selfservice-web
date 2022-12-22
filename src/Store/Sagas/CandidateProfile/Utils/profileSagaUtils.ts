import { PayloadAction } from '@reduxjs/toolkit'
import { select } from 'redux-saga/effects'
import { changeState } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { getCandidateId, getState } from 'Store/State/candidate'
import { executeSaga, TOnEvent } from 'Store/Utils/sagaUtils'

type FunctionType = (candidateId: string, request: any) => any

export function* executeCandidateProfileSaga(
  action: FunctionType,
  data: PayloadAction<any>,
  onEvent?: TOnEvent
) {
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )
  const state: ReturnType<typeof getState> = yield select(getState)

  yield executeSaga(
    {
      action,
      reset: changeState({
        candidate: state.candidatePrevious,
        currentWorkExperience: state.currentWorkExperiencePrevious,
        loadingData: state.loadingData
      }),
      onEvent
    },
    candidateId!,
    data.payload
  )
}
