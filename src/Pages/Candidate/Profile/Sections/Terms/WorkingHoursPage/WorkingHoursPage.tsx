import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import WorkTypes from 'API/Types/Enums/workType'
import { WorkingHoursForm } from 'Components/Organisms/WorkingHoursForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const WorkingHoursPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <WorkingHoursForm
          headerLabel={t('candidate.profile.terms.workHours.header')}
          onFormPostSubmit={(workTypes) => {
            if (workTypes.includes(WorkTypes.Permanent)) {
              navigate('/myprofile/profile/terms/salary-permanent')
            } else if (workTypes.includes(WorkTypes.Freelance)) {
              navigate('/myprofile/profile/terms/salary-freelance')
            } else {
              navigate('/myprofile/profile')
            }
          }}
          controlsBuilder={(submitHandler, workTypes) => (
            <PrevNextMenu
              onBackBtnClick={() => navigate('/myprofile/profile/terms')}
              onSubmitBtnClick={submitHandler}
              continueButtonLabel={
                workTypes.includes(WorkTypes.Permanent) ||
                workTypes.includes(WorkTypes.Freelance)
                  ? t('button.next')
                  : t('candidate.settings.save')
              }
            />
          )}
        />
      </div>
    </ProfilePageContainer>
  )
}
