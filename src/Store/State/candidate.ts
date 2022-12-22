import { RootState } from 'Store/Slices/rootReducer'

export const getCandidateId = (state: RootState) =>
  state.candidateProfile.candidate?.id

export const getState = (state: RootState) => state.candidateProfile
