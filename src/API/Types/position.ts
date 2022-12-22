import { TPagedResponse } from './pagedResponse'

export type TPositionResponse = {
  data: TPagedResponse<TPosition>
}

export type TPosition = {
  id?: string
  code: string
}

export type TAddPositionResponse = {
  data: TPosition
}
