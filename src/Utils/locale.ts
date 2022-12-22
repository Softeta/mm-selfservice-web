export const getClientLocale = () => {
  if (typeof Intl !== 'undefined') {
    try {
      return Intl.NumberFormat().resolvedOptions().locale
    } catch (err) {
      return 'en-US'
    }
  }
}
