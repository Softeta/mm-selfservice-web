import { TCandidate } from '../Candidate/candidateGet'
import { TJob } from './jobs'

export type TJobCandidateResponse = {
  data: TJobCandidate
}

export type TJobCandidate = {
  candidate: TCandidate
  job: TJob
}
