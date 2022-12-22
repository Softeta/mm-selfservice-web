import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BinaryDecisionSelection } from 'Components/Molecules/BinaryDecisionSelection'

export const Step26 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <BinaryDecisionSelection
      description={
        <Trans
          i18nKey="candidate.createProfile.photo.stepDescription"
          components={[<br key={0} />]}
        />
      }
      firstOptionLabel={t('button.next')}
      secondOptionLabel={t('button.goToDashboard')}
      onFirstOptionSelected={() =>
        navigate('/myprofile/profile-creation/step-27')
      }
      onSecondOptionSelected={() => navigate('/myprofile')}
    />
  )
}
