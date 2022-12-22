import { useQuery } from 'react-query'
import { verifyCandidate } from 'API/Calls/candidates'
import { useNavigate, useParams } from 'react-router-dom'
import { EmailVerification } from 'Components/Organisms/EmailVerification'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { setCandidate } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { useState } from 'react'
import { TCandidate } from 'API/Types/Candidate/candidateGet'

export const CandidateEmailVerification = () => {
  const candidateEmail = useSelector<RootState, string | undefined>(
    (state) => state.candidateProfile.candidate?.email
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  const { userId, verificationKey } = params
  const [successCandidateResponse, setSuccessCandidateResponse] =
    useState<TCandidate>()

  const response = useQuery(
    'email-verification',
    () => verifyCandidate(userId!, verificationKey!),
    {
      enabled: !!verificationKey,
      onSuccess: (resp) => {
        setSuccessCandidateResponse(resp.data)
      }
    }
  )

  const handleNavigateClick = () => {
    if (candidateEmail) {
      dispatch(setCandidate(successCandidateResponse!))
      navigate('/myprofile/profile-creation/step-1')
    } else {
      navigate('/myprofile')
    }
  }

  return (
    <EmailVerification
      email={candidateEmail || ""}
      isError={response.isError}
      isLoading={response.isLoading}
      onNavigateClick={handleNavigateClick}
    />
  )
}
