import {
  AccountInfo,
  Configuration,
  EventType,
  IPublicClientApplication,
  RedirectRequest
} from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'
import { CircularProgress } from '@mui/material'
import { IProvider } from 'Contexts/IProvider'
import { useEffect, useState } from 'react'
import {
  acquireAccessToken,
  forceLogoutFromAzureMsal,
  getAzureMsalInstance,
  setAzureMsalConfiguration,
  TAcceptedAccountResolver
} from 'Services/AzureMsal'
import AzureMsalContext from './AzureMsalContext'

interface IAzureMsalProvider extends IProvider {
  configuration: Configuration
  tokenRequest: RedirectRequest
  acceptedAccountResolver: TAcceptedAccountResolver
  userFlowAcceptedAccountResolver?: TAcceptedAccountResolver
}

type TAzureMsalCallback = {
  eventType: EventType
  payload: {
    authority: string | null
    account: AccountInfo | null
  }
}

export const AzureMsalProvider = ({
  configuration,
  tokenRequest,
  acceptedAccountResolver,
  userFlowAcceptedAccountResolver,
  children
}: IAzureMsalProvider) => {
  const [instance, setInstance] = useState<IPublicClientApplication | null>(
    null
  )
  const [verificationInProgress, setVerificationInProgress] = useState(true)

  const verifyAccessToken = async () => {
    try {
      await acquireAccessToken()
    } catch (error) {
      forceLogoutFromAzureMsal()
    }

    setVerificationInProgress(false)
  }

  useEffect(() => {
    if (instance != null) {
      verifyAccessToken()
    }
  }, [instance])

  useEffect(() => {
    setAzureMsalConfiguration(
      configuration,
      tokenRequest,
      acceptedAccountResolver,
      userFlowAcceptedAccountResolver
    )

    const createdInstance = getAzureMsalInstance()
    setInstance(createdInstance)

    createdInstance.enableAccountStorageEvents()
    const callbackId = createdInstance.addEventCallback(
      (message: TAzureMsalCallback) => {
        if (message.eventType === EventType.LOGIN_SUCCESS) {
          const result = message.payload
          createdInstance.setActiveAccount(result.account)
        } else if (message.eventType === EventType.LOGOUT_SUCCESS) {
          createdInstance.setActiveAccount(null)
        } else if (
          message.eventType === EventType.ACQUIRE_TOKEN_BY_CODE_SUCCESS ||
          message.eventType === EventType.ACQUIRE_TOKEN_SUCCESS
        ) {
          const result = message.payload
          createdInstance.setActiveAccount(result.account)
        }
      }
    )

    return () => {
      createdInstance.disableAccountStorageEvents()
      if (callbackId) {
        createdInstance.removeEventCallback(callbackId)
      }
    }
  }, [
    configuration,
    tokenRequest,
    acceptedAccountResolver,
    userFlowAcceptedAccountResolver
  ])

  return (
    <>
      {verificationInProgress && <CircularProgress />}
      {!verificationInProgress && (
        <AzureMsalContext.Provider value={instance}>
          {instance && (
            <MsalProvider instance={instance}>{children}</MsalProvider>
          )}
        </AzureMsalContext.Provider>
      )}
    </>
  )
}

export default AzureMsalProvider
