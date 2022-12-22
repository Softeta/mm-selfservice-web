import { useCandidateTests } from 'API/Calls/candidatesTests'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { CandidateTestResults } from 'Forms/Candidate/CandidateTestResults'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'Store/Slices/rootReducer'

export const TestResults = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const candidateId = useSelector<RootState, string>(
    (state) => state.candidateProfile.candidate!.id!
  )
  const { data, isLoading } = useCandidateTests(candidateId)
  const papiScores = data?.data.personalityAssessment?.scores
  const logicalScores = data?.data.logicalAssessment?.scores
  if (!papiScores && !logicalScores) {
    navigate('/myprofile/tests')
  }

  return (
    <ProfilePageContainer>
      <div className="grid gap-8 pt-16">
        <p className="text-2xl font-bold">{t('candidate.tests.header')}</p>
        <CandidateTestResults data={data} isLoading={isLoading} />
      </div>
    </ProfilePageContainer>
  )
}
