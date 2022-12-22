import { fetchCandidateAppliedInJobIds } from "API/Calls/candidateAppliedToJobs"
import { call, put, select } from "redux-saga/effects"
import { setCandidateAppliedJobIds } from "Store/Slices/CandidateProfile/candidateProfileReducer"
import { getCandidateId } from "Store/State/candidate"

export function* fetchAppliedJobIdsSaga() {
    const candidateId: ReturnType<typeof getCandidateId> = yield select(
      getCandidateId
    )
    const { data } = (yield call(
      fetchCandidateAppliedInJobIds,
      candidateId!
    ))
  
    yield put(setCandidateAppliedJobIds(data))
}
