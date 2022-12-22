import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'Store/Slices/rootReducer'
import { useSelector } from 'react-redux'
import { TCandidate } from 'API/Types/Candidate/candidateGet'
import { pageSize } from 'Variables/environmentVariables'
import { getRecommendedJobsRequest } from './Utils/getRecommendedJobsRequest'
import { ScrollableRecommendedJobsList } from 'Components/Organisms/ScrollableSuggestedJobsList'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const RecommendedJobs = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const queryString = `pageNumber=1&pageSize=${pageSize}`

  const candidate = useSelector<RootState, TCandidate>(
    (state) => state.candidateProfile.candidate!
  )

  const recommendedJobsRequest = getRecommendedJobsRequest(candidate)

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        <ScrollableRecommendedJobsList
          queryString={queryString}
          recommendedJobsRequest={recommendedJobsRequest}
          title={t('candidate.jobs.recommended')}
          onNavigateBack={() => navigate('/myprofile/jobs')}
          candidateId={candidate.id}
        />
      </div>
    </ProfilePageContainer>
  )
}
