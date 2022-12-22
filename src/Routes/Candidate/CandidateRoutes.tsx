import { Routes, Route, Navigate } from 'react-router-dom'
import { CandidateLogin, CandidateSignup } from 'Pages/Candidate/Authentication'
import { CandidateEmailVerification } from 'Pages/Candidate/EmailVerification'

export const CandidateRoutes = () => (
  <Routes>
    <Route path="/login" element={<CandidateLogin />} />
    <Route path="/signup" element={<CandidateSignup />} />
    <Route
      path="/:userId/verification/:verificationKey"
      element={
        <CandidateEmailVerification />
      }
    />
    {/* ignore redirection to root url until authentication is completed */}
    <Route path="/confirmation-email" />
    <Route path="/*" element={<Navigate to="/myprofile/login" />} />
  </Routes>
)

export default CandidateRoutes
