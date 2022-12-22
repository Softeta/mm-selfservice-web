import { CircularProgress } from '@mui/material'
import { ReactComponent as CheckIcon } from 'Assets/Icons/check-filled.svg'
import clsx from 'clsx'

export type TRequirement = {
  label: string
  fullfilled: boolean
  onClick?: () => void
  isLoading?: boolean
}

export const RequirementFullfillment: React.FC<TRequirement> = ({
  label,
  fullfilled,
  onClick,
  isLoading
}) => {
  return (
    <div
      className={clsx('flex justify-between', onClick && 'cursor-pointer')}
      onClick={onClick}
    >
      <p className="font-semibold">{label}</p>
      {isLoading && <CircularProgress size="1.25rem" color="inherit" />}
      {!isLoading && !fullfilled && (
        <div className="h-5 w-5 rounded-full border-2 border-white"></div>
      )}
      {!isLoading && fullfilled && <CheckIcon className="h-5 w-5" />}
    </div>
  )
}
