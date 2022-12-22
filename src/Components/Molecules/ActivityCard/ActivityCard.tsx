import { ActivitySummary } from 'Components/Atoms/ActivitySummary'
import { ImageBox } from 'Components/Atoms/ImageBox'
import { useTranslation } from 'react-i18next'
import { SkillsList } from '../SkillsList'
import WorkExperienceType from 'API/Types/Enums/workExperienceType'

interface IProps {
  type: WorkExperienceType | 'course' | 'education'
  title: string
  company: string
  skills?: string[]
  startDate?: Date
  endDate?: Date
  imagePath?: string
  onClick?: () => void
}

export const ActivityCard: React.FC<IProps> = ({
  type,
  title,
  company,
  skills,
  startDate,
  endDate,
  imagePath,
  onClick
}) => {
  const { t } = useTranslation()

  const getAnnotation = () => {
    switch (type) {
      case WorkExperienceType.Project:
        return t('activityCard.projectAnnotation')
      case 'education':
        return t('activityCard.educationAnnotation')
      case 'course':
        return t('activityCard.courseAnnotation')
      default:
        return undefined
    }
  }

  return (
    <div className="grid" onClick={onClick}>
      <div className="flex">
        <ImageBox
          url={imagePath}
          alt={company.substring(0, 1).toUpperCase()}
          annotation={getAnnotation()}
        />
        <div className="p-2">
          <ActivitySummary
            title={title}
            company={company}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
      {skills && (
        <div className="hidden px-2 pt-2 sm:block">
          <SkillsList skills={skills} />
        </div>
      )}
    </div>
  )
}
