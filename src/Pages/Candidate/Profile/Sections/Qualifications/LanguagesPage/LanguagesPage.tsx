import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LanguagesForm } from 'Components/Organisms/LanguagesForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const LanguagesPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <LanguagesForm
          headerLabel={t('candidate.profile.qualifications.languages.header')}
          onFormPostSubmit={() => navigate('/myprofile/profile/qualifications')}
          controlsBuilder={(submitHandler) => (
            <PrevNextMenu
              onBackBtnClick={() =>
                navigate('/myprofile/profile/qualifications')
              }
              onSubmitBtnClick={submitHandler}
              continueButtonLabel={t('candidate.settings.save')}
            />
          )}
        />
      </div>
    </ProfilePageContainer>
  )
}
