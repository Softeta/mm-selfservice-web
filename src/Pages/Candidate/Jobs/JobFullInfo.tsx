import { JobQueryKeys, useJob } from 'API/Calls/jobs'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as BackIcon } from 'Assets/Icons/back.svg'
import { Separator } from 'Components/Atoms/Separator'
import { HeaderBox } from 'Components/Atoms/HeaderBox'
import CenteredLoader from 'Components/Molecules/CenteredLoader'
import { TJob } from 'API/Types/Jobs/jobs'
import { useTranslation } from 'react-i18next'
import { MapsList } from 'Components/Molecules/MapsList'
import { TagsList } from 'Components/Organisms/TagsList'
import { Timeline } from 'Components/Atoms/Timeline'
import SeniorityLevels from 'API/Types/Enums/seniorityLevels'
import { Button } from 'Components/Atoms'
import {
  CandidateJobQueryKeys,
  rejectCandidateJob
} from 'API/Calls/candidateJobs'
import { RootState } from 'Store/Slices/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { ModalAppliedToJobSuccessfuly } from 'Components/Molecules/ModalAppliedToJobSuccessfuly'
import { useState } from 'react'
import { applyToJob } from 'API/Calls/candidateAppliedToJobs'
import { AppliedToJob } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { useQueryClient } from 'react-query'
import { CircularProgress } from '@mui/material'
import { RecommendedJobQueryKeys } from 'API/Calls/recommendedJobs'
import CandidateStatus from 'API/Types/Enums/candidateStatus'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { format } from 'date-fns'
import DateFormats from 'API/Types/Enums/dateFormats'

export type TMap = {
  name: string
  value: string
}

export type TProps = {
  hideButtons?: boolean
}

const timelineValues = Object.keys(SeniorityLevels)

