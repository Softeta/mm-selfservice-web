import { ReactComponent as Settings } from 'Assets/Icons/settings.svg'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

interface IProps {
  settingsPath: string
}

export const SettingsOnlyBottomMenu: React.FC<IProps> = ({ settingsPath }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const isInSettings = location.pathname.includes(settingsPath)

  return (
    <>
      <div className="h-settings-only-menu"></div>
      <div className="fixed inset-x-0 bottom-0 grid place-items-center bg-ship-gray">
        <div className="w-full px-6 lg:w-content-container">
          <div className="grid h-settings-only-menu justify-items-end text-white">
            <div
              className={clsx(
                'grid w-min place-items-center',
                !isInSettings && 'cursor-pointer'
              )}
              onClick={() => navigate(settingsPath)}
            >
              <Settings
                className={clsx(
                  '-mb-5 h-10 w-10',
                  isInSettings && 'text-white',
                  !isInSettings && 'text-scorpion'
                )}
              />
              <span
                className={clsx(
                  'text-base',
                  isInSettings && 'text-white',
                  !isInSettings && 'text-scorpion'
                )}
              >
                {t('nav.settings')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
