import { Button } from 'Components/Atoms'
import { useJob } from 'API/Calls/jobs'
import { useNavigate, useParams } from 'react-router-dom'
import CenteredLoader from 'Components/Molecules/CenteredLoader'
import { TJob } from 'API/Types/Jobs/jobs'
import { JobDetailedView } from 'Components/Organisms/JobDetailedView'
import JobStages from 'API/Types/Enums/jobStages'
import { useTranslation } from 'react-i18next'
import { routes } from 'Routes/routes'
import { CompanyPageContainer } from 'Components/Atoms/CompanyPageContainer'

export const Job = () => {
  const params = useParams()
  const { jobId } = params
  const navigate = useNavigate()
  const { t } = useTranslation()

  const job = useJob(jobId!)

  if (job.isLoading) return <CenteredLoader />

  return (
    <CompanyPageContainer>
      <div className="flex w-full flex-col items-center py-10 px-6">
        <div className="mr-auto pb-5">
          {job.data?.data.stage === JobStages.ShortListed && (
            <Button
              onClick={() =>
                navigate(`${routes.company.shortlist.base}/${jobId}`)
              }
              text={t('company.shortlist.openShortlist')}
            />
          )}
        </div>

        <JobDetailedView job={job.data?.data || ({} as TJob)} />
      </div>
    </CompanyPageContainer>
  )
}
