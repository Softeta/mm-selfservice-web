import { TFileResponse } from '../fileResponse'
import { TPagedResponse } from '../pagedResponse'
import { TPosition } from '../position'

export type TShortlistResponse = {
  data: TPagedResponse<TShortlistCandidate>
}

export type TShortlistCandidate = {
  id: string
  candidateId: string
  firstName: string
  lastName: string
  ranking: number
  position?: TPosition
  picture?: TFileResponse
  brief?: string
}
