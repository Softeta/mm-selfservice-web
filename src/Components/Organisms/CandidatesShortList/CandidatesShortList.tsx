import { TShortlistCandidate } from 'API/Types/Jobs/shortlistGet'
import { CandidateCard } from 'Components/Molecules/CandidateCard'

interface IProps {
  candidates: TShortlistCandidate[]
  onCandidateClick: (candidate: TShortlistCandidate) => void
}

export const CandidatesShortList: React.FC<IProps> = ({
  candidates,
  onCandidateClick
}) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {candidates.map((candidate) => (
        <div key={candidate.id} onClick={() => onCandidateClick(candidate)}>
          <CandidateCard
            imageUrl={candidate.picture?.uri}
            name={`${candidate.firstName} ${candidate.lastName}`}
            positionTitle={candidate.position?.code}
            rank={candidate.ranking}
          />
        </div>
      ))}
    </div>
  )
}
