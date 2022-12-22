import { TAddress } from '../address'
import { TFileResponse } from '../fileResponse'
import { TPagedResponse } from '../pagedResponse'
import { TPosition } from '../position'
import { TCandidateFreelance } from './Common/candidateFreelance'
import { TCandidatePermanent } from './Common/candidatePermanent'

export type TCandidatesResponse = {
  data: TPagedResponse<TCandidateBrief>
}

export type TCandidateBrief = {
  id: string
  picture?: TFileResponse
  fullName?: string
  firstName?: string
  lastName?: string
  email?: string
  linkedInUrl?: string
  currentPosition?: TPosition
  address?: TAddress
  startDate?: string
  endDate?: Date
  currency?: string
  freelance?: TCandidateFreelance
  permanent?: TCandidatePermanent
  openForOpportunities: boolean
  isShortlisted: boolean
  isNewlyAdded?: boolean
}
