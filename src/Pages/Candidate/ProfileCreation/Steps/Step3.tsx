import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import ActivityStatus from 'API/Types/Enums/activityStatus'
import { useNavigate } from 'react-router-dom'
import { WorkTypeForm } from 'Components/Organisms/WorkTypeForm'

export const Step3 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <WorkTypeForm
        headerLabel={t('candidate.createProfile.preferableJobType.title')}
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-4')}
        controlsBuilder={(submitHandler, activityStatuses) => (
          <PrevNextMenu
            onBackBtnClick={() => {
              const isPermanent = activityStatuses?.includes(
                ActivityStatus.Permanent
              )
              const isFreelancer = activityStatuses?.includes(
                ActivityStatus.Freelancer
              )

              if (!isFreelancer && !isPermanent) {
                navigate('/myprofile/profile-creation/step-1')
              } else {
                navigate('/myprofile/profile-creation/step-2')
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
