import { CircleButton } from 'Components/Atoms'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { List } from 'Components/Molecules/List/List'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const AboutYou = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const aboutYouActions = [
    {
      key: 1,
      value: t('candidate.profile.aboutYou.contactInfo.header'),
      onClick: () =>
        navigate('/myprofile/profile/about-you/edit-contact-information')
    },
    {
      key: 2,
      value: t('candidate.profile.aboutYou.description.header'),
      onClick: () => navigate('/myprofile/profile/about-you/description')
    },
    {
      key: 3,
      value: t('candidate.profile.aboutYou.freeTime.header'),
      onClick: () => navigate('/myprofile/profile/about-you/free-time')
    },
    {
      key: 4,
      value: t('candidate.profile.aboutYou.video.header'),
      onClick: () => navigate('/myprofile/profile/about-you/video')
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
              {t('candidate.profile.aboutYou.header')}
            </h1>
          </div>
        </div>
        <List items={aboutYouActions} />
      </div>
    </ProfilePageContainer>
  )
}
