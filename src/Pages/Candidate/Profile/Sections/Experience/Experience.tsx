import { CircleButton } from 'Components/Atoms'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { List } from 'Components/Molecules/List/List'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const Experience = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const experienceActions = [
    {
      key: 1,
      value: t('candidate.profile.experience.career.header'),
      onClick: () => navigate('/myprofile/profile/experience/career')
    },
    {
      key: 2,
      value: t('candidate.profile.experience.education.header'),
      onClick: () => navigate('/myprofile/profile/experience/education')
    }
  ]

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        <div className="relative flex h-fit items-center pb-20">
          <CircleButton
            iconType="back"
            variant="tertiary"
            onClick={(event) => {
              event.preventDefault()
              navigate('/myprofile/profile')
            }}
            extraClassName="absolute left-0 bottom text-spanish-gray"
          />
          <div className="flex grow justify-center">
            <h1 className="text-center">
              {t('candidate.profile.experience.header')}
            </h1>
          </div>
        </div>
        <List items={experienceActions} />
      </div>
    </ProfilePageContainer>
  )
}
