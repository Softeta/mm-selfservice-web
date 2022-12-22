import CandidateStatus from 'API/Types/Enums/candidateStatus'
import { Header } from 'Components/Organisms/Header'
import { IMenuItem } from 'Components/Organisms/Header/Header'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { routes } from 'Routes/Candidate/routes'
import { RootState } from 'Store/Slices/rootReducer'

const MenuProps = {
  jobs: {
    title: 'candidate.header.nav.jobs',
    route: '/myprofile'
  },
  profile: {
    title: 'candidate.header.nav.profile',
    route: '/myprofile/profile'
  },
  settings: {
    title: 'candidate.header.nav.settings',
    route: '/myprofile/settings'
  }
}

const menuItems = [
  { title: MenuProps.jobs.title, route: MenuProps.jobs.route },
  { title: MenuProps.profile.title, route: MenuProps.profile.route },
  { title: MenuProps.settings.title, route: MenuProps.settings.route }
]

const invisibilityRoutes = ['verification', 'confirmation', 'profile-creation']

export const CandidateHeader = () => {
  const location = useLocation()
  const candidateEmail = useSelector<RootState, string | undefined>(
    (state) => state.candidateProfile.candidate?.email
  )
  const status = useSelector<RootState, string | undefined>(
    (state) => state.candidateProfile.candidate?.status
  )

  const checkIfActiveNavLink = (menuItem: IMenuItem) =>
  (menuItem.title !== MenuProps.jobs.title ||
    location.pathname.replace(/\/$/, '').endsWith(MenuProps.jobs.route) ||
    location.pathname.startsWith(MenuProps.jobs.route.concat('/jobs')))

  return (
    <Header
      menuItems={menuItems}
      showMenu={status !== CandidateStatus.Registered}
      invisibilityRoutes={invisibilityRoutes}
      logoutRoute={routes.base}
      email={candidateEmail || ''}
      checkIfActiveRoute={checkIfActiveNavLink}
    />
  )
}
