import { TCandidate } from 'API/Types/Candidate/candidateGet'
import { CandidateProfileCard } from 'Components/Molecules/CandidateProfileCard'
import { useTranslation } from 'react-i18next'

interface IProps {
  candidate: TCandidate
  children: React.ReactNode | React.ReactNode[]
  onBackClicked: () => void
}

export const CandidateInfoContainer: React.FC<IProps> = ({
  candidate,
  children,
  onBackClicked
}) => {
  const { t } = useTranslation()

  return (
    <div className="grid md:flex">
      <div className="relative">
        <div
          className="absolute top-4 right-4 z-50 block cursor-pointer bg-mine-shaft/80 p-2 md:hidden"
          onClick={onBackClicked}
        >
          <span className="font-bold text-white">
            {t('company.shortlist.backActionLabel')}
          </span>
        </div>
        <CandidateProfileCard
          name={candidate.fullName ?? ''}
          imageUrl={candidate.picture?.uri}
          positionTitle={candidate.currentPosition?.code}
          dimensionsClassName="h-96 md:h-[60rem] w-full md:w-[48rem]"
        />
      </div>
      <div className="relative w-full">
        <div className="absolute top-4 right-12 hidden md:block">
          <span
            className="cursor-pointer font-bold text-blue-ribbon"
            onClick={onBackClicked}
          >
            {t('company.shortlist.backActionLabel')}
          </span>
        </div>
        <div className="p-6 md:p-12">{children}</div>
      </div>
    </div>
  )
}
