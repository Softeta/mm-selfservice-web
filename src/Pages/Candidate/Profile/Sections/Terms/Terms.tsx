import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { WorkTypeForm } from 'Components/Organisms/WorkTypeForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const Terms = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        <WorkTypeForm
          headerLabel={t('candidate.profile.terms.workTypes.header')}
          onFormPostSubmit={() =>
            navigate('/myprofile/profile/terms/working-hours')
          }
          controlsBuilder={(submitHandler) => (
            <PrevNextMenu
              onBackBtnClick={() => navigate('/myprofile/profile')}
              onSubmitBtnClick={submitHandler}
            />
          )}
        />
      </div>
    </ProfilePageContainer>
  )
}
