import { RootState } from 'Store/Slices/rootReducer'

export const getJobId = (state: RootState) => state.createJob.job?.id

export const getState = (state: RootState) => state.createJob
