import { TLanguage } from 'API/Types/languages'
import { Tag } from 'API/Types/tags'

export const toTags = (languages: TLanguage[]): Tag[] => languages.map(toTag)

export const toTag = (language: TLanguage): Tag => ({
  id: language.id,
  code: language.code,
  label: language.name
})

export const toLanguages = (tags: Tag[]): TLanguage[] => tags.map(toLanguage)

export const toLanguage = (option: Tag): TLanguage => ({
  id: option.id!,
  code: option.code!,
  name: option.label!
})
