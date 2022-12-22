import { CircularProgress } from '@mui/material'
import {
  updateCandidateJobMotivation,
  useCandidateSelectedInJob
} from 'API/Calls/candidateJobs'
import { TextArea } from 'Components/Atoms'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { Notification } from 'Components/Molecules/Notification'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'

export const JobCoverLetterPage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const params = useParams()
  const queryClient = useQueryClient()
  const { jobId, candidateId } = params
  const { data: candidateInJobResponse, isLoading: isCandidateJobsLoading } =
    useCandidateSelectedInJob(jobId!, candidateId!)

  const candidateInJob = candidateInJobResponse?.data

  const defaultValues = {
    coverLetter: candidateInJob?.coverLetter
  }
  const [isLoading, setIsLoading] = useState(false)

  const {
    watch,
    register,
    handleSubmit,
    reset,
    formState: { isDirty, isSubmitSuccessful }
  } = useForm({
    mode: 'onChange',
    defaultValues
  })

  const coverLetter = watch('coverLetter')

  const onFormSubmit = async () => {
    setIsLoading(true)

    try {
      await updateCandidateJobMotivation(
        candidateInJob!.candidateId,
        candidateInJob!.jobId,
        {
          coverLetter: coverLetter
        },
        queryClient
      )
      reset({ coverLetter: coverLetter })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    reset(candidateInJob)
  }, [candidateInJob, reset])

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16 ">
        {isCandidateJobsLoading && <CircularProgress />}
        {!isCandidateJobsLoading && (
          <div className="w-full pt-16">
            <h1 className="mb-20 text-center text-lg">
              {t('candidate.jobs.motivation.header')}
            </h1>
            <TextArea
              {...register('coverLetter')}
              placeholder={t('candidate.jobs.motivation.letter')}
              sizeClassName="h-[30rem]"
            />
            {isLoading && <CircularProgress />}
            {!isLoading && isSubmitSuccessful && !isDirty && (
              <Notification className="mt-4" type="info">
                {t('candidate.jobs.motivation.saved')}
              </Notification>
            )}
            <PrevNextMenu
              onBackBtnClick={() => navigate('/myprofile')}
              onSubmitBtnClick={handleSubmit(onFormSubmit)}
              continueButtonLabel={t('candidate.settings.save')}
              isSubmitBtnDisabled={isLoading}
              isBackBtnDisabled={isLoading}
            />
          </div>
        )}
      </div>
    </ProfilePageContainer>
  )
}
