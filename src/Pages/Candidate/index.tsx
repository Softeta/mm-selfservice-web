import { AuthenticatedCandidateRoutes } from 'Routes/Candidate/AuthenticatedCandidateRoutes'
import CandidateRoutes from 'Routes/Candidate/CandidateRoutes'
import AzureMsalProvider from 'Contexts/AzureMsal/AzureMsalProvider'
import {
  loginCandidateRequest,
  msalConfig
} from 'Authentication/Candidate/config'
import UserSettingsProvider from 'Contexts/UserSettings/UserSettingsProvider'
import { AuthenticatedCandidateProvider } from '../../Contexts/AuthenticatedCandidate/AuthenticatedCandidateProvider'
import { CandidateHeader } from './Header'
import { Page } from 'Components/Atoms/Page'
import AzureAuthenticatedProvider from 'Contexts/AzureMsal/AzureAuthenticatedProvider'
import { candidatesB2CDomain } from 'Variables/environmentVariables'
import { CandidateAppliedToJobsProvider } from 'Contexts/CandidateAppliedToJobs/CandidateAppliedToJobsProvider'
import { CandidateBottomMenu } from 'Components/Organisms/CandidateBottomMenu'

export const Candidate = () => {
  return (
    <Page className="candidate">
      <UserSettingsProvider>
        <AzureMsalProvider
          configuration={msalConfig}
          tokenRequest={loginCandidateRequest}
          acceptedAccountResolver={(a) =>
            a.environment === `${candidatesB2CDomain}.b2clogin.com`
          }
        >
          <AzureAuthenticatedProvider expectAuthenticated={true}>
            <AuthenticatedCandidateProvider>
              <CandidateAppliedToJobsProvider>
                <CandidateHeader />
                <AuthenticatedCandidateRoutes />
                <CandidateBottomMenu />
              </CandidateAppliedToJobsProvider>
            </AuthenticatedCandidateProvider>
          </AzureAuthenticatedProvider>
          <AzureAuthenticatedProvider expectAuthenticated={false}>
            <CandidateRoutes />
          </AzureAuthenticatedProvider>
        </AzureMsalProvider>
      </UserSettingsProvider>
    </Page>
  )
}

export default Candidate
