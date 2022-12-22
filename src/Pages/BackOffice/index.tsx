import { MsalAuthenticationTemplate } from '@azure/msal-react'
import {
  loginBackOfficeRequest,
  msalConfig
} from 'Authentication/BackOffice/config'
import AzureMsalProvider from 'Contexts/AzureMsal/AzureMsalProvider'
import UserSettingsProvider from 'Contexts/UserSettings/UserSettingsProvider'
import { Page } from 'Components/Atoms/Page'
import BackOfficeRoutes from 'Routes/BackOffice/BackOfficeRoutes'
import { InteractionType } from '@azure/msal-browser'
import AzureAuthenticatedProvider from 'Contexts/AzureMsal/AzureAuthenticatedProvider'
import { CompanyHeader } from 'Pages/Company/Header'

export const BackOffice = () => (
  <Page>
    <UserSettingsProvider>
      <AzureMsalProvider
        configuration={msalConfig}
        tokenRequest={loginBackOfficeRequest}
        acceptedAccountResolver={(a) => {
          const roles = a.idTokenClaims?.roles || []
          const includesRole =
            roles.filter((e) =>
              [
                'BackOffice.User',
                'BackOffice.Researcher',
                'BackOffice.Admin',
                'BackOffice.Consultant'
              ].includes(e)
            ).length > 0
          return includesRole
        }}
      >
        <MsalAuthenticationTemplate
          interactionType={InteractionType.Redirect}
          authenticationRequest={loginBackOfficeRequest}
        >
          <AzureAuthenticatedProvider expectAuthenticated={true}>
            <CompanyHeader>
              <BackOfficeRoutes />
            </CompanyHeader>
          </AzureAuthenticatedProvider>
        </MsalAuthenticationTemplate>
      </AzureMsalProvider>
    </UserSettingsProvider>
  </Page>
)

export default BackOffice
