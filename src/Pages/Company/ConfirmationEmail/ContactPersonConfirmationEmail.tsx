import { useState } from 'react'
import { useMutation } from 'react-query'
import { requestEmailVerification } from 'API/Calls/contactPersons'
import { TErrorResponse } from 'API/Types/errorResponse'
import { useMsal } from '@azure/msal-react'
import { getSignUpRequest } from 'Authentication/Company/config'
import { ConfirmationEmail } from 'Components/Organisms/ConfirmationEmail'
import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'

export const ContactPersonConfirmationEmail = () => {
  const contactPersonEmail = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.email!
  )

  const systemLanguage = useSelector<RootState, string | undefined>(
    (state) => state.contactPerson.contactPerson!.systemLanguage
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
        azureMsal.instance.loginRedirect(getSignUpRequest(systemLanguage))
      )
  }

  return (
    <ConfirmationEmail
      email={contactPersonEmail}
      isLoading={isLoading}
      isError={isError}
      isEmailSent={emailSent}
      error={error as TErrorResponse}
      onRequestEmailVerification={mutate}
      onLogoutClick={logout}
    />
  )
}
