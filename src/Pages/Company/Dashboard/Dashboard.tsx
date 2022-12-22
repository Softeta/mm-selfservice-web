import { JobOrderBy } from 'API/Types/Enums/jobOrderBy'
import JobStages from 'API/Types/Enums/jobStages'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { RootState } from 'Store/Slices/rootReducer'
import { GridWithJobs } from './Jobs/GridWithJobs'

const activeStatuses = [
  JobStages.Calibration,
  JobStages.CandidateSelection,
  JobStages.ShortListed
]

const activeJobsQueryString = `jobStages=${activeStatuses.join(
  '&jobStages='
)}&pageSize=5`

const pendingJobsQueryString = `jobStages=${JobStages.Pending}&pageSize=3&orderBy=${JobOrderBy.CreatedAtDesc}`

const appendCompanyIdToQueryString = (queryString: string, companyId: string) =>
  `${queryString}&Companies=${companyId}`

export const Dashboard = () => {
  const companyId = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.companyId!
  )

  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="flex h-screen flex-col overflow-scroll pl-4">
      <div className="my-10 mx-auto">
        <GridWithJobs
          title={t('company.jobs.active')}
          queryString={appendCompanyIdToQueryString(
            activeJobsQueryString,
            companyId
          )}
          onSeeAllClick={() => navigate(routes.company.jobs.active)}
          onOpenClick={(jobId: string) =>
            navigate(`${routes.company.jobs.base}/${jobId}`)
          }
          onCreateClick={() => navigate(routes.company.jobs.create.base)}
        />
        <GridWithJobs
          className="mt-10 mb-20"
          title={t('company.jobs.pending')}
          queryString={appendCompanyIdToQueryString(
            pendingJobsQueryString,
            companyId
          )}
          onSeeAllClick={() => navigate(routes.company.jobs.pending)}
          onOpenClick={(jobId: string) =>
            navigate(`${routes.company.jobs.base}/${jobId}`)
          }
        />
      </div>
    </div>
  )
}
