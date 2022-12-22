import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BinaryDecisionSelection } from 'Components/Molecules/BinaryDecisionSelection'

export const Step20 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <BinaryDecisionSelection
      description={t('candidate.createProfile.midStepDesc3')}
      firstOptionLabel={t('button.next')}
      secondOptionLabel={t('button.goToDashboard')}
      onFirstOptionSelected={() =>
        navigate('/myprofile/profile-creation/step-21')
      }
      onSecondOptionSelected={() => navigate('/myprofile')}
    />
  )
}
