import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { IndustriesForm } from 'Components/Organisms/IndustriesForm'

export const Step17 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <IndustriesForm
        headerLabel={t('candidate.createProfile.industries.header')}
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-18')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-16')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
