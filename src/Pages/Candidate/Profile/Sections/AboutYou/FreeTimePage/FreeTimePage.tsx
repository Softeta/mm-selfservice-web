import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FreeTimeForm } from 'Components/Organisms/FreeTimeForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const FreeTimePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <FreeTimeForm
          headerLabel={t('candidate.profile.aboutYou.freeTime.header')}
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
