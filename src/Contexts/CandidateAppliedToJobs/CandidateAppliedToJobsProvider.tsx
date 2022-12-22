import { connect } from "react-redux"
import { RootState } from "Store/Slices/rootReducer"
import CandidateAppliedToJobsComponent from "./CandidateAppliedToJobsComponent"

const mapStateToProps = (state: RootState) => {
  return {
    candidateAppliedToJobIds: state.candidateProfile.candidateAppliedToJobIds
  }
}

export const CandidateAppliedToJobsProvider = connect(mapStateToProps)(
  CandidateAppliedToJobsComponent
)
