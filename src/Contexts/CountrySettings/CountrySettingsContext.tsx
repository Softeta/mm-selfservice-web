import { TCountrySettings } from 'API/Types/countrySettings'
import { createContext } from 'react'

export type TCountrySettingsData = {
  settings: TCountrySettings
}

const initCountrySettings: TCountrySettings = {
  weeklyFullTimeHours: {
    Denmark: 37,
    Other: 40
  }
}

const CountrySettingsContext = createContext({} as TCountrySettings)

export { CountrySettingsContext, initCountrySettings }
