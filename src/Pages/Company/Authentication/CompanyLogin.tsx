import { getSignInRequest } from 'Authentication/Company/config'
import { SigninForm } from 'Components/Organisms/SigninForm'
import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { getAzureMsalInstance } from 'Services/AzureMsal'
import { AuthenticationForm } from 'Templates/AuthenticationForm'

export const CompanyLogin = () => {
  const azureMsal = getAzureMsalInstance()
  const navigate = useNavigate()

  const handleSignInAction = (language: string) => {
    azureMsal.loginRedirect(getSignInRequest(language))
  }

  return (
    <AuthenticationForm>
      <SigninForm
        onSignInClick={handleSignInAction}
        onGoToSignup={() => navigate(routes.company.signup)}
      />
    </AuthenticationForm>
  )
}
