import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BinaryDecisionSelection } from 'Components/Molecules/BinaryDecisionSelection'

export const Step6 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <BinaryDecisionSelection
      description={t('candidate.createProfile.midstepDesc1')}
      firstOptionLabel={t('button.next')}
      secondOptionLabel={t('button.goToDashboard')}
      onFirstOptionSelected={() =>
        navigate('/myprofile/profile-creation/step-7')
      }
      onSecondOptionSelected={() => navigate('/myprofile')}
    />
  )
}
