import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SkillsForm } from 'Components/Organisms/SkillsForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const SkillsPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <SkillsForm
          headerLabel={t('candidate.profile.qualifications.skills.header')}
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
