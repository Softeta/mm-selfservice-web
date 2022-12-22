import { CountrySettingsContext } from 'Contexts/CountrySettings/CountrySettingsContext'
import { useContext } from 'react'

export const useWeeklyFullTimeHours = (country?: string): number => {
  const context = useContext(CountrySettingsContext)!
  if (!country || !context.weeklyFullTimeHours[country]) {
    return context.weeklyFullTimeHours.Other
  }

  return context.weeklyFullTimeHours[country]
}
