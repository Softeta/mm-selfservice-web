import { connect } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import AuthenticatedCompanyComponent from './AuthenticatedCompanyComponent'

const mapStateToProps = (state: RootState) => {
  return {
    pending: state.contactPerson.loadingData?.pending,
    contactPersonExists: state.contactPerson.contactPersonExists,
    status: state.contactPerson.contactPerson?.stage
  }
}

export const AuthenticatedCompanyProvider = connect(mapStateToProps)(
  AuthenticatedCompanyComponent
)

export default AuthenticatedCompanyProvider
