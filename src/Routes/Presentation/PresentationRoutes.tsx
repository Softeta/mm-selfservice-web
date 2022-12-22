import { Shortlist } from 'Pages/Presentation/Shortlist'
import { Routes, Route } from 'react-router-dom'
import CandidatePresentationRoutes from './CandidatePresentationRoutes'

export const PresentationRoutes = () => (
  <Routes>
    <Route path="/shortlist/:jobId" element={<Shortlist />} />
    <Route
      path="/shortlist/:jobId/candidate/:candidateId/*"
      element={<CandidatePresentationRoutes />}
    />
  </Routes>
)

export default PresentationRoutes
