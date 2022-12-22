import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { ReactComponent as JobsIcon } from 'Assets/Icons/jobs.svg'
import { ReactComponent as ProfileIcon } from 'Assets/Icons/profile.svg'
import { ReactComponent as SettingsIcon } from 'Assets/Icons/settings.svg'

export const MobileMenu = () => {
  const { t } = useTranslation()
  return (
    <footer className="fixed bottom-0 h-[72px] w-full bg-ship-gray lg:hidden">
      <nav className="grid h-full grid-cols-4 stroke-scorpion text-[8px] font-bold text-dusty-gray">
        <NavLink
          to="/myprofile/jobs"
          title={t('nav.jobs')}
          className={({ isActive }) =>
            clsx(
              'border-y-4 border-transparent',
              isActive && 'border-b-white stroke-white text-white'
            )
          }
        >
          <div className="flex h-full flex-wrap items-center justify-center">
            <JobsIcon className="w-full" />
            {t('nav.jobs')}
          </div>
        </NavLink>
        <NavLink
          to="/myprofile/profile"
          title={t('nav.profile')}
          className={({ isActive }) =>
            clsx(
              'border-y-4 border-transparent',
              isActive && 'border-b-white stroke-white text-white'
            )
          }
        >
          <div className="flex h-full flex-wrap items-center justify-center">
            <ProfileIcon className="w-full" />
            {t('nav.profile')}
          </div>
        </NavLink>
        <NavLink
          to="/myprofile/settings"
          title={t('nav.settings')}
          className={({ isActive }) =>
            clsx(
              'border-y-4 border-transparent',
              isActive && 'border-b-white stroke-white text-white'
            )
          }
        >
          <div className="flex h-full flex-wrap items-center justify-around">
            <SettingsIcon className="w-full" />
            {t('nav.settings')}
          </div>
        </NavLink>
      </nav>
    </footer>
  )
}
