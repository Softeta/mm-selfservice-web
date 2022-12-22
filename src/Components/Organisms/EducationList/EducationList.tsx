import { useTranslation } from 'react-i18next'
import { ActivityCard } from 'Components/Molecules/ActivityCard'
import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import { TCandidateCourseResponse } from 'API/Types/Candidate/Common/candidateCourse'
import { TCandidateEducationResponse } from 'API/Types/Candidate/Common/candidateEducation'
import { FloatingActionMenu } from 'Components/Molecules/FloatingActionMenu'
import clsx from 'clsx'

type IProps = {
  saveEducationPath: string
  saveCoursePath: string
}

type TDefaultValues = {
  courses: TCandidateCourseResponse[]
  educations: TCandidateEducationResponse[]
}

export const EducationList = ({
  saveEducationPath,
  saveCoursePath
}: IProps) => {
  const { t } = useTranslation()
  const location = useLocation()

  const isProfileCreation = location.pathname.includes('/profile-creation')
  const candidate = useSelector<RootState, TDefaultValues>((state) => ({
    courses: state.candidateProfile.candidate?.candidateCourses || [],
    educations: state.candidateProfile.candidate?.candidateEducations || []
  }))
  const navigate = useNavigate()

  const editEducation = (education: TCandidateEducationResponse) => {
    navigate(`${saveEducationPath}/${education.id}`)
  }

  const editCourse = (course: TCandidateCourseResponse) => {
    navigate(`${saveCoursePath}/${course.id}`)
  }

  return (
    <>
      <FloatingActionMenu
        actions={[
          {
            label: t('candidate.createProfile.addEducation'),
            onClick: () => navigate(saveEducationPath)
          },
          {
            label: t('candidate.createProfile.addCourse'),
            onClick: () => navigate(saveCoursePath)
          }
        ]}
        position={clsx(
          'right-4 bottom-44',
          !isProfileCreation && 'sm:bottom-28'
        )}
      />
      <h1 className="mb-20 text-center text-lg">
        {t('candidate.createProfile.educationList.headerTitle')}
      </h1>
      <div className="pb-32">
        {candidate?.educations.map((education) => (
          <ActivityCard
            onClick={() => editEducation(education)}
            key={education.id}
            type="education"
            title={education.fieldOfStudy}
            company={education.schoolName}
          />
        ))}
        {candidate?.courses.map((course) => (
          <ActivityCard
            onClick={() => editCourse(course)}
            key={course.id}
            type="course"
            title={course.name}
            company={course.issuingOrganization}
          />
        ))}
      </div>
    </>
  )
}
