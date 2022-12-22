import JobStages from 'API/Types/Enums/jobStages'
import { getPreviousMonthDate } from './helpers'
import { ScrollableJobsList } from 'Components/Organisms/ScrollableJobsList'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { extendQueryWithExcludedJobIds } from './Utils/extendJobsQueryWithExcludedJobIds'
import { RootState } from 'Store/Slices/rootReducer'
import { useSelector } from 'react-redux'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

const previousMonthDate = getPreviousMonthDate()

const jobStages = [
  JobStages.Calibration,
  JobStages.CandidateSelection,
  JobStages.ShortListed
]

const newestJobsQueryString = `createdAt=${previousMonthDate}
  &jobStages=${jobStages.join('&jobStages=')}`

export const NewestJobs = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const candidateAppliedToJobIds = useSelector<RootState, string[] | undefined>(
    (state) => state.candidateProfile.candidateAppliedToJobIds
  )

  const jobsQueryString = extendQueryWithExcludedJobIds(
    newestJobsQueryString,
    candidateAppliedToJobIds!
  )

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        <ScrollableJobsList
          queryString={jobsQueryString}
          title={t('candidate.jobs.latest')}
          onNavigateBack={() => navigate('/myprofile/jobs')}
        />
      </div>
    </ProfilePageContainer>
  )
}
