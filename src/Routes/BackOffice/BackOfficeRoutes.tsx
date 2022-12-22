import { Routes, Route } from 'react-router-dom'
import PresentationRoutes from 'Routes/Presentation/PresentationRoutes'

export const BackOfficeRoutes = () => (
  <Routes>
    <Route path="/presentation/*" element={<PresentationRoutes />} />
  </Routes>
)

export default BackOfficeRoutes
