import { CircularProgress } from '@mui/material'
import { IProvider } from 'Contexts/IProvider'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { initJob } from 'Store/Slices/CreateJob/createJobReducer'
import { RootState } from 'Store/Slices/rootReducer'
import CreateJobContext from './CreateJobContext'

export const CreateJobProvider = ({ children }: IProvider) => {
  const dispatch = useDispatch()
  const jobDataPending = useSelector<RootState, boolean | undefined>(
    (state) => state.createJob.pending
  )

  const params = useParams()
  const { jobId } = params

  useEffect(() => {
    if (!jobId) {
      return
    }

    dispatch(initJob(jobId))
  }, [dispatch, jobId])

  return (
    <>
      {jobDataPending !== false && <CircularProgress />}
      {jobDataPending === false && (
        <CreateJobContext.Provider value={undefined}>
          {children}
        </CreateJobContext.Provider>
      )}
    </>
  )
}

export default CreateJobProvider
