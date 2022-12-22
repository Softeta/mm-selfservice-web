import { TIndustry } from '../industries'
import { TLanguage } from '../languages'
import { TSkill } from '../skills'

export type TUpdateCandidateCompetenciesRequest = {
  skills?: TSkill[]
  industries?: TIndustry[]
  languages?: TLanguage[]
}
