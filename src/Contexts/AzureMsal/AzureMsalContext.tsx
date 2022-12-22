import { IPublicClientApplication } from '@azure/msal-browser'
import React from 'react'

const AzureMsalContext = React.createContext<IPublicClientApplication | null>(
  null
)

export default AzureMsalContext
