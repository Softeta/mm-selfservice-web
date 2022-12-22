import { Profile } from 'Pages/Candidate/Profile'
import { AboutYou } from 'Pages/Candidate/Profile/Sections/AboutYou'
import { DescriptionPage } from 'Pages/Candidate/Profile/Sections/AboutYou/DescriptionPage'
import { EditContactInformationPage } from 'Pages/Candidate/Profile/Sections/AboutYou/EditContactInformationPage'
import { FreeTimePage } from 'Pages/Candidate/Profile/Sections/AboutYou/FreeTimePage'
import { VideoPage } from 'Pages/Candidate/Profile/Sections/AboutYou/VideoPage'
import { Experience } from 'Pages/Candidate/Profile/Sections/Experience'
import { ExperienceListPage } from 'Pages/Candidate/Profile/Sections/Experience/Career/ExperienceListPage'
import { SaveExperiencePage } from 'Pages/Candidate/Profile/Sections/Experience/Career/SaveExperiencePage'
import { EducationListPage } from 'Pages/Candidate/Profile/Sections/Experience/Education/EducationListPage'
import { SaveCoursePage } from 'Pages/Candidate/Profile/Sections/Experience/Education/SaveCoursePage'
import { SaveEducationPage } from 'Pages/Candidate/Profile/Sections/Experience/Education/SaveEducationPage'
import { EditPicturePage } from 'Pages/Candidate/Profile/Sections/Main/EditPicturePage'
import { Qualifications } from 'Pages/Candidate/Profile/Sections/Qualifications'
import { IndustriesPage } from 'Pages/Candidate/Profile/Sections/Qualifications/IndustriesPage'
import { LanguagesPage } from 'Pages/Candidate/Profile/Sections/Qualifications/LanguagesPage'
import { SkillsPage } from 'Pages/Candidate/Profile/Sections/Qualifications/SkillsPage'
import { Terms } from 'Pages/Candidate/Profile/Sections/Terms'
import { SalaryFreelancePage } from 'Pages/Candidate/Profile/Sections/Terms/SalaryPage/SalaryFreelancePage'
import { SalaryPermanentPage } from 'Pages/Candidate/Profile/Sections/Terms/SalaryPage/SalaryPermanentPage'
import { WorkingHoursPage } from 'Pages/Candidate/Profile/Sections/Terms/WorkingHoursPage'
import { Route, Routes } from 'react-router-dom'

export const CandidateProfileEditRoutes = () => (
  <Routes>
    <Route path="/" element={<Profile />} />
    <Route path="/edit-picture" element={<EditPicturePage />} />
    <Route
      path="/about-you/edit-contact-information"
      element={<EditContactInformationPage />}
    />
    <Route path="/about-you" element={<AboutYou />} />
    <Route path="/about-you/free-time" element={<FreeTimePage />} />
    <Route path="/about-you/description" element={<DescriptionPage />} />
    <Route path="/about-you/video" element={<VideoPage />} />
    <Route path="/experience" element={<Experience />} />
    <Route path="/experience/career" element={<ExperienceListPage />} />
    <Route path="/experience/career/:type" element={<SaveExperiencePage />} />
    <Route
      path="/experience/career/:type/:experienceEditId"
      element={<SaveExperiencePage />}
    />
    <Route path="/experience/education" element={<EducationListPage />} />
    <Route
      path="/experience/education/save-education"
      element={<SaveEducationPage />}
    />
    <Route
      path="/experience/education/save-education/:educationId"
      element={<SaveEducationPage />}
    />
    <Route
      path="/experience/education/save-course"
      element={<SaveCoursePage />}
    />
    <Route
      path="/experience/education/save-course/:courseId"
      element={<SaveCoursePage />}
    />
    <Route path="/qualifications" element={<Qualifications />} />
    <Route path="/qualifications/industries" element={<IndustriesPage />} />
    <Route path="/qualifications/skills" element={<SkillsPage />} />
    <Route path="/qualifications/languages" element={<LanguagesPage />} />
    <Route path="/terms" element={<Terms />} />
    <Route path="/terms/salary-freelance" element={<SalaryFreelancePage />} />
    <Route path="/terms/salary-permanent" element={<SalaryPermanentPage />} />
    <Route path="/terms/working-hours" element={<WorkingHoursPage />} />
  </Routes>
)

export default CandidateProfileEditRoutes
