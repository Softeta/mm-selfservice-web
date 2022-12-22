import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ActionIntroduction } from 'Components/Molecules/ActionIntroduction'

export const Step11 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ActionIntroduction
      header={t('candidate.createProfile.educationTitle')}
      actionLabel={t('candidate.createProfile.addEducation')}
      onActionSelected={() => navigate('/myprofile/profile-creation/step-12')}
      onBackSelected={() => navigate('/myprofile/profile-creation/step-9')}
      onSkipSelected={() => navigate('/myprofile/profile-creation/step-15')}
    />
  )
}
