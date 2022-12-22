import { Configuration, RedirectRequest } from '@azure/msal-browser'
import { routes } from 'Routes/routes'

const azureB2CCompanyDomain = import.meta.env.VITE_FRONTOFFICE_COMPANY_DOMAIN
const b2cSignUpFlow = import.meta.env.VITE_FRONTOFFICE_COMPANY_SIGNUP_FLOW
const b2cSignInFlow = import.meta.env.VITE_FRONTOFFICE_COMPANY_SIGNIN_FLOW
const b2cForgotPassword = import.meta.env
  .VITE_FRONTOFFICE_COMPANY_FORGOT_PASSWORD_FLOW

const b2cPolicies = {
  names: {
    signUp: b2cSignUpFlow,
    signIn: b2cSignInFlow,
    forgotPassword: b2cForgotPassword
  },
  authorities: {
    signUp: {
      authority: `https://${azureB2CCompanyDomain}.b2clogin.com/${azureB2CCompanyDomain}.onmicrosoft.com/${b2cSignUpFlow}`
    },
    signIn: {
      authority: `https://${azureB2CCompanyDomain}.b2clogin.com/${azureB2CCompanyDomain}.onmicrosoft.com/${b2cSignInFlow}`
    },
    signForgotPassword: {
      authority: `https://${azureB2CCompanyDomain}.b2clogin.com/${azureB2CCompanyDomain}.onmicrosoft.com/${b2cForgotPassword}`
    }
  },
  authorityDomain: `${azureB2CCompanyDomain}.b2clogin.com`
}

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_FRONTOFFICE_COMPANY_APP_ID || '',
    authority: b2cPolicies.authorities.signIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    postLogoutRedirectUri: routes.company.root,
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
}

export const protectedResources = {
  scopes: [
    `https://${azureB2CCompanyDomain}.onmicrosoft.com/${
      import.meta.env.VITE_FRONTOFFICE_COMPANY_SCOPE
    }`
  ]
}

export const loginCompanyRequest: RedirectRequest = {
  authority: b2cPolicies.authorities.signIn.authority,
  scopes: protectedResources.scopes
}

export const getSignUpRequest = (
  selectedLanguage?: string
): RedirectRequest => {
  const params = {
    redirectUri: routes.company.confirmation,
    authority: b2cPolicies.authorities.signUp.authority,
    scopes: protectedResources.scopes,
    prompt: 'select_account'
  }

  if (selectedLanguage) {
    return {
      ...params,
      extraQueryParameters: {
        ui_locales: selectedLanguage
      }
    }
  }

  return params
}

export const getSignInRequest = (
  selectedLanguage?: string
): RedirectRequest => {
  const params = {
    redirectUri: routes.company.root,
    authority: b2cPolicies.authorities.signIn.authority,
    scopes: protectedResources.scopes
  }

  if (selectedLanguage) {
    return {
      ...params,
      extraQueryParameters: {
        ui_locales: selectedLanguage
      }
    }
  }

  return params
}
