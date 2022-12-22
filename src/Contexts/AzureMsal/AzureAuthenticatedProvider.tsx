import { InteractionStatus } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'
import { CircularProgress } from '@mui/material'
import { IProvider } from 'Contexts/IProvider'
import { useEffect, useState } from 'react'
import {
  getAcceptedAccountResolver,
  getAccount,
  getAzureMsalInstance
} from 'Services/AzureMsal'

interface IAzureAuthenticatedProvider extends IProvider {
  expectAuthenticated: boolean
}

export const AzureAuthenticatedProvider = ({
  children,
  expectAuthenticated
}: IAzureAuthenticatedProvider) => {
  const acceptedResolver = getAcceptedAccountResolver()
  const [authenticated, setAuthenticated] = useState(false)
  const msal = useMsal()

  useEffect(() => {
    const acc = getAccount(getAzureMsalInstance(), acceptedResolver)
    setAuthenticated(!!acc)
  }, [acceptedResolver, msal])

  if (msal.inProgress === InteractionStatus.None) {
    return <>{authenticated === expectAuthenticated && <>{children}</>}</>
  }

  return (null)
}

export default AzureAuthenticatedProvider
