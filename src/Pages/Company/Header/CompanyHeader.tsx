import ContactPersonStage from 'API/Types/Enums/contactPersonStage'
import { Header } from 'Components/Organisms/Header'
import { IMenuItem } from 'Components/Organisms/Header/Header'
import { replaceLastRouteElement } from 'Helpers/replaceListRouteElement'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { InvisibleHeaderRoutes } from 'Routes/Company/invisibleHeaderRoutes'
import { routes } from 'Routes/routes'
import { RootState } from 'Store/Slices/rootReducer'
import { RegularExpressions } from 'Variables/regularExpressions'

const companyMenuItems = [
  { title: 'company.header.nav.dashboard', route: routes.company.root },
  { title: 'company.header.nav.profile', route: routes.company.profile },
  { title: 'company.header.nav.contacts', route: routes.company.contacts.base },
  { title: 'candidate.header.nav.settings', route: routes.company.settings }
]

const candidateProfileMenuTemplate = [
  {
    title: 'company.header.nav.candidate.profile',
    route: 'profile'
  },
  {
    title: 'company.header.nav.candidate.experience',
    route: 'experience'
  },
  {
    title: 'company.header.nav.candidate.motivation',
    route: 'motivation'
  },
  {
    title: 'company.header.nav.candidate.tests',
    route: 'personality-tests'
  },
  {
    title: 'company.header.nav.candidate.consideration',
    route: 'our-considerations'
  }
]

interface IProps {
  children?: React.ReactNode
}

export const CompanyHeader = ({ children }: IProps) => {
  const location = useLocation()
  const contactPersonEmail = useSelector<RootState, string | undefined>(
    (state) => state.contactPerson.contactPerson?.email
  )
  const status = useSelector<RootState, string | undefined>(
    (state) => state.contactPerson.contactPerson?.stage
  )

  const isCandidateLocation = RegularExpressions.isShortListCandidatePath.test(location.pathname)
  const isBackOfficeVisitor = location.pathname.startsWith('/back-office')

  const checkIfActiveNavLink = (menuItem: IMenuItem): boolean => (
    menuItem.title !== 'company.header.nav.dashboard' ||
    location.pathname.replace(/\/$/, '').endsWith(routes.company.root) ||
    location.pathname.startsWith(routes.company.jobs.base)
  )

  const candidateProfileMenuItems = candidateProfileMenuTemplate.map(
    (item) => ({
      title: item.title,
      route: replaceLastRouteElement(location.pathname, item.route)
    })
  )

  let menuRendered = isCandidateLocation
    ? candidateProfileMenuItems
    : companyMenuItems
  if (isBackOfficeVisitor && !isCandidateLocation) {
    menuRendered = []
  }

  return (
    <Header
      menuItems={menuRendered}
      showMenu={status !== ContactPersonStage.Registered || isBackOfficeVisitor}
      invisibilityRoutes={InvisibleHeaderRoutes}
      logoutRoute={routes.company.root}
      email={contactPersonEmail || ''}
      userVisible={!isBackOfficeVisitor}
      checkIfActiveRoute={checkIfActiveNavLink}
    >
      {children}
    </Header>
  )
}
