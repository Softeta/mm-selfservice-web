import CandidateStatus from 'API/Types/Enums/candidateStatus'
import { ReactComponent as Jobs } from 'Assets/Icons/jobs.svg'
import { ReactComponent as Profile } from 'Assets/Icons/profile.svg'
import { ReactComponent as Settings } from 'Assets/Icons/settings.svg'
import { BottomMenu } from 'Components/Molecules/BottomMenu'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { InvisibleBottomMenuRoutes } from 'Routes/Candidate/invisibleBottomMenuRoutes'
import { routes } from 'Routes/Candidate/routes'
import { RootState } from 'Store/Slices/rootReducer'

export const CandidateBottomMenu: React.FC = () => {
  const { t } = useTranslation()
  const status = useSelector<RootState, CandidateStatus | undefined>(
    (state) => state.candidateProfile.candidate?.status
  )

  const settingsMenuItem = {
    iconNormal: <Settings className="-mb-5 h-10 w-10 text-scorpion" />,
    iconActive: <Settings className="-mb-5 h-10 w-10 text-white" />,
    title: t('candidate.header.nav.settings'),
    path: routes.settings
  }

  const profileMenuItems = [
    {
      iconNormal: <Jobs className="-mb-5 h-10 w-10 text-scorpion" />,
      iconActive: <Jobs className="-mb-5 h-10 w-10 text-white" />,
      title: t('candidate.header.nav.jobs'),
      path: '/myprofile/jobs'
    },
    {
      iconNormal: <Profile className="-mb-5 h-10 w-10 text-scorpion" />,
      iconActive: <Profile className="-mb-5 h-10 w-10 text-white" />,
      title: t('candidate.header.nav.profile'),
      path: '/myprofile/profile'
    }
  ]

  const menuItems =
    status === CandidateStatus.Approved || status === CandidateStatus.Pending
      ? [...profileMenuItems, settingsMenuItem]
      : [settingsMenuItem]

  return (
    <div className="block sm:hidden">
      <BottomMenu
        items={menuItems}
        invisibilityRoutes={InvisibleBottomMenuRoutes}
      />
    </div>
  )
}
