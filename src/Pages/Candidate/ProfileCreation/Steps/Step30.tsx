import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { FreeTimeForm } from 'Components/Organisms/FreeTimeForm'

export const Step30 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <FreeTimeForm
        headerLabel={t('candidate.createProfile.hobbies.header')}
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-31')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-29')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
