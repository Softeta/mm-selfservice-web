import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { LanguagesForm } from 'Components/Organisms/LanguagesForm'

export const Step19 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <LanguagesForm
        headerLabel={t('candidate.createProfile.languages.header')}
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-20')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-18')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
