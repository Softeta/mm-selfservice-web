import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import WorkTypes from 'API/Types/Enums/workType'
import { WorkingHoursForm } from 'Components/Organisms/WorkingHoursForm'

export const Step21 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <WorkingHoursForm
        headerLabel={t('candidate.createProfile.workLoad.header')}
        onFormPostSubmit={(workTypes) => {
          if (workTypes.includes(WorkTypes.Permanent)) {
            navigate('/myprofile/profile-creation/step-22')
          } else if (workTypes.includes(WorkTypes.Freelance)) {
            navigate('/myprofile/profile-creation/step-23')
          } else {
            navigate('/myprofile/profile-creation/step-24')
          }
        }}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-20')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
