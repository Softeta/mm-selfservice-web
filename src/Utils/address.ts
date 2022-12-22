import { TAddress } from 'API/Types/address'

export const addressToCityCountry = (
  address?: TAddress
): string | undefined => {
  if (!address || (!address.city && !address.country)) {
    return
  }

  let result = ''
  if (address.city) {
    result += address.city
  }

  if (address.country) {
    result += `${result.length > 0 ? ', ' : ''}${address.country}`
  }

  return result
}
