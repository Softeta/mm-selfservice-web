import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { EducationForm } from 'Components/Organisms/EducationForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const SaveEducationPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <EducationForm
          onFormPostSubmit={() =>
            navigate('/myprofile/profile/experience/education')
          }
          controlsBuilder={(submitHandler) => (
            <PrevNextMenu
              onBackBtnClick={() =>
                navigate('/myprofile/profile/experience/education')
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
