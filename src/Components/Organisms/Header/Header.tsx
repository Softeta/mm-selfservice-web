import clsx from 'clsx'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMsal } from '@azure/msal-react'

export interface IMenuItem {
  title: string
  route: string
}

interface IProps {
  menuItems: IMenuItem[]
  showMenu: boolean
  invisibilityRoutes: string[]
  logoutRoute: string
  email: string
  children?: React.ReactNode
  userVisible?: boolean
  checkIfActiveRoute?: (menuItem: IMenuItem) => boolean
}

export const Header = ({
  menuItems,
  showMenu,
  invisibilityRoutes,
  logoutRoute,
  email,
  children,
  userVisible = true,
  checkIfActiveRoute
}: IProps) => {
  const { t } = useTranslation()
  const { instance } = useMsal()
  const navigate = useNavigate()

  const handleLogout = () => {
    instance.logoutRedirect()
    navigate(logoutRoute)
  }

  return (
    <>
      <div className="top-0 left-0">
        <div className="fixed z-50 hidden h-header w-full bg-ship-gray text-white sm:block">
          <div className="m-auto flex h-full max-w-[var(--max-desktop-width)] items-center px-5 lg:px-0">
            <p className="text-[12px] uppercase tracking-widest md:text-[17px]">
              {t('header.talent')}
              <strong>{t('header.capacity')}</strong>
            </p>
            <div className="m-auto flex h-full gap-10 font-bold text-dusty-gray">
              {!showMenu ||
                (invisibilityRoutes.filter((x) => location.pathname.includes(x))
                  .length === 0 && (
                  <>
                    {menuItems.map((item) => (
                      <NavLink
                        key={item.route}
                        to={item.route}
                        title={t(item.title)}
                        className={({ isActive }) =>
                          clsx(
                            'inline-flex h-full items-center border-y-4 border-transparent',
                            isActive &&
                              (!checkIfActiveRoute ||
                                checkIfActiveRoute(item)) &&
                              'border-b-white text-white'
                          )
                        }
                      >
                        {t(item.title)}
                      </NavLink>
                    ))}
                  </>
                ))}
            </div>
            {userVisible && (
              <div className="text-right">
                <div className="grid">
                  <div>{email}</div>
                  <div>
                    <a
                      className="cursor-pointer text-base text-white"
                      onClick={handleLogout}
                    >
                      {t('header.logout')}
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sm:h-header"></div>
        {children}
      </div>
    </>
  )
}
