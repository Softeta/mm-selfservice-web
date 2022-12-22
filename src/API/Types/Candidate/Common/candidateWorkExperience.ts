import WorkExperienceType from 'API/Types/Enums/workExperienceType'
import { TPosition } from 'API/Types/position'
import { TSkill } from 'API/Types/skills'

export type TCandidateWorkExperience = {
  type: WorkExperienceType
  companyName: string
  position: TPosition
  from: string
  to?: string
  jobDescription?: string
  isCurrentJob: boolean
  skills?: TSkill[]
  id?: string
}
