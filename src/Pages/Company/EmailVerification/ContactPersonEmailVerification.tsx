import { useQuery } from 'react-query'
import { verifyContactPerson } from 'API/Calls/contactPersons'
import { useParams } from 'react-router-dom'
import { EmailVerification } from 'Components/Organisms/EmailVerification'
import { RootState } from 'Store/Slices/rootReducer'
import { useSelector } from 'react-redux'
import { forceLogoutFromAzureMsal, getAzureMsalInstance } from 'Services/AzureMsal'
import { getSignInRequest } from 'Authentication/Company/config'
import { useEffect } from 'react'

export const ContactPersonEmailVerification = () => {
  const contactPersonEmail = useSelector<RootState, string | undefined>(
    (state) => state.contactPerson.contactPerson?.email
  )
  const params = useParams()
  const { companyId, userId, verificationKey } = params

  useEffect(() => {
    forceLogoutFromAzureMsal()
  }, [])
  
  const response = useQuery(
    'contact-person-email-verification',
    () => verifyContactPerson(companyId!, userId!, verificationKey!),
    {
      enabled: !!verificationKey
    }
  )

  const handleNavigateClick = () => {
    const azureMsal = getAzureMsalInstance()
    azureMsal.loginRedirect(getSignInRequest())
  }

  return (
    <EmailVerification
      email={contactPersonEmail || ""}
      isError={response.isError}
      isLoading={response.isLoading}
      onNavigateClick={handleNavigateClick}
    />
  )
}
