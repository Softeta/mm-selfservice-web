import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import WorkTypes from 'API/Types/Enums/workType'
import { SalaryPermanentForm } from 'Components/Organisms/SalaryPermanentForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const SalaryPermanentPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full max-w-candidate-profile-form pt-16">
        <SalaryPermanentForm
          headerLabel={t('candidate.profile.terms.salaryPermament.header')}
          onFormPostSubmit={(workTypes) => {
            if (workTypes.includes(WorkTypes.Freelance)) {
              navigate('/myprofile/profile/terms/salary-freelance')
            } else {
              navigate('/myprofile/profile')
            }
          }}
          controlsBuilder={(submitHandler, workTypes) => (
            <PrevNextMenu
              onBackBtnClick={() =>
                navigate('/myprofile/profile/terms/working-hours')
              }
              onSubmitBtnClick={submitHandler}
              continueButtonLabel={
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
