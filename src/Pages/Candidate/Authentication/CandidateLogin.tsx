import { getSignInRequest } from 'Authentication/Candidate/config'
import { SigninForm } from 'Components/Organisms/SigninForm'
import { useNavigate } from 'react-router-dom'
import { getAzureMsalInstance } from 'Services/AzureMsal'
import { AuthenticationForm } from 'Templates/AuthenticationForm'

export const CandidateLogin = () => {
  const azureMsal = getAzureMsalInstance()
  const navigate = useNavigate()

  const handleSignInAction = (language: string) => {
    azureMsal.loginRedirect(getSignInRequest(language))
  }

  return (
    <AuthenticationForm>
      <SigninForm
        onSignInClick={handleSignInAction}
        onGoToSignup={() => navigate('/myprofile/signup')}
      />
    </AuthenticationForm>
  )
}
