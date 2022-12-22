import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { DescriptionForm } from 'Components/Organisms/DescriptionForm'
import { useTranslation } from 'react-i18next'

export const Step29 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <DescriptionForm
        headerLabel={t(
          'candidate.createProfile.bioAndCurriculumVitae.headerTitle'
        )}
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-30')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-28')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
