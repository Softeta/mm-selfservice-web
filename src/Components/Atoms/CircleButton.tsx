import { ReactComponent as ShareIcon } from 'Assets/Icons/share.svg'
import { ReactComponent as ChatIcon } from 'Assets/Icons/chat.svg'
import { ReactComponent as BackIcon } from 'Assets/Icons/back.svg'
import { ReactComponent as CloseIcon } from 'Assets/Icons/close.svg'
import { ReactComponent as AddIcon } from 'Assets/Icons/add.svg'
import { ReactComponent as AddActiveIcon } from 'Assets/Icons/add-active.svg'
import clsx from 'clsx'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

interface IProps extends ButtonProps {
  size?: 'large' | 'medium' | 'small'
  iconType?: 'share' | 'back' | 'add' | 'close' | 'chat' | 'custom'
  variant?: 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'custom'
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  iconProps?: React.SVGProps<SVGSVGElement>
  extraClassName?: string
  isActive?: boolean
}

export const CircleButton: React.FC<IProps> = ({
  size = 'medium',
  variant = 'primary',
  iconType = 'custom',
  className,
  extraClassName,
  Icon: IconProp,
  disabled,
  iconProps,
  isActive,
  ...rest
}) => {
  variant = disabled ? 'disabled' : variant
  let Icon = null

  if (iconType === 'share') {
    Icon = ShareIcon
  } else if (iconType === 'back') {
    Icon = BackIcon
  } else if (iconType === 'add') {
    Icon = isActive === true ? AddActiveIcon : AddIcon
  } else if (iconType === 'close') {
    Icon = CloseIcon
  } else if (iconType === 'chat') {
    Icon = ChatIcon
  } else if (iconType === 'custom') {
    Icon = IconProp
  }

  return (
    <button
      disabled={disabled}
      className={clsx(
        'flex items-center justify-center rounded-full',
        {
          'bg-blue-ribbon text-white': variant === 'primary',
          'border border-nobel text-nobel': variant === 'secondary',
          'text-nobel': variant === 'tertiary',
          'bg-pastel-grey text-white': variant === 'disabled',
          'h-12 w-12': size === 'large',
          'h-10 w-10': size === 'medium',
          'h-8 w-8': size === 'small'
        },
        variant === 'custom' && className,
        extraClassName
      )}
      {...rest}
    >
      {Icon && <Icon className="w-1/2" {...iconProps} />}
    </button>
  )
}
