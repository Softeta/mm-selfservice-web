import { Step3 } from 'Pages/Company/CreateJob/Steps/Step3'
import { Routes, Route } from 'react-router-dom'
import { Step5 } from 'Pages/Company/CreateJob/Steps/Step5'
import { Step4 } from 'Pages/Company/CreateJob/Steps/Step4'
import { Step6Freelance } from 'Pages/Company/CreateJob/Steps/Step6Freelance'
import { Step6Permanent } from 'Pages/Company/CreateJob/Steps/Step6Permanent'
import { Step6FreelanceAndPermanent } from 'Pages/Company/CreateJob/Steps/Step6FreelanceAndPermanent'
import { Step7 } from 'Pages/Company/CreateJob/Steps/Step7'

export const CreateJobRoutes = () => (
  <Routes>
    <Route path="/step-3" element={<Step3 />} />
    <Route path="/step-4" element={<Step4 />} />
    <Route path="/step-5" element={<Step5 />} />
    <Route path="/step-6/freelance" element={<Step6Freelance />} />
    <Route path="/step-6/permanent" element={<Step6Permanent />} />
    <Route path="/step-7" element={<Step7 />} />
    <Route
      path="/step-6/freelance-and-permanent"
      element={<Step6FreelanceAndPermanent />}
    />
  </Routes>
)

export default CreateJobRoutes
