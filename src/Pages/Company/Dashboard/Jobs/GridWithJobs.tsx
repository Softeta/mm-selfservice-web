import { useJobs } from 'API/Calls/jobs'
import { JobsGrid } from '../../../../Components/Molecules/JobsGrid/JobsGrid'

interface IProps {
  className?: string
  title: string
  queryString: string
  onSeeAllClick: () => void
  onCreateClick?: () => void
  onOpenClick: (jobId: string) => void
}

export const GridWithJobs = ({
  className,
  title,
  queryString,
  onSeeAllClick,
  onCreateClick,
  onOpenClick
}: IProps) => {
  const { isLoading, isError, data } = useJobs(queryString)

  return (
    <JobsGrid
      className={className}
      title={title}
      jobs={data?.data?.data || []}
      isLoading={isLoading}
      isError={isError}
      onSeeAllClick={onSeeAllClick}
      onCreateClick={onCreateClick}
      onOpenClick={onOpenClick}
    />
  )
}
