import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import WorkTypes from 'API/Types/Enums/workType'
import { SalaryPermanentForm } from 'Components/Organisms/SalaryPermanentForm'

export const Step22 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <SalaryPermanentForm
        headerLabel={t('candidate.createProfile.money.setYourPriceFullTime')}
        onFormPostSubmit={(workTypes) => {
          if (workTypes.includes(WorkTypes.Freelance)) {
            navigate('/myprofile/profile-creation/step-23')
          } else {
            navigate('/myprofile/profile-creation/step-24')
          }
        }}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-21')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
