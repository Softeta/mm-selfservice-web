import { TIndustry } from 'API/Types/industries'
import { TOption } from 'Components/Molecules/Autocomplete/Autocomplete'

export const toOptions = (positions: TIndustry[]): TOption[] =>
  positions.map(toOption)

export const toOption = (industry: TIndustry): TOption => ({
  id: industry.id,
  label: industry.code
})

export const toIndustry = (option: TOption): TIndustry => ({
  id: option.id!,
  code: option.label
})
