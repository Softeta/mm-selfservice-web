import { useJobs } from 'API/Calls/jobs'
import { JobsList } from 'Components/Molecules/JobsList'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import {
  appliedJobsToJobCards,
  getPreviousMonthDate,
  jobsToJobCards
} from './helpers'
import { useCandidateApplieddInJobs } from 'API/Calls/candidateAppliedToJobs'
import { TCandidateProfileState } from 'Store/Slices/CandidateProfile/Types/candidateProfileState'
import { extendQueryWithExcludedJobIds } from './Utils/extendJobsQueryWithExcludedJobIds'
import JobStages from 'API/Types/Enums/jobStages'
import CenteredLoader from 'Components/Molecules/CenteredLoader'
import { getRecommendedJobsRequest } from './Utils/getRecommendedJobsRequest'
import { useRecommendedJobs } from 'API/Calls/recommendedJobs'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { CandidateSelectedJobsRequirements } from 'Components/Organisms/CandidateSelectedJobsRequirements'
import { CandidateProfileRequirements } from 'Components/Organisms/CandidateProfileRequirements'

const PageSize = 3
const previousMonthDate = getPreviousMonthDate()

const jobStages = [
  JobStages.Calibration,
  JobStages.CandidateSelection,
  JobStages.ShortListed
]

const newestJobsQueryString = `createdAt=${previousMonthDate}&jobStages=${jobStages.join(
  '&jobStages='
)}&pageNumber=1&pageSize=${PageSize}&orderBy=CreatedAtDesc`
const appliedInJobsQueryString = `pageNumber=1&pageSize=${PageSize}&orderBy=CreatedAtDesc`
const recommendedJobsQueryString = `pageNumber=1&pageSize=${PageSize}`

export const Jobs = () => {
  const { candidate, candidateAppliedToJobIds } = useSelector<
    RootState,
    TCandidateProfileState
  >((state) => state.candidateProfile)

  const { t } = useTranslation()
  const navigate = useNavigate()

  const jobsQueryString = extendQueryWithExcludedJobIds(
    newestJobsQueryString,
    candidateAppliedToJobIds!
  )
  const recommendedJobsRequest = getRecommendedJobsRequest(candidate!)
  const newestJobs = useJobs(jobsQueryString)
  const appliedInJobs = useCandidateApplieddInJobs(
    candidate!.id,
    appliedInJobsQueryString
  )
  const recommendedJobs = useRecommendedJobs(
    candidate!.id,
    recommendedJobsRequest,
    recommendedJobsQueryString
  )

  if (
    newestJobs.isLoading &&
    appliedInJobs.isLoading &&
    recommendedJobs.isLoading
  ) {
    return <CenteredLoader />
  }

  return (
    <ProfilePageContainer>
      <div className="grid w-full pb-16">
        <div className="my-6 h-fit rounded-md bg-blue-ribbon p-4 text-white">
          <CandidateSelectedJobsRequirements />
          <CandidateProfileRequirements />
        </div>
        {(newestJobs.isLoading ||
          appliedInJobs.isLoading ||
          recommendedJobs.isLoading) && <CenteredLoader />}
        <JobsList
          title={t('candidate.jobs.latest')}
          jobs={jobsToJobCards(newestJobs.data?.data.data)}
          onSeeAllClick={() => navigate('/myprofile/jobs/newest')}
          navigatePath="/myprofile/jobs/newest"
          isLoading={newestJobs.isLoading}
          showLoader={false}
        />
        <JobsList
          title={t('candidate.jobs.selectedIn')}
          jobs={appliedJobsToJobCards(appliedInJobs?.data?.data.data)}
          onSeeAllClick={() => navigate('/myprofile/jobs/applied-in')}
          isLoading={appliedInJobs.isLoading}
          navigatePath="/myprofile/jobs/applied-in"
          showLoader={false}
        />
        <JobsList
          title={t('candidate.jobs.recommended')}
          jobs={jobsToJobCards(recommendedJobs?.data?.data.data)}
          onSeeAllClick={() => navigate('/myprofile/jobs/recommended')}
          isLoading={appliedInJobs.isLoading}
          navigatePath="/myprofile/jobs/recommended"
          showLoader={false}
        />
      </div>
    </ProfilePageContainer>
  )
}
