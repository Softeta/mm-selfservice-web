import { CircularProgress } from '@mui/material'
import { useCountrySettings } from 'API/Calls/countrySettings'
import { IProvider } from 'Contexts/IProvider'
import { useEffect, useState } from 'react'
import {
  CountrySettingsContext,
  initCountrySettings
} from './CountrySettingsContext'

export const CountrySettingsProvider = ({ children }: IProvider) => {
  const [countrySettings, setCountrySettings] = useState(initCountrySettings)

  const { isLoading, isError, data } = useCountrySettings()

  useEffect(() => {
    if (data?.data) {
      setCountrySettings(data.data)
    }
  }, [data])

  if (isLoading) return <CircularProgress />
  if (isError) return <p>Error fetching country settings.</p>

  return (
    <CountrySettingsContext.Provider value={countrySettings}>
      {children}
    </CountrySettingsContext.Provider>
  )
}

export default CountrySettingsProvider
