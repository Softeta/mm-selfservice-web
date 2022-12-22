import { TPagedResponse } from './pagedResponse'

export type TIndustriesResponse = {
  data: TPagedResponse<TIndustry>
}

export type TIndustry = {
  id: string
  code: string
}
