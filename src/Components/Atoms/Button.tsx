import { CircularProgress } from '@mui/material'
import clsx from 'clsx'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

interface IProps extends ButtonProps {
  text: string
  variant?: 'primary' | 'secondary' | 'disabled' | 'custom'
  size?: 'small' | 'medium' | 'large'
  mode?: 'light' | 'dark'
  extraClassName?: string
  isLoading?: boolean
  sizeClassName?: string
}

// TODO: add hover styles
export const Button: React.FC<IProps> = ({
  text,
  variant = 'primary',
  size = 'large',
  mode = 'light',
  disabled,
  className,
  extraClassName,
  isLoading,
  sizeClassName,
  ...rest
}) => {
  variant = disabled ? 'disabled' : variant

  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded-full px-4 font-poppins font-semibold',
        {
          'bg-blue-ribbon text-white hover:bg-bluebonnet':
            variant === 'primary' && mode === 'light',
          'bg-white text-blue-ribbon': variant === 'primary' && mode === 'dark',
          'border border-nobel text-nobel':
            variant === 'secondary' && mode === 'light',
          'border border-white text-white':
            variant === 'secondary' && mode === 'dark',
          'bg-satin-linen text-nobel': variant === 'disabled',
          'h-12 w-64 text-sm': size === 'large' && !sizeClassName,
          'h-10 w-44 text-sm': size === 'medium' && !sizeClassName,
          'h-6 w-28 text-base': size === 'small' && !sizeClassName
        },
        variant === 'custom' && className,
        extraClassName,
        sizeClassName
      )}
      disabled={disabled || isLoading}
      {...rest}
    >
      <span className="truncate">{text}</span>
      {isLoading && (
        <CircularProgress
          className="absolute p-2"
          sx={{ color: 'blue-ribbon' }}
        />
      )}
    </button>
  )
}
