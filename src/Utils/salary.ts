import { AverageWeeksPerMonth } from './constants'

export const salaryToHourlyRate = (salary: number, weeklyWorkHours: number) =>
  Math.round((salary / (weeklyWorkHours * AverageWeeksPerMonth)) * 100) / 100
