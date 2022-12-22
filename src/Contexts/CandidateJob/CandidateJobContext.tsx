import { TJobCandidate } from 'API/Types/Jobs/jobCandidateGet'
import React from 'react'

const CandidateJobContext = React.createContext<TJobCandidate | undefined>(
  undefined
)

export default CandidateJobContext
