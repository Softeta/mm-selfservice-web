import React from 'react'
export const defaultLanguage = 'DA'

export type TSelectedSettings = {
  systemLanguage: string
  termsAndConditionsAccepted: boolean
  marketingAcknowledgementAccepted: boolean
  setLanguage: (value: string) => void
  acceptTerms: (value: boolean) => void
  acceptMarketing: (value: boolean) => void
}

const UserSettingsContext = React.createContext<TSelectedSettings>({
  systemLanguage: defaultLanguage,
  termsAndConditionsAccepted: false,
  marketingAcknowledgementAccepted: false,
  setLanguage: () => ({}),
  acceptTerms: () => ({}),
  acceptMarketing: () => ({})
})

export default UserSettingsContext
