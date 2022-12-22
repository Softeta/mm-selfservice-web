import { useState } from 'react'
import { useMutation } from 'react-query'
import { requestEmailVerification } from 'API/Calls/candidates'
import { TErrorResponse } from 'API/Types/errorResponse'
import { useMsal } from '@azure/msal-react'
import { getSignUpRequest } from 'Authentication/Candidate/config'
import { ConfirmationEmail } from 'Components/Organisms/ConfirmationEmail'
import { RootState } from 'Store/Slices/rootReducer'
import { useSelector } from 'react-redux'

export const CandidateConfirmationEmail = () => {
  const candidateEmail = useSelector<RootState, string>(
    (state) => state.candidateProfile.candidate!.email!
  )

  const candidateSystemLanguage = useSelector<RootState, string | undefined>(
    (state) => state.candidateProfile.candidate!.systemLanguage
  )

  const azureMsal = useMsal()
  const [emailSent, setEmailSent] = useState(false)
  const { isLoading, error, isError, mutate } = useMutation(() =>
    requestEmailVerification().then(() => setEmailSent(true))
  )

  const logout = () => {
    azureMsal.instance
      .logoutPopup()
      .then(() =>
        azureMsal.instance.loginRedirect(
          getSignUpRequest(candidateSystemLanguage)
        )
      )
  }

  return (
    <ConfirmationEmail
      email={candidateEmail}
      isLoading={isLoading}
      isError={isError}
      isEmailSent={emailSent}
      error={error as TErrorResponse}
      onRequestEmailVerification={mutate}
      onLogoutClick={logout}
    />
  )
}
