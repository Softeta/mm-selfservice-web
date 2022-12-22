import { SingularDecisionSelection } from 'Components/Molecules/SingularDecisionSelection'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const Step31 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <SingularDecisionSelection
      header={t('candidate.createProfile.profileComplete.header')}
      description={t('candidate.createProfile.profileComplete.description')}
      actionLabel={t('candidate.createProfile.profileComplete.goToDashboard')}
      onOptionSelected={() => navigate('/myprofile')}
      onBackSelected={() => navigate('/myprofile/profile-creation/step-30')}
    />
  )
}
