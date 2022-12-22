import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BinaryDecisionSelection } from 'Components/Molecules/BinaryDecisionSelection'

export const Step15 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <BinaryDecisionSelection
      description={t('candidate.createProfile.midStepDesc2')}
      firstOptionLabel={t('button.next')}
      secondOptionLabel={t('button.goToDashboard')}
      onFirstOptionSelected={() =>
        navigate('/myprofile/profile-creation/step-16')
      }
      onSecondOptionSelected={() => navigate('/myprofile')}
    />
  )
}
