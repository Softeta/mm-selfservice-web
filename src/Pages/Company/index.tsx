import { loginCompanyRequest, msalConfig } from 'Authentication/Company/config'
import CompanyRoutes from 'Routes/Company/CompanyRoutes'
import AzureMsalProvider from 'Contexts/AzureMsal/AzureMsalProvider'
import AuthenticatedCompanyProvider from 'Contexts/AuthenticatedCompany/AuthenticatedCompanyProvider'
import AuthenticatedCompanyRoutes from 'Routes/Company/AuthenticatedCompanyRoutes'
import UserSettingsProvider from 'Contexts/UserSettings/UserSettingsProvider'
import { CompanyHeader } from './Header'
import { Page } from 'Components/Atoms/Page'
import AzureAuthenticatedProvider from 'Contexts/AzureMsal/AzureAuthenticatedProvider'
import {
  companiesB2CDomain,
  companySigninUserFlow
} from 'Variables/environmentVariables'
import { CompanyBottomMenu } from 'Components/Organisms/CompanyBottomMenu'
import { ShortlistCandidateBottomMenu } from 'Components/Organisms/ShortlistCandidateBottomMenu'

export const Company = () => (
  <Page className="company">
    <UserSettingsProvider>
      <AzureMsalProvider
        configuration={msalConfig}
        tokenRequest={loginCompanyRequest}
        acceptedAccountResolver={(a) =>
          a.environment === `${companiesB2CDomain}.b2clogin.com`
        }
        userFlowAcceptedAccountResolver={(a) =>
          a.environment === `${companiesB2CDomain}.b2clogin.com` &&
          a.homeAccountId.includes(companySigninUserFlow.toLowerCase())
        }
      >
        <AzureAuthenticatedProvider expectAuthenticated={true}>
          <AuthenticatedCompanyProvider>
            <CompanyHeader>
              <AuthenticatedCompanyRoutes />
              <CompanyBottomMenu />
              <ShortlistCandidateBottomMenu />
            </CompanyHeader>
          </AuthenticatedCompanyProvider>
        </AzureAuthenticatedProvider>
        <AzureAuthenticatedProvider expectAuthenticated={false}>
          <CompanyRoutes />
        </AzureAuthenticatedProvider>
      </AzureMsalProvider>
    </UserSettingsProvider>
  </Page>
)

export default Company
