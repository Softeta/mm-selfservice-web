import { RankBox } from '../../Atoms/RankBox'
import { TitleBox } from '../../Atoms/TitleBox'

interface IProps {
  imageUrl?: string
  name: string
  positionTitle?: string
  rank: number
}

export const CandidateCard: React.FC<IProps> = ({
  imageUrl,
  name,
  positionTitle,
  rank
}) => {
  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className="relative h-[24rem] bg-cover bg-center xl:h-[30rem]"
    >
      <div className="absolute top-0 right-0 p-2">
        <RankBox rank={rank} />
      </div>
      <div className="absolute bottom-0 w-full">
        <TitleBox title={name} subtitle={positionTitle} />
      </div>
    </div>
  )
}
