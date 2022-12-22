import {
  BottomMenuItem,
  BottomMenuItemProps
} from 'Components/Atoms/BottomMenuItem/BottomMenuItem'
import { useLocation } from 'react-router-dom'

interface IProps {
  items: BottomMenuItemProps[]
  invisibilityRoutes?: string[]
}

export const BottomMenu: React.FC<IProps> = ({
  items,
  invisibilityRoutes = []
}) => {
  const location = useLocation()

  return (
    <>
      {invisibilityRoutes.filter((x) => location.pathname.includes(x))
        .length === 0 && (
        <>
          <div className="h-settings-only-menu"></div>
          <div className="fixed inset-x-0 bottom-0 grid place-items-center bg-ship-gray">
            <div
              className={`flex w-full px-10 text-white ${
                items.length > 1 ? 'justify-between' : 'justify-end'
              }`}
            >
              {items.map((item, index) => (
                <BottomMenuItem
                  key={index}
                  iconNormal={item.iconNormal}
                  iconActive={item.iconActive}
                  title={item.title}
                  path={item.path}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  )
}
