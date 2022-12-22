import { PayloadAction } from '@reduxjs/toolkit'
import {
  addCandidateWorkExperience,
  updateCandidateWorkExperience
} from 'API/Calls/candidateWorkExperience'
import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import { put, call, select } from 'redux-saga/effects'
import {
  changeState,
  updateWorkExperiences
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { getCandidateId, getState } from 'Store/State/candidate'

export function* insertWorkExperienceSaga(
  action: PayloadAction<TCandidateWorkExperience>
) {
  const state: ReturnType<typeof getState> = yield select(getState)
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )

  try {
    const method = action.payload.id
      ? updateCandidateWorkExperience
      : addCandidateWorkExperience

    const response = (yield call(
      method,
      candidateId!,
      action.payload
    )) as TCandidateResponse

    yield put(updateWorkExperiences(response.data.candidateWorkExperiences))
  } catch (error) {
    yield put(
      changeState({
        candidate: state.candidatePrevious,
        currentWorkExperience: state.currentWorkExperiencePrevious
      })
    )
  }
}
