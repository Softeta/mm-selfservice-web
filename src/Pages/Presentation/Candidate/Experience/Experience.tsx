import { InfoContainer } from 'Components/Atoms/Info/InfoContainer'
import { ActivityCard } from 'Components/Molecules/ActivityCard'
import CandidateJobContext from 'Contexts/CandidateJob/CandidateJobContext'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export const Experience = () => {
  const { t } = useTranslation()
  const jobCandidate = useContext(CandidateJobContext)!
  const candidate = jobCandidate.candidate

  return (
    <>
      {candidate?.candidateWorkExperiences && candidate?.candidateWorkExperiences.length > 0 &&
        <InfoContainer label={t('candidate.profile.experience')}>
          <div className="grid gap-3">
            {candidate?.candidateWorkExperiences.map((experience) => (
              <ActivityCard
                key={experience.id}
                type={experience.type}
                title={experience.position.code}
                company={experience.companyName}
                skills={experience.skills?.map((skill) => skill.code) || []}
                startDate={new Date(experience.from)}
                endDate={experience.to ? new Date(experience.to) : undefined}
              />
            ))}
          </div>
        </InfoContainer>}
      {(candidate.candidateEducations && candidate?.candidateEducations.length > 0) ||
        (candidate.candidateCourses && candidate?.candidateCourses.length > 0) &&
        <>
          <div className="h-4"></div>
          <InfoContainer label={t('candidate.profile.education')}>
            <div className="grid gap-3">
              {candidate?.candidateEducations.map((education) => (
                <ActivityCard
                  key={education.id}
                  type="education"
                  title={`${education.fieldOfStudy} (${education.degree})`}
                  company={education.schoolName}
                  startDate={new Date(education.from)}
                  endDate={education.to ? new Date(education.to) : undefined}
                />
              ))}
              {candidate?.candidateCourses.map((course) => (
                <ActivityCard
                  key={course.id}
                  type="course"
                  title={course.name}
                  company={course.issuingOrganization}
                />
              ))}
            </div>
          </InfoContainer>
        </>}
    </>
  )
}
