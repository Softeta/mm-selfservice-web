import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ActionIntroduction } from 'Components/Molecules/ActionIntroduction'

export const Step7 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ActionIntroduction
      header={t('candidate.createProfile.whereHaveYouWorked')}
      actionLabel={t('candidate.createProfile.addPreviousJobs')}
      onActionSelected={() => navigate('/myprofile/profile-creation/step-8')}
      onBackSelected={() => navigate('/myprofile/profile-creation/step-6')}
      onSkipSelected={() => navigate('/myprofile/profile-creation/step-11')}
    />
  )
}
