import { getSignUpRequest } from 'Authentication/Candidate/config'
import { SignupForm } from 'Components/Organisms/SignupForm'
import { useNavigate } from 'react-router-dom'
import { getAzureMsalInstance } from 'Services/AzureMsal'
import { AuthenticationForm } from 'Templates/AuthenticationForm'

export const CandidateSignup = () => {
  const azureMsal = getAzureMsalInstance()
  const navigate = useNavigate()

  const handleSignupAction = (language: string) => {
    azureMsal.loginRedirect(getSignUpRequest(language))
  }

  return (
    <AuthenticationForm>
      <SignupForm
        onSignUpClick={handleSignupAction}
        onGoToLogin={() => navigate('/myprofile/login')}
      />
    </AuthenticationForm>
  )
}
