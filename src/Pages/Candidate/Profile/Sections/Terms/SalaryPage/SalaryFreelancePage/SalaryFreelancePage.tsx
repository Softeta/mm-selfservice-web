import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ActivityStatus from 'API/Types/Enums/activityStatus'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { SalaryFreelanceForm } from 'Components/Organisms/SalaryFreelanceForm'

export const SalaryFreelancePage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <SalaryFreelanceForm
          headerLabel={t('candidate.profile.terms.salaryFreelance.header')}
          onFormPostSubmit={() => navigate('/myprofile/profile')}
          controlsBuilder={(submitHandler, activityStatuses) => (
            <PrevNextMenu
              onBackBtnClick={() => {
                const isPermanent = activityStatuses?.includes(
                  ActivityStatus.Permanent
                )

                if (isPermanent) {
                  navigate('/myprofile/profile/terms/salary-permanent')
                } else {
                  navigate('/myprofile/profile/terms/working-hours')
                }
              }}
              onSubmitBtnClick={submitHandler}
              continueButtonLabel={t('candidate.settings.save')}
            />
          )}
        />
      </div>
    </ProfilePageContainer>
  )
}
