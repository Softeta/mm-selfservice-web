import { TJobBrief } from 'API/Types/Jobs/Common/jobBrief'
import CenteredLoader from 'Components/Molecules/CenteredLoader'
import { useTranslation } from 'react-i18next'
import { JobAddCard } from '../JobAddCard'
import { JobCard } from '../JobCard'

interface IProps {
  className?: string
  title: string
  onSeeAllClick?: () => void
  onCreateClick?: () => void
  onOpenClick: (jobId: string) => void
  jobs?: TJobBrief[]
  isLoading?: boolean
  isError?: boolean
}

export const JobsGrid = ({
  className,
  title,
  onSeeAllClick,
  onCreateClick,
  onOpenClick,
  jobs,
  isLoading,
  isError
}: IProps) => {
  const { t } = useTranslation()

  if (isLoading) return <CenteredLoader />
  if (isError) return <p>Error</p>

  return (
    <div className={className}>
      <div className="mb-6 grid grid-cols-2">
        <span className="text-lg font-bold">{title}</span>
        {onSeeAllClick && (
          <span
            onClick={onSeeAllClick}
            className="ml-auto cursor-pointer text-md font-semibold text-blue-600"
          >
            {t('jobsGrid.seeAll')}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <>
          {onCreateClick && <JobAddCard onButtonClick={onCreateClick} />}
          {jobs?.map((job) => (
            <JobCard
              key={job.jobId}
              job={job}
              buttonLabel={t('jobsGrid.job.open')}
              onButtonClick={() => onOpenClick(job.jobId)}
              title={job.position}
            />
          ))}
        </>
      </div>
    </div>
  )
}
