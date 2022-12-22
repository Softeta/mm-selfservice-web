import clsx from 'clsx'
import { Chip } from 'Components/Atoms/Chip'
import { LabelTag } from 'Components/Atoms/LabelTag'
import { useTranslation } from 'react-i18next'

type TBriefCard = {
  chip?: string
  chipVariant?: 'gray' | 'green' | 'black'
  hasIcon?: boolean
  isFavorite?: boolean
  onCardClick?: () => void
  subtitle?: string
  title: string
  variant?: 'active' | 'expired' | 'empty'
  isNew?: boolean
}

export const BriefCard = ({
  chip,
  chipVariant,
  onCardClick,
  subtitle,
  title,
  variant = 'active',
  isNew = false
}: TBriefCard) => {
  const { t } = useTranslation()

  return (
    <div
      className={clsx(
        'relative my-1 flex items-center rounded-md p-4',
        variant === 'active' && 'bg-white',
        variant === 'expired' && 'bg-pearl-bush text-pastel-grey ',
        variant === 'empty' && 'bg-spring-wood'
      )}
      onClick={onCardClick}
    >
      {isNew && <LabelTag text={t('briefCard.labelTag.new')} />}
      <div className="flex gap-3">
        <div>
          <p className="text-xs font-bold">{title}</p>
          {subtitle && <p className="text-xs">{subtitle}</p>}
          {chip && <Chip text={chip} variant={chipVariant}></Chip>}
        </div>
      </div>
    </div>
  )
}
