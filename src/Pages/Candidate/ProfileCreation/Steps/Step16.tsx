import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ActionIntroduction } from 'Components/Molecules/ActionIntroduction'

export const Step16 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ActionIntroduction
      header={t('candidate.createProfile.competencesQuestion')}
      actionLabel={t('candidate.createProfile.button.addExperience')}
      onActionSelected={() => navigate('/myprofile/profile-creation/step-17')}
      onBackSelected={() => navigate('/myprofile/profile-creation/step-15')}
      onSkipSelected={() => navigate('/myprofile/profile-creation/step-20')}
    />
  )
}
