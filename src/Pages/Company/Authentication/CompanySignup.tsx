import { getSignUpRequest } from 'Authentication/Company/config'
import { SignupForm } from 'Components/Organisms/SignupForm'
import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { getAzureMsalInstance } from 'Services/AzureMsal'
import { AuthenticationForm } from 'Templates/AuthenticationForm'

export const CompanySignup = () => {
  const azureMsal = getAzureMsalInstance()
  const navigate = useNavigate()

  const handleSignupAction = (language: string) => {
    azureMsal.loginRedirect(getSignUpRequest(language))
  }

  return (
    <AuthenticationForm>
      <SignupForm
        onSignUpClick={handleSignupAction}
        onGoToLogin={() => navigate(routes.company.login)}
      />
    </AuthenticationForm>
  )
}
