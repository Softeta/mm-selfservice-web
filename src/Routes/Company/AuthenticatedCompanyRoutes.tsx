import { Routes, Route, Navigate } from 'react-router-dom'
import { ContactPersonConfirmationEmail } from 'Pages/Company/ConfirmationEmail'
import { ContactPersonEmailVerification } from 'Pages/Company/EmailVerification'
import { Dashboard } from 'Pages/Company/Dashboard'
import { Profile } from 'Pages/Company/Profile'
import { Contacts } from 'Pages/Company/Contacts'
import PrivateRoute from './PrivateRoute'
import JobRoutes from './JobRoutes'
import RegistrationRoutes from './RegistrationRoutes'
import PresentationRoutes from 'Routes/Presentation/PresentationRoutes'
import AdminRoute from './AdminRoute'
import { CompanySettings } from 'Pages/Company/Settings'

export const AuthenticatedCompanyRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    />
    <Route
      path="/profile"
      element={
        <PrivateRoute>
          <Profile />
        </PrivateRoute>
      }
    />
    <Route
      path="/contacts"
      element={
        <PrivateRoute>
          <Contacts />
        </PrivateRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <PrivateRoute>
          <CompanySettings />
        </PrivateRoute>
      }
    />
    <Route
      path="/contacts/new"
      element={
        <PrivateRoute>
          <AdminRoute rollBackUrl="/contacts">
            <Contacts createNew={true} />
          </AdminRoute>
        </PrivateRoute>
      }
    />
    <Route
      path="/contacts/:contactPersonId"
      element={
        <PrivateRoute>
          <AdminRoute rollBackUrl="/contacts">
            <Contacts />
          </AdminRoute>
        </PrivateRoute>
      }
    />
    <Route
      path="/jobs/*"
      element={
        <PrivateRoute>
          <JobRoutes />
        </PrivateRoute>
      }
    />
    <Route
      path="/registration/*"
      element={
        <PrivateRoute>
          <RegistrationRoutes />
        </PrivateRoute>
      }
    />
    <Route
      path="/presentation/*"
      element={
        <PrivateRoute>
          <PresentationRoutes />
        </PrivateRoute>
      }
    />
    <Route
      path="/:companyId/:userId/verification/:verificationKey"
      element={
        <PrivateRoute>
          <ContactPersonEmailVerification />
        </PrivateRoute>
      }
    />
    <Route
      path="/confirmation-email"
      element={
        <PrivateRoute>
          <ContactPersonConfirmationEmail />
        </PrivateRoute>
      }
    />
    <Route path="/*" element={<Navigate to="" />} />
  </Routes>
)

export default AuthenticatedCompanyRoutes
