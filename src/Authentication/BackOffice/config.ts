import { Configuration, RedirectRequest } from '@azure/msal-browser'

const tenantId = import.meta.env.VITE_BACKOFFICE_TENANT_ID
const appId = import.meta.env.VITE_BACKOFFICE_APP_ID
const scope = import.meta.env.VITE_BACKOFFICE_SCOPE

export const msalConfig: Configuration = {
  auth: {
    clientId: appId || '',
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri: '/back-office'
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
}

const protectedResources = {
  scopes: [scope || '']
}

export const loginBackOfficeRequest: RedirectRequest = {
  authority: msalConfig.auth.authority,
  scopes: protectedResources.scopes
}
