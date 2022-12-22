import { ReactComponent as AddIcon } from 'Assets/Icons/add.svg'
import { ReactComponent as CloseIcon } from 'Assets/Icons/close.svg'
import clsx from 'clsx'

interface IProps {
  type?: 'selected' | 'not-selected'
  label: string
  className?: string
  onClick?: () => void
}

export const Tag: React.FC<IProps> = ({
  className,
  label,
  onClick,
  type = 'not-selected'
}) => {
  const Icon = type === 'not-selected' ? AddIcon : CloseIcon

  return (
    <button
      className={clsx(
        'flex h-9 w-fit items-center rounded-md px-4 font-semibold',
        type === 'not-selected' &&
          'border border-spanish-gray text-spanish-gray',
        type === 'selected' &&
          'border border-blue-ribbon bg-blue-ribbon text-white',
        className
      )}
      onClick={(e) => {
        e.preventDefault()
        if (onClick) {
          onClick()
        }
      }}
    >
      <Icon className="mr-2 h-3 w-3" />
      {label}
    </button>
  )
}
