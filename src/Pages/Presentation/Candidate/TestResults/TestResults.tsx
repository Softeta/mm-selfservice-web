import { useCandidateTests } from 'API/Calls/candidatesTests'
import CandidateJobContext from 'Contexts/CandidateJob/CandidateJobContext'
import { CandidateTestResults } from 'Forms/Candidate/CandidateTestResults'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'

export const TestResults = () => {
  const location = useLocation()
  const isBackOfficeVisitor = location.pathname.startsWith('/back-office')

  const jobCandidate = useContext(CandidateJobContext)!
  const candidate = jobCandidate.candidate
  const { data, isLoading } = useCandidateTests(candidate.id)

  return (
    <CandidateTestResults
      data={data}
      isLoading={isLoading}
      isBackOfficeUser={isBackOfficeVisitor}
    />
  )
}
