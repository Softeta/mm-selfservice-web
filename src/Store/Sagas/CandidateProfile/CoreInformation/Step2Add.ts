import { PayloadAction } from '@reduxjs/toolkit'
import { updateCoreInformationStep2Add } from 'API/Calls/candidateCoreInformation'
import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import { call, put, select } from 'redux-saga/effects'
import {
  changeState,
  updateWorkExperiences
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { getCandidateId, getState } from 'Store/State/candidate'

export function* Step2AddSaga(action: PayloadAction<TCandidateWorkExperience>) {
  const state: ReturnType<typeof getState> = yield select(getState)
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )

  try {
    const response = (yield call(
      updateCoreInformationStep2Add,
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
