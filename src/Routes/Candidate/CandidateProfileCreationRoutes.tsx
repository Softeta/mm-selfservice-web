import { Routes, Route } from 'react-router-dom'
import { Step1 } from 'Pages/Candidate/ProfileCreation/Steps/Step1'
import { Step2 } from 'Pages/Candidate/ProfileCreation/Steps/Step2'
import { Step3 } from 'Pages/Candidate/ProfileCreation/Steps/Step3'
import { Step4 } from 'Pages/Candidate/ProfileCreation/Steps/Step4'
import { Step5 } from 'Pages/Candidate/ProfileCreation/Steps/Step5'
import { Step6 } from 'Pages/Candidate/ProfileCreation/Steps/Step6'
import { Step7 } from 'Pages/Candidate/ProfileCreation/Steps/Step7'
import { Step8 } from 'Pages/Candidate/ProfileCreation/Steps/Step8'
import { Step9 } from 'Pages/Candidate/ProfileCreation/Steps/Step9'
import { Step10 } from 'Pages/Candidate/ProfileCreation/Steps/Step10'
import { Step11 } from 'Pages/Candidate/ProfileCreation/Steps/Step11'
import { Step12 } from 'Pages/Candidate/ProfileCreation/Steps/Step12'
import { Step13 } from 'Pages/Candidate/ProfileCreation/Steps/Step13'
import { Step14 } from 'Pages/Candidate/ProfileCreation/Steps/Step14'
import { Step15 } from 'Pages/Candidate/ProfileCreation/Steps/Step15'
import { Step16 } from 'Pages/Candidate/ProfileCreation/Steps/Step16'
import { Step17 } from 'Pages/Candidate/ProfileCreation/Steps/Step17'
import { Step18 } from 'Pages/Candidate/ProfileCreation/Steps/Step18'
import { Step19 } from 'Pages/Candidate/ProfileCreation/Steps/Step19'
import { Step20 } from 'Pages/Candidate/ProfileCreation/Steps/Step20'
import { Step21 } from 'Pages/Candidate/ProfileCreation/Steps/Step21'
import { Step22 } from 'Pages/Candidate/ProfileCreation/Steps/Step22'
import { Step23 } from 'Pages/Candidate/ProfileCreation/Steps/Step23'
import { Step24 } from 'Pages/Candidate/ProfileCreation/Steps/Step24'
import { Step25 } from 'Pages/Candidate/ProfileCreation/Steps/Step25'
import { Step26 } from 'Pages/Candidate/ProfileCreation/Steps/Step26'
import { Step27 } from 'Pages/Candidate/ProfileCreation/Steps/Step27'
import { Step28 } from 'Pages/Candidate/ProfileCreation/Steps/Step28'
import { Step29 } from 'Pages/Candidate/ProfileCreation/Steps/Step29'
import { Step30 } from 'Pages/Candidate/ProfileCreation/Steps/Step30'
import { Step31 } from 'Pages/Candidate/ProfileCreation/Steps/Step31'

export const CandidateProfileCreationRoutes = () => (
  <Routes>
    <Route path="/step-1" element={<Step1 />} />
    <Route path="/step-2" element={<Step2 />} />
    <Route path="/step-3" element={<Step3 />} />
    <Route path="/step-4" element={<Step4 />} />
    <Route path="/step-5" element={<Step5 />} />
    <Route path="/step-6" element={<Step6 />} />
    <Route path="/step-7" element={<Step7 />} />
    <Route path="/step-8" element={<Step8 />} />
    <Route path="/step-9" element={<Step9 />} />
    <Route path="/step-10/:type" element={<Step10 />} />
    <Route path="/step-10/:type/:experienceEditId" element={<Step10 />} />
    <Route path="/step-11" element={<Step11 />} />
    <Route path="/step-12" element={<Step12 />} />
    <Route path="/step-12/:educationId" element={<Step12 />} />
    <Route path="/step-13" element={<Step13 />} />
    <Route path="/step-13/:courseId" element={<Step13 />} />
    <Route path="/step-14" element={<Step14 />} />
    <Route path="/step-15" element={<Step15 />} />
    <Route path="/step-16" element={<Step16 />} />
    <Route path="/step-17" element={<Step17 />} />
    <Route path="/step-18" element={<Step18 />} />
    <Route path="/step-19" element={<Step19 />} />
    <Route path="/step-20" element={<Step20 />} />
    <Route path="/step-21" element={<Step21 />} />
    <Route path="/step-22" element={<Step22 />} />
    <Route path="/step-23" element={<Step23 />} />
    <Route path="/step-24" element={<Step24 />} />
    <Route path="/step-25" element={<Step25 />} />
    <Route path="/step-26" element={<Step26 />} />
    <Route path="/step-27" element={<Step27 />} />
    <Route path="/step-28" element={<Step28 />} />
    <Route path="/step-29" element={<Step29 />} />
    <Route path="/step-30" element={<Step30 />} />
    <Route path="/step-31" element={<Step31 />} />
  </Routes>
)

export default CandidateProfileCreationRoutes
