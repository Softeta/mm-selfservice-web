import { useTranslation } from 'react-i18next'
import { CandidateTestForm } from 'Forms/Candidate/CandidateTestForm'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const Tests = () => {
  const { t } = useTranslation()

  return (
    <ProfilePageContainer>
      <div className="grid  w-full gap-8 pt-16 pb-4">
        <p className="text-2xl font-bold">{t('candidate.tests.header')}</p>
        <CandidateTestForm />
      </div>
    </ProfilePageContainer>
  )
}
