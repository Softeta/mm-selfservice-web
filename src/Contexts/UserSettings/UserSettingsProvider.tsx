import { IProvider } from 'Contexts/IProvider'
import { useSystemLanguage } from 'Hooks/useSystemLanguage'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import UserSettingsContext, {
  defaultLanguage,
  TSelectedSettings
} from './UserSettingsContext'

const qsLanguageKey = 'language'
const systemLanguageKey = 'systemLanguage'
const termsAndConditions = 'termsAndConditions'
const marketingAcknowledgement = 'marketingAcknowledgement'

export const UserSettingsProvider = ({ children }: IProvider) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getQsLanguage = () => {
    return searchParams.get(qsLanguageKey)?.toUpperCase()
  }

  const getSystemLanguage = () => {
    return (
      getQsLanguage() ??
      localStorage.getItem(systemLanguageKey) ??
      defaultLanguage
    )
  }

  const preferedSystemLanguage = useSystemLanguage()
  const { i18n } = useTranslation()

  const [systemLanguage, setSystemLanguage] = useState(
    preferedSystemLanguage ?? getSystemLanguage()
  )
  const [termsAccepted, acceptTerms] = useState(false)
  const [marketingAccepted, acceptMarketing] = useState(false)

  useEffect(() => {
    const languageFromStorage = localStorage.getItem(systemLanguageKey)

    if (!languageFromStorage) {
      const language = preferedSystemLanguage ?? getSystemLanguage()
      localStorage.setItem(systemLanguageKey, language)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLanguageSelection = (code: string) => {
    if (getQsLanguage()) {
      setSearchParams({ [qsLanguageKey]: code })
    }

    setSystemLanguage(code)
    localStorage.setItem(systemLanguageKey, code)
  }

  const handleAcceptTerms = (accept: boolean) => {
    acceptTerms(accept)
    localStorage.setItem(termsAndConditions, accept.toString())
  }

  const handleAcceptMarketing = (accept: boolean) => {
    acceptMarketing(accept)
    localStorage.setItem(marketingAcknowledgement, accept.toString())
  }

  useEffect(() => {
    const terms = localStorage.getItem(termsAndConditions)
    const marketing = localStorage.getItem(marketingAcknowledgement)

    if (preferedSystemLanguage) {
      handleLanguageSelection(preferedSystemLanguage)
    }

    if (terms) acceptTerms(terms === 'true')
    if (marketing) acceptMarketing(marketing === 'true')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferedSystemLanguage])

  useEffect(() => {
    i18n.changeLanguage(systemLanguage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemLanguage])

  const value: TSelectedSettings = useMemo(
    () => ({
      systemLanguage: systemLanguage,
      termsAndConditionsAccepted: termsAccepted,
      marketingAcknowledgementAccepted: marketingAccepted,
      setLanguage: handleLanguageSelection,
      acceptTerms: handleAcceptTerms,
      acceptMarketing: handleAcceptMarketing
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [systemLanguage, termsAccepted, marketingAccepted]
  )

  return (
    <UserSettingsContext.Provider value={value}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export default UserSettingsProvider
