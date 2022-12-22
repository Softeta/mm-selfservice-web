import { createContext } from 'react'

export type TClassificators = {
  languages: TLanguage[]
}

export type TLanguage = {
  value: string
  label: string
}

const initClassificators: TClassificators = {
  languages: []
}

const ClassificatorsContext = createContext({} as TClassificators)

export { ClassificatorsContext, initClassificators }
