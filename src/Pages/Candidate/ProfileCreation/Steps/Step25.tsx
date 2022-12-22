import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { CandidateTestForm } from 'Forms/Candidate/CandidateTestForm'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const Step25 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div className="grid gap-8 pt-16">
      <p className="text-2xl font-bold">{t('candidate.tests.header')}</p>
      <CandidateTestForm />
      <PrevNextMenu
        onBackBtnClick={() => navigate('/myprofile/profile-creation/step-24')}
        onSkipBtnClick={() => navigate('/myprofile/profile-creation/step-26')}
        bottomPositionClassName="bottom-settings-only-menu"
      />
    </div>
  )
}
