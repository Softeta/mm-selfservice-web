import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { SkillsForm } from 'Components/Organisms/SkillsForm'

export const Step18 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <SkillsForm
        headerLabel={t('candidate.createProfile.skills.header')}
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-19')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-17')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
