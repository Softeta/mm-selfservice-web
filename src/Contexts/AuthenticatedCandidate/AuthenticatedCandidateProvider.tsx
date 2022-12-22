import { connect } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'

import AuthenticatedCandidateComponent from './AuthenticatedCandidateComponent'

const mapStateToProps = (state: RootState) => {
  return {
    pending: state.candidateProfile.loadingData?.pending,
    candidate: state.candidateProfile.candidate,
    candidateExists: state.candidateProfile.candidateExists
  }
}

export const AuthenticatedCandidateProvider = connect(mapStateToProps)(
  AuthenticatedCandidateComponent
)
