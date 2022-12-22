import { useState } from 'react'
import clsx from 'clsx'
import { ReactComponent as InfoIcon } from 'Assets/Icons/info.svg'
import { ReactComponent as ErrorIcon } from 'Assets/Icons/error.svg'
import { ReactComponent as CloseIcon } from 'Assets/Icons/close.svg'

type TNotification = {
  children: React.ReactNode
  type: 'info' | 'error' | 'warning'
  className?: string
  disabled?: boolean
}

export const Notification = ({
  children,
  type,
  className,
  disabled
}: TNotification) => {
  const [isVisible, setIsVisible] = useState(true)
  if (!isVisible) return null
  return (
    <div
      className={clsx(
        'flex min-h-[50px] items-center gap-3 rounded-md py-3 px-5',
        type === 'info' && 'bg-zircon text-dodger-blue',
        type === 'error' && ' bg-pippin text-red',
        type === 'warning' && 'justify-between bg-egg-white',
        className
      )}
    >
      {type === 'info' && (
        <div className="w-6">
          <InfoIcon />
        </div>
      )}
      {type === 'error' && (
        <div className="w-6">
          <ErrorIcon />
        </div>
      )}
      <div>{children}</div>
      {type === 'warning' && !disabled && (
        <div onClick={() => setIsVisible(false)} className="w-6">
          <CloseIcon className="text-mine-shaft" />
        </div>
      )}
    </div>
  )
}

export default Notification
