import { useShortlist } from 'API/Calls/selectedCandidates'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useJob } from 'API/Calls/jobs'
import { CandidatesShortList } from 'Components/Organisms/CandidatesShortList'
import { PresentationHeader } from 'Components/Molecules/PresentationHeader'
import { TShortlistCandidate } from 'API/Types/Jobs/shortlistGet'
import { useDispatch } from 'react-redux'
import { selectShortlistCandidate } from 'Store/Slices/Shortlist/shortlistReducer'
import { routes } from 'Routes/routes'

const queryString = 'pageSize=20'

export const Shortlist = () => {
  const location = useLocation()
  const isBackOfficeVisitor = location.pathname.startsWith('/back-office')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const { jobId } = params

  const shortlist = useShortlist(jobId!, queryString)
  const { data: job } = useJob(jobId!)

  const candidates = shortlist.data?.data.data || []

  const selectCandidate = (candidate: TShortlistCandidate) => {
    dispatch(selectShortlistCandidate(candidate))
    navigate(
      `/${
        isBackOfficeVisitor ? 'back-office' : 'findtalent'
      }/presentation/shortlist/${jobId}/candidate/${
        candidate.candidateId
      }/profile`
    )
  }

  return (
    <>
      <PresentationHeader
        position={job?.data.position.code}
        company={job?.data.company.name}
        onBackClicked={() => navigate(`${routes.company.jobs}/${jobId}`)}
      />
      <CandidatesShortList
        candidates={candidates}
        onCandidateClick={selectCandidate}
      />
    </>
  )
}
