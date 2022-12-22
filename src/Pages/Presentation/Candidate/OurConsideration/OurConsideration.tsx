import { CircularProgress } from '@mui/material'
import { useShortlistedCandidate } from 'API/Calls/selectedCandidates'
import { InfoContainer } from 'Components/Atoms/Info/InfoContainer'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

export const OurConsideration = () => {
  const params = useParams()
  const { jobId, candidateId } = params
  
  const { t } = useTranslation()
  const { data, isLoading } = useShortlistedCandidate(jobId!, candidateId!)

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && data?.data.brief && (
        <InfoContainer label={t('candidate.ourConsideration.briefHeader')}>
          {data.data.brief}
        </InfoContainer>
      )}
    </>
  )
}
