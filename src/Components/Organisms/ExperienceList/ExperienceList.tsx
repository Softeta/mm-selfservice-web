import { useTranslation } from 'react-i18next'
import { ActivityCard } from 'Components/Molecules/ActivityCard'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import WorkExperienceType from 'API/Types/Enums/workExperienceType'
import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { TCandidate } from 'API/Types/Candidate/candidateGet'
import { useLocation, useNavigate } from 'react-router-dom'
import { FloatingActionMenu } from 'Components/Molecules/FloatingActionMenu'
import clsx from 'clsx'

type IProps = {
  saveExperiencePath: string
}

export const ExperienceList = ({ saveExperiencePath }: IProps) => {
  const { t } = useTranslation()
  const location = useLocation()

  const isProfileCreation = location.pathname.includes('/profile-creation')
  const candidate = useSelector<RootState, TCandidate | undefined>(
    (state) => state.candidateProfile.candidate
  )
  const navigate = useNavigate()
  const jobPath = `${saveExperiencePath}/${WorkExperienceType.Job}`
  const projectPath = `${saveExperiencePath}/${WorkExperienceType.Project}`

  const editExperience = (experience: TCandidateWorkExperience) => {
    navigate(`${saveExperiencePath}/${experience.type}/${experience.id}`)
  }

  return (
    <>
      <FloatingActionMenu
        actions={[
          {
            label: t('candidate.createProfile.addJob'),
            onClick: () => navigate(jobPath)
          },
          {
            label: t('candidate.createProfile.addProject'),
            onClick: () => navigate(projectPath)
          }
        ]}
        position={clsx(
          'right-4 bottom-44',
          !isProfileCreation && 'sm:bottom-28'
        )}
      />
      <h1 className="mb-20 text-center text-lg">
        {t('candidate.createProfile.yourJobs')}
      </h1>
      <div className="pb-32">
        {candidate?.candidateWorkExperiences.map((experience) => (
          <ActivityCard
            onClick={() => editExperience(experience)}
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
    </>
  )
}