export const JobFullInfo = ({ hideButtons = false }: TProps) => {
  const candidateId = useSelector<RootState, string>(
    (state) => state.candidateProfile.candidate!.id!
  )

  const candidateStatus = useSelector<RootState, string>(
    (state) => state.candidateProfile.candidate!.status
  )

  const params = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const location = useLocation()
  const queryClient = useQueryClient()
  const dispatch = useDispatch()

  const [isApplyingLoading, setIsApplyingLoading] = useState(false)
  const [showAppliedToJobModal, setShowAppliedToJobModal] = useState(false)

  const { jobId } = params

  const job = useJob(jobId!)

  if (job.isLoading) return <CenteredLoader />

  const clearJobsQueries = () => {
    queryClient.removeQueries(CandidateJobQueryKeys.candidateJobs)
    queryClient.removeQueries(RecommendedJobQueryKeys.recommededJobs)
    queryClient.removeQueries(RecommendedJobQueryKeys.recommendedJobsPaged)
    queryClient.removeQueries(JobQueryKeys.jobs)
    queryClient.removeQueries(JobQueryKeys.jobsPaged)
  }

  const getJobDetails = (job?: TJob) => {
    const jobDetails: TMap[] = []

    const workingHours: string[] = []
    job?.workingHourTypes?.forEach((type) =>
      workingHours.push(
        t(`candidate.createProfile.workLoad.${type.toLowerCase()}`)
      )
    )

    const workFormats: string[] = []
    job?.formats?.forEach((format) =>
      workFormats.push(
        t(`candidate.createProfile.workLoad.${format.toLowerCase()}`)
      )
    )

    jobDetails.push({
      name: t('jobCard.field.status'),
      value: job?.isArchived
        ? t('jobCard.field.status.archived')
        : t('jobCard.field.status.active')
    })

    jobDetails.push({
      name: t('candidate.profile.workingHoursType'),
      value: workingHours.join(',') || ''
    })

    jobDetails.push({
      name: t('candidate.createProfile.workLoad.workFormats'),
      value: workFormats.join(',') || ''
    })

    jobDetails.push({
      name: t('candidate.profile.address'),
      value: job?.company.address.city + ', ' + job?.company.address.country
    })

    if (job?.startDate && !job.isUrgent) {
      jobDetails.push({
        name: t('candidate.profile.startDate'),
        value: format(new Date(job?.startDate), DateFormats.Date)
      })
    }

    if (job?.isUrgent) {
      jobDetails.push({
        name: t('candidate.profile.startDate'),
        value: t('company.jobDetails.asap')
      })
    }

    return jobDetails
  }

  const getJobBudgets = (job?: TJob) => {
    const budgets: TMap[] = []
    budgets.push({
      name: t('candidate.profile.minPayMonthPermanent'),
      value:
        (job?.permanent?.monthlyBudget?.from?.toString() || '') +
        ' ~ ' +
        job?.permanent?.monthlyBudget?.to?.toString() +
        ' ' +
        job?.currency
    })

    budgets.push({
      name: t('candidate.profile.minPayMonthFreelance'),
      value:
        (job?.freelance?.monthlyBudget?.from?.toString() || '') +
        ' ~ ' +
        job?.freelance?.monthlyBudget?.to?.toString() +
        ' ' +
        job?.currency
    })

    return budgets
  }

  const handleNotInterested = () => {
    rejectCandidateJob(candidateId, jobId!)
    navigate('/myprofile/jobs')
  }

  const jobDetails = getJobDetails(job.data?.data)
  const jobBudgets = getJobBudgets(job.data?.data)

  const handleApplyClick = async () => {
    setIsApplyingLoading(true)
    try {
      await applyToJob(candidateId!, jobId!, queryClient)
      setShowAppliedToJobModal(true)
      dispatch(AppliedToJob(jobId!))
      clearJobsQueries()
    } finally {
      setIsApplyingLoading(false)
    }
  }

  const handleCancelModal = () => {
    setShowAppliedToJobModal(false)
    navigate(-1)
  }

  const handleNavigateToAppliedJobs = () => {
    navigate('/myprofile/jobs/applied-in')
  }

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16 pb-24">
        <BackIcon
          className="mb-7"
          onClick={() => navigate(location.pathname.replace(jobId!, ''))}
        ></BackIcon>
        <HeaderBox
          header={job.data?.data.position.code || ''}
          secondHeader={job.data?.data.company.name}
        ></HeaderBox>

        <Separator />

        <MapsList maps={jobDetails} />

        <Separator />

        <p className="my-5 whitespace-pre-wrap text-base">
          {job.data?.data.description}
        </p>

        <Separator />

        <Timeline
          title={t('candidate.profile.experience')}
          allValues={timelineValues}
          selectedValues={job.data?.data.seniorities}
        />

        <Separator />

        <TagsList
          title={t('candidate.profile.skills')}
          tags={job.data?.data.skills.map((skill) => skill.code) || []}
        />

        <Separator />

        <MapsList maps={jobBudgets} />

        <Separator />

        <TagsList
          title={t('candidate.profile.languages')}
          tags={job.data?.data.languages.map((language) => language.name) || []}
        />

        <Separator />

        <TagsList
          title={t('candidate.profile.industries')}
          tags={
            job.data?.data.industries.map((industry) => industry.code) || []
          }
        />
        {!hideButtons && candidateStatus !== CandidateStatus.Pending && (
          <div className="fixed bottom-0 left-0 z-50 flex h-24 w-screen items-center justify-center gap-10 rounded-t-3xl bg-white px-10">
            {isApplyingLoading && <CircularProgress color="inherit" />}
            {!isApplyingLoading && (
              <>
                <Button
                  text={t('button.notInterested')}
                  variant="secondary"
                  onClick={handleNotInterested}
                />
                <Button text={t('button.apply')} onClick={handleApplyClick} />
              </>
            )}
          </div>
        )}
        <ModalAppliedToJobSuccessfuly
          visible={showAppliedToJobModal}
          onClick={handleNavigateToAppliedJobs}
          onCancel={handleCancelModal}
        />
      </div>
    </ProfilePageContainer>
  )
}
