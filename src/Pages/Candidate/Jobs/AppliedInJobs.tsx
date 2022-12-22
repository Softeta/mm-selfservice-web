import { useTranslation } from 'react-i18next'
import { ScrollableCandidateJobsList } from 'Components/Organisms/ScrollableCandidateJobsList'
import { useNavigate } from 'react-router-dom'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

const appliedInJobsQueryString = 'orderBy=CreatedAtDesc'

export const AppliedInJobs = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        <ScrollableCandidateJobsList
          title={t('candidate.jobs.selectedIn')}
          queryString={appliedInJobsQueryString}
          onNavigateBack={() => navigate('/myprofile/jobs')}
        />
      </div>
    </ProfilePageContainer>
  )
}
