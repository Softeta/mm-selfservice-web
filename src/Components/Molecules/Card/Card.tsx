import clsx from 'clsx'
import { Button } from 'Components/Atoms/Button'
import { FavoriteButton } from 'Components/Atoms/FavoriteButton'
import { ReactComponent as CloseIcon } from 'Assets/Icons/close.svg'

type TCard = {
  buttonLabel: string
  chip?: string
  chipVariant?: 'gray' | 'green' | 'black'
  hasCloseIcon?: boolean
  hasIcon?: boolean
  isFavorite?: boolean
  onButtonClick?: () => void
  onCloseIconClick?: () => void
  onIconClick?: () => void
  subtitle?: string
  title: string
  variant?: 'active' | 'expired' | 'empty'
}

export const Card = ({
  buttonLabel,
  chip,
  chipVariant = 'gray',
  hasCloseIcon,
  hasIcon,
  isFavorite = false,
  onButtonClick,
  onCloseIconClick,
  onIconClick,
  subtitle,
  title,
  variant = 'active'
}: TCard) => (
  <div
    className={clsx(
      'relative rounded-md px-6 pb-7',
      variant === 'active' && 'bg-white',
      variant === 'expired' && 'bg-pearl-bush text-pastel-grey ',
      variant === 'empty' && 'bg-spring-wood'
    )}
  >
    {hasCloseIcon && (
      <CloseIcon
        className="absolute top-4 right-4 cursor-pointer text-mine-shaft"
        onClick={onCloseIconClick}
      />
    )}
    <div className="h-[50px] pt-3">
      {chip && (
        <span
          className={clsx(
            'rounded-sm p-1 text-xs text-white',
            chipVariant === 'gray' && 'bg-nobel',
            chipVariant === 'green' && 'bg-emerald',
            chipVariant === 'black' && 'bg-black'
          )}
        >
          {chip}
        </span>
      )}
    </div>
    <p
      className={clsx(
        'mb-2 text-md font-bold',
        variant === 'empty' && 'text-center'
      )}
    >
      {title}
    </p>
    {subtitle && <p>{subtitle}</p>}
    <div className="mt-3 flex items-center gap-3">
      {hasIcon && (
        <FavoriteButton
          isFavorite={isFavorite}
          onClick={onIconClick}
          disabled={variant === 'expired'}
        />
      )}
      <Button
        text={buttonLabel}
        variant={
          (variant === 'expired' && 'disabled') ||
          (variant === 'empty' && 'secondary') ||
          'primary'
        }
        onClick={onButtonClick}
        extraClassName={clsx(
          'grow',
          variant === 'expired' && 'bg-pastel-grey',
          !hasIcon && 'w-full',
          !subtitle && 'mt-3'
        )}
      />
    </div>
  </div>
)
