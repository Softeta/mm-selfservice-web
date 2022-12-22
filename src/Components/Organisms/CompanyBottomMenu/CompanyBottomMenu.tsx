import ContactPersonStage from 'API/Types/Enums/contactPersonStage'
import { ReactComponent as Dashboard } from 'Assets/Icons/dashboard.svg'
import { ReactComponent as Profile } from 'Assets/Icons/profile.svg'
import { ReactComponent as Settings } from 'Assets/Icons/settings.svg'
import { BottomMenu } from 'Components/Molecules/BottomMenu'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { InvisibleHeaderRoutes } from 'Routes/Company/invisibleHeaderRoutes'
import { routes } from 'Routes/routes'
import { RootState } from 'Store/Slices/rootReducer'
import { RegularExpressions } from 'Variables/regularExpressions'

export const CompanyBottomMenu: React.FC = () => {
  const { t } = useTranslation()
  const stage = useSelector<RootState, ContactPersonStage | undefined>(
    (state) => state.contactPerson.contactPerson?.stage
  )
  const location = useLocation()
  const isRegistration = location.pathname.includes('/registration/')
  const isBackOfficeVisitor = location.pathname.startsWith('/back-office')
  const isCandidateShortlistLocation =
    RegularExpressions.isShortListCandidatePath.test(location.pathname)

  const settingsMenuItem = {
    iconNormal: <Settings className="-mb-5 h-10 w-10 text-scorpion" />,
    iconActive: <Settings className="-mb-5 h-10 w-10 text-white" />,
    title: t('candidate.header.nav.settings'),
    path: routes.company.settings
  }

  const profileMenuItems = [
    {
      iconNormal: <Dashboard className="-mb-5 h-10 w-10 text-scorpion" />,
      iconActive: <Dashboard className="-mb-5 h-10 w-10 text-white" />,
      title: t('candidate.header.nav.dashboard'),
      path: routes.company.root
    },
    {
      iconNormal: <Profile className="-mb-5 h-10 w-10 text-scorpion" />,
      iconActive: <Profile className="-mb-5 h-10 w-10 text-white" />,
      title: t('candidate.header.nav.profile'),
      path: routes.company.profile
    },
    {
      iconNormal: <Profile className="-mb-5 h-10 w-10 text-scorpion" />,
      iconActive: <Profile className="-mb-5 h-10 w-10 text-white" />,
      title: t('company.header.nav.contacts'),
      path: routes.company.contacts.base
    }
  ]

  const menuItems =
    !isRegistration &&
    !isCandidateShortlistLocation &&
    stage !== ContactPersonStage.Registered &&
    stage !== ContactPersonStage.Rejected
      ? [...profileMenuItems, settingsMenuItem]
      : [settingsMenuItem]

  return !isBackOfficeVisitor ? (
    <div className="block sm:hidden">
      <BottomMenu
        items={menuItems}
        invisibilityRoutes={InvisibleHeaderRoutes}
      />
    </div>
  ) : null
}
