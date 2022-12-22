import { TPagedResponse } from './pagedResponse'

export type TSkillsResponse = {
  data: TPagedResponse<TSkill>
}

export type TAddSkillResponse = {
  data: TSkill
}

export type TSkill = {
  id: string
  code: string
}
