import { CircularProgress } from '@mui/material'
import { useCandidate } from 'API/Calls/candidates'
import { useJob } from 'API/Calls/jobs'
import { CandidateInfoContainer } from 'Components/Organisms/CandidateInfoContainer'
import { IProvider } from 'Contexts/IProvider'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import CandidateJobContext from './CandidateJobContext'

export const CandidateJobProvider = ({ children }: IProvider) => {
  const location = useLocation()
  const navigate = useNavigate()
  const params = useParams()
  const { jobId, candidateId } = params
  const { isLoading: isJobLoading, data: jobData } = useJob(jobId)
  const { isLoading: isCandidateLoading, data: candidateData } =
    useCandidate(candidateId)
  const isBackOfficeVisitor = location.pathname.startsWith('/back-office')
  const shortListPath = `/${
    isBackOfficeVisitor ? 'back-office' : 'findtalent'
  }/presentation/shortlist/${jobId}`

  return (
    <>
      {(isJobLoading || isCandidateLoading) && <CircularProgress />}
      {!isJobLoading &&
        !isCandidateLoading &&
        jobData?.data &&
        candidateData?.data && (
          <CandidateJobContext.Provider
            value={{ candidate: candidateData.data, job: jobData.data }}
          >
            <CandidateInfoContainer
              candidate={candidateData.data}
              onBackClicked={() => navigate(shortListPath)}
            >
              {children}
            </CandidateInfoContainer>
          </CandidateJobContext.Provider>
        )}
    </>
  )
}

export default CandidateJobProvider
