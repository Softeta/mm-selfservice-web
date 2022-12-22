import { JobOrderBy } from 'API/Types/Enums/jobOrderBy'
import JobStages from 'API/Types/Enums/jobStages'
import { ScrollableJobsGrid } from 'Components/Organisms/ScrollableJobsGrid'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { RootState } from 'Store/Slices/rootReducer'
import { pageSize } from 'Variables/environmentVariables'

const pendingJobsQueryString = `jobStages=${JobStages.Pending}&pageSize=${pageSize}&orderby=${JobOrderBy.CreatedAtDesc}`

export const PendingJobs = () => {
  const companyId = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.companyId!
  )
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <ScrollableJobsGrid
      title={t('company.jobs.pending')}
      queryString={`${pendingJobsQueryString}&Companies=${companyId}`}
      onOpenClick={(jobId: string) =>
        navigate(`${routes.company.jobs.base}/${jobId}`)
      }
    />
  )
}
