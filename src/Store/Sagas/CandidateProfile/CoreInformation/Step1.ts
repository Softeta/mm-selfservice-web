import { PayloadAction } from '@reduxjs/toolkit'
import { updateCoreInformationStep1 } from 'API/Calls/candidateCoreInformation'
import { TCandidateActivityStatusRequest } from 'API/Types/Candidate/candidateActivityStatus'
import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { call, put, select } from 'redux-saga/effects'
import {
  changeState,
  updateWorkExperiences
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { getCandidateId, getState } from 'Store/State/candidate'

export function* Step1Saga(
  action: PayloadAction<TCandidateActivityStatusRequest>
) {
  const state: ReturnType<typeof getState> = yield select(getState)
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )

  try {
    const response = (yield call(
      updateCoreInformationStep1,
      candidateId!,
      action.payload
    )) as TCandidateResponse

    yield put(updateWorkExperiences(response.data.candidateWorkExperiences))
  } catch (error) {
    yield put(
      changeState({
        candidate: state.candidatePrevious
      })
    )
  }
}
