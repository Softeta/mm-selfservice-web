import { TAddress } from 'API/Types/address'
import { TCompanySearch } from 'API/Types/Company/companySearchGet'
import { TOption } from 'Components/Molecules/Autocomplete/Autocomplete'
import { Guid } from 'Utils/constants'

export const toOptions = (companies: TCompanySearch[]): TOption[] =>
  companies.map(toOption)

export const toOption = (company: TCompanySearch): TOption => {
  const addressLine = company.id && company.id !== Guid.Empty ? 
    company.address?.addressLine :
    buildAddress(company.address)

  return {
    id: company.id,
    code: company.registrationNumber,
    label: addressLine
      ? `${company.name} (${company.registrationNumber}), ${addressLine}`
      : `${company.name} (${company.registrationNumber})`
  }
}

export const toCompany = (option: TOption): TCompanySearch => ({
  id: option.id,
  registrationNumber: option.code!,
  name: option.label
})

export const buildAddress = (address?: TAddress): string | undefined => {
  if (address) {
    const elements = [address.addressLine, address.city, address.country]
    return elements.filter((x) => !!x).join(', ')
  }
}
