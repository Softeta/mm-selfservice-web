import { CircularProgress } from '@mui/material'
import { applyToJob } from 'API/Calls/candidateAppliedToJobs'
import { CandidateJobQueryKeys, rejectCandidateJob, useCandidateSelectedInJobs } from 'API/Calls/candidateJobs'
import { TCandidateJobBrief } from 'API/Types/Candidate/candidateJob'
import { CandidateJobInvitationForm } from 'Components/Molecules/CandidateJobInvitationForm'
import { ModalAppliedToJobSuccessfuly } from 'Components/Molecules/ModalAppliedToJobSuccessfuly'
import { RequirementsList } from 'Components/Molecules/RequirementsList'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useQueryClient } from 'react-query'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AppliedToJob } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { RootState } from 'Store/Slices/rootReducer'

const filterParams = 'isInvited=true'

export const CandidateSelectedJobsRequirements: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()
  queryClient.invalidateQueries(CandidateJobQueryKeys.candidateJob)
  
  const candidateId = useSelector<RootState, string | undefined>(
    (state) => state.candidateProfile.candidate?.id
  )
  const [loadingJobs, setLoadingJobs] = useState<string[]>([])
  const [showAppliedToJobModal, setShowAppliedToJobModal] = useState(false)

  const {
    data: jobs,
    isLoading,
    refetch: reloadSelectedCandidateJobs } = useCandidateSelectedInJobs(
    candidateId || '', filterParams)

  useEffect(() => {
    if (!isLoading) {
      setLoadingJobs([])
    }
  }, [isLoading])

  const acceptJobInvite = async (job: TCandidateJobBrief) => {
    setLoadingJobs([...loadingJobs, job.jobId]);
    try {
      await applyToJob(candidateId!, job.jobId, queryClient)
      setShowAppliedToJobModal(true)
      dispatch(AppliedToJob(job.jobId))
    } finally {
      setLoadingJobs([...loadingJobs.filter(x => x === job.jobId)]);
    }
  }

  const rejectJobInvite = async (job: TCandidateJobBrief) => {
    setLoadingJobs([...loadingJobs, job.jobId]);
    await rejectCandidateJob(candidateId!, job.jobId).then(() => {
      reloadSelectedCandidateJobs()
    })
  }

  const handleCancelModal = () => {
    setShowAppliedToJobModal(false);
    reloadSelectedCandidateJobs();
  }

  const handleNavigateToAppliedJobs = () => {
    queryClient.removeQueries(CandidateJobQueryKeys.candidateJobs)
    navigate('/myprofile/jobs/applied-in')
  }

  return (
    <>
      {isLoading && <CircularProgress color="inherit" />}
      {!isLoading && jobs?.data.data.length !== 0 && (
        <>
          <div className="flex items-center gap-2">
            <div className="h-[0.15rem] w-10 bg-white"></div>
            <p className="text-base font-bold tracking-widest">
              {t('candidate.dashboard.jobFullfillment.yourJob')}
            </p>
          </div>
          <div className="h-6"></div>
          {jobs?.data.data.map((job, index) => (
            <div key={index}>
              {!job.hasApplied && (
                <CandidateJobInvitationForm
                  job={job}
                  onAccept={() => acceptJobInvite(job)}
                  onReject={() => rejectJobInvite(job)}
                  isLoading={loadingJobs.includes(job.jobId)}
                />
              )}
              {job.hasApplied && (
                <RequirementsList
                  title={job.position.code}
                  subtitle={job.company.name}
                  description={t(
                    'candidate.dashboard.jobFullfillment.description'
                  )}
                  requirements={[
                    {
                      label: t('candidate.dashboard.jobFullfillment.video'),
                      fullfilled: job.hasMotivationVideo,
                      onClick: () =>
                        navigate(
                          `/myprofile/jobs/motivation/${job.jobId}/${candidateId}/video`
                        )
                    },
                    {
                      label: t(
                        'candidate.dashboard.jobFullfillment.motivation'
                      ),
                      fullfilled: !!job.coverLetter,
                      onClick: () => {
                        queryClient.removeQueries([CandidateJobQueryKeys.candidateJob, `${job.jobId}${candidateId}`])
                        navigate(
                          `/myprofile/jobs/motivation/${job.jobId}/${candidateId}/cover-letter`
                        )
                      }
                    }
                  ]}
                />
              )}
              <div className="py-6">
                <hr className="border-dashed border-list-separator" />
              </div>
            </div>
          ))}
        </>
      )}
      <ModalAppliedToJobSuccessfuly 
        visible={showAppliedToJobModal}
        onClick={handleNavigateToAppliedJobs} 
        onCancel={handleCancelModal} />
    </>
  )
}
