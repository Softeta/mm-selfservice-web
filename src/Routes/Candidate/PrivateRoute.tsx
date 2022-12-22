import CandidateStatus from 'API/Types/Enums/candidateStatus'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'Store/Slices/rootReducer'

const verificationRoute = '/verification/'

const routes = {
  base: '/myprofile/',
  jobs: '/myprofile',
  confirmation: '/myprofile/confirmation-email',
  verification: '/myprofile/:userId/verification/:verificationKey',
  createProfile: '/myprofile/profile-creation',
  rejected: '/myprofile/rejected',
  coreInformation: {
    step1: '/myprofile/profile-creation/step-1',
    step2: '/myprofile/profile-creation/step-2',
    step3: '/myprofile/profile-creation/step-3',
    step4: '/myprofile/profile-creation/step-4',
    step5: '/myprofile/profile-creation/step-5'
  }
}

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate()
  const status = useSelector<RootState, CandidateStatus | undefined>(
    (state) => state.candidateProfile.candidate?.status
  )

  const isEmailVerified = useSelector<RootState, boolean | undefined>(
    (state) => state.candidateProfile.candidate?.isEmailVerified
  )

  const isOrigin = (path: string, endsWithRule = true) => {
    if (endsWithRule) {
      return location.pathname.toLocaleLowerCase().endsWith(path)
    }

    return location.pathname.toLocaleLowerCase().includes(path)
  }

  useEffect(() => {
    if (!status) {
      if (!isOrigin(routes.confirmation)) {
        navigate(routes.confirmation)
      }
    } else if (!isEmailVerified) {
      if (
        !isOrigin(routes.confirmation) &&
        !isOrigin(verificationRoute, /*endsWithRule = */ false)
      ) {
        navigate(routes.confirmation)
      }
    } else if (status === CandidateStatus.Registered) {
      if (
        !isOrigin(routes.coreInformation.step1) &&
        !isOrigin(routes.coreInformation.step2) &&
        !isOrigin(routes.coreInformation.step3) &&
        !isOrigin(routes.coreInformation.step4) &&
        !isOrigin(routes.coreInformation.step5)
      ) {
        navigate(routes.coreInformation.step1)
      }
    } else if (status === CandidateStatus.Rejected) {
      if (!isOrigin(routes.rejected)) {
        navigate(routes.rejected)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEmailVerified, status])

  return children
}

export default PrivateRoute
