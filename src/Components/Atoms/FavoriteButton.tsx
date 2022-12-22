import clsx from 'clsx'
import { CircleButton } from './CircleButton'
import { ReactComponent as HeartIcon } from 'Assets/Icons/heart.svg'
import { ReactComponent as StarIcon } from 'Assets/Icons/star.svg'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

interface IProps extends ButtonProps {
  isFavorite: boolean
  iconType?: 'heart' | 'star'
  size?: 'small' | 'medium'
}

export const FavoriteButton: React.FC<IProps> = ({
  isFavorite,
  iconType = 'heart',
  size = 'medium',
  className,
  ...rest
}) => {
  const Icon = iconType === 'heart' ? HeartIcon : StarIcon

  return (
    <CircleButton
      Icon={Icon}
      iconType="custom"
      variant="custom"
      className={clsx(
        {
          'text-orange bg-orange': isFavorite,
          'text-nobel border border-nobel': !isFavorite
        },
        className
      )}
      size={size}
      // TODO: add file with color constants
      iconProps={{
        fill: '#FFFFFF'
      }}
      {...rest}
    />
  )
}
