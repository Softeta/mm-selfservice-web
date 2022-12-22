import JobStages from 'API/Types/Enums/jobStages'
import { ScrollableJobsGrid } from 'Components/Organisms/ScrollableJobsGrid'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { RootState } from 'Store/Slices/rootReducer'
import { pageSize } from 'Variables/environmentVariables'

const activeStatuses = [
  JobStages.Calibration,
  JobStages.CandidateSelection,
  JobStages.ShortListed
]

const activeJobsQueryString = `jobStages=${activeStatuses.join(
  '&jobStages='
)}&pageSize=${pageSize}`

export const ActiveJobs = () => {
  const companyId = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.companyId!
  )
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <ScrollableJobsGrid
      title={t('company.jobs.active')}
      queryString={`${activeJobsQueryString}&Companies=${companyId}`}
      onOpenClick={(jobId: string) =>
        navigate(`${routes.company.jobs.base}/${jobId}`)
      }
    />
  )
}
