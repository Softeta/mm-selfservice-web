import { CompanyLogin, CompanySignup } from 'Pages/Company/Authentication'
import { ContactPersonEmailVerification } from 'Pages/Company/EmailVerification'
import { Routes, Route, Navigate } from 'react-router-dom'

export const CompanyRoutes = () => (
  <Routes>
    <Route path="/login" element={<CompanyLogin />} />
    <Route path="/signup" element={<CompanySignup />} />
    <Route
      path="/:companyId/:userId/verification/:verificationKey"
      element={<ContactPersonEmailVerification />}
    />
     {/* ignore redirection to root url until authentication is completed */}
    <Route path="/confirmation-email" />
    <Route path="/*" element={<Navigate to="/findtalent/login" />} />
  </Routes>
)

export default CompanyRoutes
