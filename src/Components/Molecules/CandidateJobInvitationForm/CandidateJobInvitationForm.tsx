import { CircularProgress } from '@mui/material'
import { TCandidateJobBrief } from 'API/Types/Candidate/candidateJob'
import { Button } from 'Components/Atoms'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface IProps {
  job: TCandidateJobBrief
  isLoading: boolean
  onAccept: () => void
  onReject: () => void
}

export const CandidateJobInvitationForm: React.FC<IProps> = ({
  job,
  isLoading,
  onAccept,
  onReject
}) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="grid">
      <div className='w-max cursor-pointer'>
        <a onClick={() => navigate(`/myprofile/jobs/${job.jobId}`)}>
          <p className="text-md font-bold">{job.position.code}</p>
          <p className="text-base">{job.company.name}</p>
        </a>
      </div>
      <div className="h-4"></div>
      <div className="flex gap-4">
        {isLoading && <CircularProgress color="inherit" />}
        {!isLoading && (
          <>
            <Button
              text={t('candidate.dashboard.jobFullfillment.button.accept')}
              onClick={onAccept}
              variant="custom"
              className="w-48 bg-white text-blue-ribbon"
            />
            <Button
              text={t('candidate.dashboard.jobFullfillment.button.reject')}
              onClick={onReject}
              variant="custom"
              className="w-48 border-2 border-white bg-blue-ribbon text-white"
            />
          </>)}
      </div>
    </div>
  )
}
