import { Trans, useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { BinaryDecisionSelection } from 'Components/Molecules/BinaryDecisionSelection'

export const Step24 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <BinaryDecisionSelection
      description={
        <Trans
          i18nKey="candidate.createProfile.test.takeExplanation"
          components={[<br key={0} />]}
        />
      }
      firstOptionLabel={t('candidate.createProfile.test.takeAction')}
      secondOptionLabel={t('button.goToDashboard')}
      onFirstOptionSelected={() =>
        navigate('/myprofile/profile-creation/step-25')
      }
      onSecondOptionSelected={() => navigate('/myprofile')}
    />
  )
}
