import { ReactComponent as BackIcon } from 'Assets/Icons/back.svg'
import { useTranslation } from 'react-i18next'

interface IProps {
  title: string
  onNavigateBack?: () => void
  onSeeAllClick?: () => void
  onSearchInput?: () => void
}

export const JobsListHeader = ({
  title,
  onNavigateBack,
  onSeeAllClick,
  onSearchInput
}: IProps) => {
  const { t } = useTranslation()
  return (
    <div className="relative flex items-center justify-between">
      {onNavigateBack && <BackIcon onClick={onNavigateBack}></BackIcon>}
      <p className="text-lg font-bold">{title}</p>
      {onSearchInput && <div></div>} {/* TODO placeholder for searchbar */}
      {onSeeAllClick && (
        <p
          onClick={onSeeAllClick}
          className="absolute right-0 bottom-0 cursor-pointer rounded-sm text-md font-medium text-blue-ribbon"
        >
          {t('jobsListHead.showMore')}
        </p>
      )}
    </div>
  )
}
