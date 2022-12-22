import { TPagedResponse } from '../pagedResponse'
import { TJobBrief } from './Common/jobBrief'

export type TJobsBriefResponse = {
  data: TPagedResponse<TJobBrief>
}