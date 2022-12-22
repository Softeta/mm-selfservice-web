import { CircularProgress } from '@mui/material'
import {
  useCandidateSelectedInJob,
  useCandidateSelectedInJobs
} from 'API/Calls/candidateJobs'
import { InfoContainer } from 'Components/Atoms/Info/InfoContainer'
import { useTranslation } from 'react-i18next'
import ReactPlayer from 'react-player'
import { useParams } from 'react-router-dom'

export const Motivation = () => {
  const params = useParams()
  const { jobId, candidateId } = params
  const { data: candidateInJobResponse, isLoading } = useCandidateSelectedInJob(
    jobId!,
    candidateId!
  )
  const candidateInJob = candidateInJobResponse?.data
  const { t } = useTranslation()

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <InfoContainer label={t('candidate.profile.motivation')}>
          {candidateInJob?.motivationVideo?.uri && (
            <div className="h-[21rem] w-full p-8">
              <ReactPlayer
                url={candidateInJob?.motivationVideo?.uri}
                width="100%"
                height="100%"
                controls={true}
              />
            </div>
          )}
          <div className="h-8"></div>
          {candidateInJob?.coverLetter && (
            <p className="whitespace-pre-wrap">{candidateInJob?.coverLetter}</p>
          )}
        </InfoContainer>
      )}
    </>
  )
}
