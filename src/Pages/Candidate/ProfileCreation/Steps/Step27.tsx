import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ActionIntroduction } from 'Components/Molecules/ActionIntroduction'

export const Step27 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ActionIntroduction
      header={t('candidate.createProfile.photo.header')}
      actionLabel={t('candidate.createProfile.photo.uploadAction')}
      onActionSelected={() => navigate('/myprofile/profile-creation/step-28')}
      onBackSelected={() => navigate('/myprofile/profile-creation/step-26')}
      onSkipSelected={() => navigate('/myprofile/profile-creation/step-29')}
    />
  )
}
