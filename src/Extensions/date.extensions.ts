import { monthYearFormat } from 'Utils/date'
import { getClientLocale } from 'Utils/locale'

export {}

declare global {
  interface Date {
    formatToMonthYear(): string
    getAge(): number
  }
}

Date.prototype.formatToMonthYear = function (): string {
  return this.toLocaleDateString(getClientLocale(), monthYearFormat)
}

Date.prototype.getAge = function (): number {
  const today = new Date()
  let age = today.getFullYear() - this.getFullYear()
  const m = today.getMonth() - this.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < this.getDate())) {
    age--
  }

  return age
}
