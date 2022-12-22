import { PayloadAction } from '@reduxjs/toolkit'
import { completeCoreInformation } from 'API/Calls/candidateCoreInformation'
import { TCandidateLinkedInUrlRequest } from 'API/Types/Candidate/candidateLinkedInUrl'
import { CoreInformationStatus } from 'API/Types/Enums/coreInformationStatus'
import { call, put, select } from 'redux-saga/effects'
import { changeState } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { getCandidateId, getState } from 'Store/State/candidate'

export function* CompleteSaga(
  action: PayloadAction<TCandidateLinkedInUrlRequest>
) {
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )
  const state: ReturnType<typeof getState> = yield select(getState)

  try {
    const { data } = yield call(
      completeCoreInformation,
      candidateId!,
      action.payload
    )

    yield put(
      changeState({
        candidate: data,
        coreInformationStatus: CoreInformationStatus.Completed
      })
    )
  } catch (error) {
    yield put(
      changeState({
        candidate: state.candidatePrevious,
        coreInformationStatus: CoreInformationStatus.Error
      })
    )
  }
}
