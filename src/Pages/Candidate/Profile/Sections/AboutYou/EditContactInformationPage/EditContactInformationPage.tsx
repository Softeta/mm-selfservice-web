import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { ContactForm } from 'Forms/Candidate/ContactForm'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const EditContactInformationPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <ContactForm
          headerLabel={t('candidate.profile.aboutYou.contactInfo.header')}
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
