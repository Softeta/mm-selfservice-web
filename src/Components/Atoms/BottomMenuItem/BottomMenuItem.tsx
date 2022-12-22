import clsx from 'clsx'
import { useLocation, useNavigate } from 'react-router-dom'

export type BottomMenuItemProps = {
  iconNormal?: React.ReactNode
  iconActive?: React.ReactNode
  title: string
  path: string
}

export const BottomMenuItem: React.FC<BottomMenuItemProps> = ({
  iconNormal,
  iconActive,
  title,
  path
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const isInPath = location.pathname.endsWith(path)

  return (
    <div className="grid h-settings-only-menu justify-items-end text-white">
      <div
        className={clsx(
          'grid w-min place-items-center',
          !isInPath && 'cursor-pointer'
        )}
        onClick={() => navigate(path)}
      >
        {isInPath && iconActive}
        {!isInPath && iconNormal}
        <span
          className={clsx(
            'text-base',
            isInPath && 'text-white',
            !isInPath && 'text-scorpion'
          )}
        >
          {title}
        </span>
      </div>
    </div>
  )
}
