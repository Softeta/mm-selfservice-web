import { useTranslation } from 'react-i18next'
import { BriefCard } from '../BriefCard'
import { getPreviousWeekTimestamp, isNew } from './helpers'
import CenteredLoader from '../CenteredLoader'
import { JobsListHeader } from 'Components/Atoms/JobsListHeader'
import SelectedCandidateStages from 'API/Types/Enums/selectedCandidateStages'
import { useNavigate } from 'react-router-dom'

export type TJobCard = {
  id: string
  position: string
  company: string
  createdAt?: Date
  stage?: SelectedCandidateStages
  archived?: boolean
}

interface IProps {
  title: string
  jobs?: TJobCard[]
  isLoading?: boolean
  navigatePath?: string
  showLoader?: boolean
  onNavigateBack?: () => void
  onSeeAllClick?: () => void
  onSearchInput?: () => void
}

const previousWeekTimestamp = getPreviousWeekTimestamp()

export const JobsList = ({
  title,
  jobs,
  isLoading,
  navigatePath,
  showLoader = true,
  onNavigateBack,
  onSeeAllClick,
  onSearchInput,
  ...rest
}: IProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  if (isLoading && showLoader) return <CenteredLoader />

  return (
    <div className="pt-7">
      <JobsListHeader
        title={title}
        onSeeAllClick={onSeeAllClick}
        onNavigateBack={onNavigateBack}
        onSearchInput={onSearchInput}
      />
      <ul className="clear-right grid grid-cols-1 pt-5" {...rest}>
        {jobs?.map((job) => (
          <BriefCard
            key={job.id}
            title={job.position}
            subtitle={job.company}
            isNew={isNew(previousWeekTimestamp, job.createdAt)}
            variant={job.archived ? 'expired' : 'active'}
            chip={job.stage && t(`briefCard.chip.${job.stage?.toLowerCase()}`)}
            onCardClick={() =>
              navigate(navigatePath ? `${navigatePath}/${job.id}` : job.id)
            }
          />
        ))}
      </ul>
    </div>
  )
}
