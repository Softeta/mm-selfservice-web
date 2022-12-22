import ContactPersonStage from 'API/Types/Enums/contactPersonStage'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'Store/Slices/rootReducer'
import { routes } from '../routes'

const verificationRoute = 'verification'
const notAllowedRoutes = ['registration', 'verification', 'confirmation']

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const stage = useSelector<RootState, ContactPersonStage | undefined>(
    (state) => state.contactPerson.contactPerson?.stage
  )

  const isEmailVerified = useSelector<RootState, boolean | undefined>(
    (state) => state.contactPerson.contactPerson?.isEmailVerified
  )

  const isOrigin = (path: string) =>
    location.pathname.toLocaleLowerCase().includes(path)

  useEffect(() => {
    if (!stage) {
      if (!isOrigin(routes.company.confirmation)) {
        navigate(routes.company.confirmation)
      }
    } else if (!isEmailVerified) {
      if (
        !isOrigin(routes.company.confirmation) &&
        !isOrigin(verificationRoute)
      ) {
        navigate(routes.company.confirmation)
      }
    } else if (stage === ContactPersonStage.Registered) {
      if (
        !isOrigin(routes.company.registration.step1) &&
        !isOrigin(routes.company.registration.step2)
      ) {
        navigate(routes.company.registration.step1)
      }
    } else if (
      notAllowedRoutes.some((x) =>
        location.pathname.toLocaleLowerCase().includes(x)
      )
    ) {
      navigate(routes.company.root)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmailVerified, stage])

  return children
}

export default PrivateRoute
