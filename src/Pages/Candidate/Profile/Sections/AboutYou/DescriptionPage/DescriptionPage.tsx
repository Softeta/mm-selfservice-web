import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { DescriptionForm } from 'Components/Organisms/DescriptionForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const DescriptionPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <DescriptionForm
          headerLabel={t('candidate.profile.aboutYou.description.header')}
          onFormPostSubmit={() => navigate('/myprofile/profile/about-you')}
          controlsBuilder={(submitHandler) => (
            <PrevNextMenu
              onBackBtnClick={() => navigate('/myprofile/profile/about-you')}
              onSubmitBtnClick={submitHandler}
              continueButtonLabel={t('candidate.settings.save')}
            />
          )}
        />
      </div>
    </ProfilePageContainer>
  )
}
