import { TPagedResponse } from '../pagedResponse'
import { TJobBrief } from './Common/jobBrief'

export type TJobsRecommendedResponse = {
  data: TPagedResponse<TJobRecommended>
}

export type TJobRecommended =  TJobBrief & {
  score: Number;
}