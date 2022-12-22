export type TCountrySettingsResponse = {
  data: TCountrySettings
}

export type TCountrySettings = {
  weeklyFullTimeHours: { [key: string]: number }
}
