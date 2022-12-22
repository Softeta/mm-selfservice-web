import {
  AccountInfo,
  Configuration,
  IPublicClientApplication,
  PublicClientApplication,
  RedirectRequest
} from '@azure/msal-browser'

export type TAcceptedAccountResolver = (acc: AccountInfo) => boolean

let _instance: IPublicClientApplication
let _tokenRequest: RedirectRequest
let _acceptedAccountResolver: TAcceptedAccountResolver
let _userFlowAcceptedAccountResolver: TAcceptedAccountResolver | undefined

export const setAzureMsalConfiguration = (
  config: Configuration,
  tokenRequest: RedirectRequest,
  acceptedAccountResolver: TAcceptedAccountResolver,
  userFlowAcceptedAccountResolver?: TAcceptedAccountResolver
) => {
  _instance = new PublicClientApplication(config)
  _tokenRequest = tokenRequest
  _acceptedAccountResolver = acceptedAccountResolver
  _userFlowAcceptedAccountResolver = userFlowAcceptedAccountResolver
}

export const getAzureMsalInstance = (): IPublicClientApplication => _instance
export const getTokenRequest = (): RedirectRequest => _tokenRequest
export const getAcceptedAccountResolver = (): TAcceptedAccountResolver =>
  _acceptedAccountResolver
export const getUserFlowAcceptedAccountResolver = ():
  | TAcceptedAccountResolver
  | undefined => _userFlowAcceptedAccountResolver

export const forceLogoutFromAzureMsal = (): void => {
  const localKeys = Object.keys(localStorage)
  const localMsalData = []
  for (const index in localKeys) {
    const key = localKeys[index]
    if (
      key.includes('b2clogin.com') ||
      key.includes('msal') ||
      key.includes('server-telemetry')
    ) {
      localMsalData.push(key)
    }
  }

  const sessionKeys = Object.keys(sessionStorage)
  const sessionMsalData = []
  for (const index in sessionKeys) {
    const key = sessionKeys[index]
    if (
      key.includes('b2clogin.com') ||
      key.includes('msal') ||
      key.includes('server-telemetry')
    ) {
      sessionMsalData.push(key)
    }
  }

  for (const index in localMsalData) {
    const localKey = localMsalData[index]
    localStorage.removeItem(localKey)
  }

  for (const index in sessionMsalData) {
    const sessionKey = sessionMsalData[index]
    sessionStorage.removeItem(sessionKey)
  }
}

export const acquireAccessToken = async (): Promise<string | null> => {
  const activeAccount = getAccount(_instance, _acceptedAccountResolver)
  if (activeAccount == null) {
    return null
  }

  const request = {
    ...getTokenRequest(),
    account: activeAccount
  }

  const authResult = await _instance.acquireTokenSilent(request)
  return authResult.accessToken
}

export const getAccount = (
  instance: IPublicClientApplication,
  acceptedAccountResolver: TAcceptedAccountResolver
): AccountInfo | null => {
  const accounts = instance.getAllAccounts()

  if (_userFlowAcceptedAccountResolver) {
    const accountWithSigninFlow = accounts.find(
      _userFlowAcceptedAccountResolver
    )

    if (accountWithSigninFlow) {
      return accountWithSigninFlow
    }
  }

  for (let i = 0; i < accounts.length; i++) {
    const account = accounts[i]
    if (acceptedAccountResolver(account)) {
      return account
    }
  }

  return null
}

export const getCurrentAccount = () =>
  !_instance || !_acceptedAccountResolver
    ? null
    : getAccount(_instance, _acceptedAccountResolver)
