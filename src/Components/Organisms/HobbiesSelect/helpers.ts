import { THobby } from 'API/Types/hobbies'
import { TOption } from 'Components/Molecules/Autocomplete/Autocomplete'

export const toOptions = (positions: THobby[]): TOption[] =>
  positions.map(toOption)

export const toOption = (hobby: THobby): TOption => ({
  id: hobby.id,
  label: hobby.code
})

export const toHobby = (option: TOption): THobby => ({
  id: option.id!,
  code: option.label
})
