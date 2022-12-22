import { PayloadAction } from '@reduxjs/toolkit'
import { createEducation } from 'API/Calls/candidateEducation'
import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { TAddCandidateEducationRequest } from 'API/Types/Candidate/Common/candidateEducation'
import { call, put, select } from 'redux-saga/effects'
import { updateEducations } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { getCandidateId } from 'Store/State/candidate'

export function* addEducationSaga(
  action: PayloadAction<TAddCandidateEducationRequest>
) {
  const payload = action.payload
  const candidateId: ReturnType<typeof getCandidateId> = yield select(
    getCandidateId
  )
  const response = (yield call(
    createEducation,
    candidateId!,
    payload
  )) as TCandidateResponse

  yield put(updateEducations(response.data.candidateEducations))
}
