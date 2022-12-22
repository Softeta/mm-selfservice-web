import { Routes, Route, Navigate } from 'react-router-dom'
import { Jobs } from 'Pages/Candidate/Jobs'
import { ProfileCreation } from 'Pages/Candidate/ProfileCreation'
import { CandidateConfirmationEmail } from 'Pages/Candidate/ConfirmationEmail'
import PrivateRoute from './PrivateRoute'
import CandidateJobRoutes from './CandidateJobRoutes'
import { Tests } from 'Pages/Candidate/Tests'
import { CandidateSettings } from 'Pages/Candidate/Settings'
import CandidateProfileEditRoutes from './CandidateProfileEditRoutes'
import { TestResults } from 'Pages/Candidate/TestResults'
import { CandidateEmailVerification } from 'Pages/Candidate/EmailVerification'

export const AuthenticatedCandidateRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Jobs />
        </PrivateRoute>
      }
    />
    <Route path="/settings" element={<CandidateSettings />} />
    <Route
      path="/profile/*"
      element={
        <PrivateRoute>
          <CandidateProfileEditRoutes />
        </PrivateRoute>
      }
    />
    <Route
      path="/jobs"
      element={
        <PrivateRoute>
          <Jobs />
        </PrivateRoute>
      }
    />
    <Route
      path="/jobs/*"
      element={
        <PrivateRoute>
          <CandidateJobRoutes />
        </PrivateRoute>
      }
    />
    <Route
      path="/tests"
      element={
        <PrivateRoute>
          <Tests />
        </PrivateRoute>
      }
    />
    <Route
      path="/tests/results"
      element={
        <PrivateRoute>
          <TestResults />
        </PrivateRoute>
      }
    />
    <Route
      path="/profile-creation/*"
      element={
        <PrivateRoute>
          <ProfileCreation />
        </PrivateRoute>
      }
    />
    <Route
      path="/confirmation-email"
      element={
        <PrivateRoute>
          <CandidateConfirmationEmail />
        </PrivateRoute>
      }
    />
    <Route
      path="/:userId/verification/:verificationKey"
      element={
        <PrivateRoute>
          <CandidateEmailVerification />
        </PrivateRoute>
      }
    />
    <Route path="/*" element={<Navigate to="" />} />
  </Routes>
)

export default AuthenticatedCandidateRoutes
