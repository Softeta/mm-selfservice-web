import { Jobs, NewestJobs, AppliedInJobs } from 'Pages/Candidate/Jobs'
import { JobFullInfo } from 'Pages/Candidate/Jobs/JobFullInfo'
import { JobCoverLetterPage } from 'Pages/Candidate/Jobs/Motivation/JobCoverLetterPage'
import { JobVideoPage } from 'Pages/Candidate/Jobs/Motivation/JobVideoPage'
import { RecommendedJobs } from 'Pages/Candidate/Jobs/RecommendedJobs'
import { Routes, Route } from 'react-router-dom'

export const CandidateJobRoutes = () => (
  <Routes>
    <Route path="/" element={<Jobs />} />
    <Route path="/:jobId" element={<JobFullInfo />} />
    <Route path="/newest" element={<NewestJobs />}></Route>
    <Route path="/applied-in" element={<AppliedInJobs />}></Route>
    <Route path="/recommended" element={<RecommendedJobs />}></Route>
    <Route
      path="/motivation/:jobId/:candidateId/video"
      element={<JobVideoPage />}
    ></Route>
    <Route path="/:jobId" element={<JobFullInfo />}></Route>
    <Route path="/newest/:jobId" element={<JobFullInfo />}></Route>
    <Route path="/applied-in/:jobId" element={<JobFullInfo hideButtons />}></Route>
    <Route path="/recommended/:jobId" element={<JobFullInfo />}></Route>
    <Route
      path="/motivation/:jobId/:candidateId/cover-letter"
      element={<JobCoverLetterPage />}
    ></Route>
  </Routes>
)

export default CandidateJobRoutes
