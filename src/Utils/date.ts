export const monthYearFormat: Intl.DateTimeFormatOptions = {
  month: 'long',
  year: 'numeric'
}

export const getMaxDate = (
  ...dates: (Date | undefined)[]
): Date | undefined => {
  let maxDate = 0
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    if (typeof date === 'string') {
      maxDate = Math.max(maxDate, Date.parse(date))
    } else if (date) {
      maxDate = Math.max(maxDate, date.getDate())
    }
  }

  if (maxDate !== 0) {
    return new Date(maxDate)
  }
}

export const getMaxDateFromStrings = (
  ...dates: (string | undefined)[]
): Date | undefined => {
  let maxDate = 0
  for (let i = 0; i < dates.length; i++) {
    const date = dates[i]
    if (date) {
      maxDate = Math.max(maxDate, Date.parse(date))
    }
  }

  if (maxDate !== 0) {
    return new Date(maxDate)
  }
}
