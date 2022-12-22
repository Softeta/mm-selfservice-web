import BackOffice from 'Pages/BackOffice'
import Candidate from 'Pages/Candidate'
import Company from 'Pages/Company'
import { Routes, Route } from 'react-router-dom'
import { routes } from './routes'

export const AppRoutes = () => (
  <Routes>
    <Route path={`${routes.company.root}/*`} element={<Company />} />
    <Route path="/myprofile/*" element={<Candidate />} />
    <Route path="/back-office/*" element={<BackOffice />} />
  </Routes>
)

export default AppRoutes
