import CandidateJobProvider from 'Contexts/CandidateJob/CandidateJobProvider'
import { Experience } from 'Pages/Presentation/Candidate/Experience'
import { Motivation } from 'Pages/Presentation/Candidate/Motivation'
import { OurConsideration } from 'Pages/Presentation/Candidate/OurConsideration'
import { TestResults } from 'Pages/Presentation/Candidate/TestResults'
import { Profile } from 'Pages/Presentation/Candidate/Profile'
import { Routes, Route } from 'react-router-dom'

export const CandidatePresentationRoutes = () => (
  <CandidateJobProvider>
    <Routes>
      <Route path="/profile" element={<Profile />} />
      <Route path="/experience" element={<Experience />} />
      <Route path="/motivation" element={<Motivation />} />
      <Route path="/personality-tests" element={<TestResults />} />
      <Route path="/our-considerations" element={<OurConsideration />} />
    </Routes>
  </CandidateJobProvider>
)

export default CandidatePresentationRoutes
