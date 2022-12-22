import { CircleButton } from 'Components/Atoms'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { List } from 'Components/Molecules/List/List'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const Qualifications = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const qualificationsActions = [
    {
      key: 1,
      value: t('candidate.profile.qualifications.industries.header'),
      onClick: () => navigate('/myprofile/profile/qualifications/industries')
    },
    {
      key: 2,
      value: t('candidate.profile.qualifications.skills.header'),
      onClick: () => navigate('/myprofile/profile/qualifications/skills')
    },
    {
      key: 3,
      value: t('candidate.profile.qualifications.languages.header'),
      onClick: () => navigate('/myprofile/profile/qualifications/languages')
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
              {t('candidate.profile.qualifications.header')}
            </h1>
          </div>
        </div>
        <List items={qualificationsActions} />
      </div>
    </ProfilePageContainer>
  )
}
