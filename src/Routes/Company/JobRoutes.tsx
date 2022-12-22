import { CreateJob } from 'Pages/Company/CreateJob'
import { Step1 } from 'Pages/Company/CreateJob/Steps/Step1'
import { Job } from 'Pages/Company/Job'
import { ActiveJobs, PendingJobs } from 'Pages/Company/Jobs'
import { Routes, Route } from 'react-router-dom'

export const JobRoutes = () => (
  <Routes>
    <Route path="/create" element={<Step1 />}></Route>
    <Route path="/create/:jobId/*" element={<CreateJob />}></Route>
    <Route path="/:jobId" element={<Job />} />
    <Route path="/active" element={<ActiveJobs />} />
    <Route path="/pending" element={<PendingJobs />} />
  </Routes>
)

export default JobRoutes
