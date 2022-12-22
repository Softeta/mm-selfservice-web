import { Step1 } from 'Pages/Company/Registration/Step1'
import { Step2 } from 'Pages/Company/Registration/Step2'
import { Routes, Route } from 'react-router-dom'

export const RegistrationRoutes = () => (
  <Routes>
    <Route path="/step1" element={<Step1 />} />
    <Route path="/step2" element={<Step2 />} />
  </Routes>
)

export default RegistrationRoutes
