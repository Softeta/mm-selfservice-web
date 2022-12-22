import {
  Configuration,
  RedirectRequest,
  SilentRequest
} from '@azure/msal-browser'

const azureB2CandidateDomain = import.meta.env.VITE_FRONTOFFICE_CANDIDATE_DOMAIN
const b2cSignUpFlow = import.meta.env.VITE_FRONTOFFICE_CANDIDATE_SIGNUP_FLOW
const b2cSignInFlow = import.meta.env.VITE_FRONTOFFICE_CANDIDATE_SIGNIN_FLOW
const b2cForgotPassword = import.meta.env
  .VITE_FRONTOFFICE_CANDIDATE_FORGOT_PASSWORD_FLOW

export const b2cPolicies = {
  names: {
    signUp: b2cSignUpFlow,
    signIn: b2cSignInFlow,
    forgotPassword: b2cForgotPassword
  },
  authorities: {
    signUp: {
      authority: `https://${azureB2CandidateDomain}.b2clogin.com/${azureB2CandidateDomain}.onmicrosoft.com/${b2cSignUpFlow}`
    },
    signIn: {
      authority: `https://${azureB2CandidateDomain}.b2clogin.com/${azureB2CandidateDomain}.onmicrosoft.com/${b2cSignInFlow}`
    },
    signForgotPassword: {
      authority: `https://${azureB2CandidateDomain}.b2clogin.com/${azureB2CandidateDomain}.onmicrosoft.com/${b2cForgotPassword}`
    }
  },
  authorityDomain: `${azureB2CandidateDomain}.b2clogin.com`
}

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_FRONTOFFICE_CANDIDATE_APP_ID || '',
    knownAuthorities: [b2cPolicies.authorityDomain],
    postLogoutRedirectUri: '/myprofile',
    navigateToLoginRequestUrl: false
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false
  }
}

export const protectedResources = {
  scopes: [
    `https://${azureB2CandidateDomain}.onmicrosoft.com/${
      import.meta.env.VITE_FRONTOFFICE_CANDIDATE_SCOPE
    }`
  ]
}

export const loginCandidateRequest: RedirectRequest = {
  authority: b2cPolicies.authorities.signIn.authority,
  scopes: protectedResources.scopes
}

export const getSignUpRequest = (
  selectedLanguage?: string
): RedirectRequest => {
  const params = {
    redirectUri: '/myprofile/confirmation-email',
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
    redirectUri: '/myprofile',
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
