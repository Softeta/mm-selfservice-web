import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ActivityStatus from 'API/Types/Enums/activityStatus'
import { SalaryFreelanceForm } from 'Components/Organisms/SalaryFreelanceForm'

export const Step23 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <SalaryFreelanceForm
        headerLabel={t('candidate.createProfile.money.setYourPriceFreelancer')}
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-24')}
        controlsBuilder={(submitHandler, activityStatuses) => (
          <PrevNextMenu
            onBackBtnClick={() => {
              const isPermanent = activityStatuses?.includes(
                ActivityStatus.Permanent
              )

              if (isPermanent) {
                navigate('/myprofile/profile-creation/step-22')
              } else {
                navigate('/myprofile/profile-creation/step-21')
              }
            }}
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
