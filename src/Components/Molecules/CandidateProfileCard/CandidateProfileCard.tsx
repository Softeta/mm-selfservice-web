import clsx from 'clsx'
import { TitleBox } from '../../Atoms/TitleBox'

interface IProps {
  imageUrl?: string
  name: string
  positionTitle?: string
  dimensionsClassName?: string
}

export const CandidateProfileCard: React.FC<IProps> = ({
  imageUrl,
  name,
  positionTitle,
  dimensionsClassName = 'h-96 w-80'
}) => {
  return (
    <div className="relative overflow-hidden">
      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={clsx(
          'absolute h-full w-full bg-cover blur-3xl',
          dimensionsClassName
        )}
      />

      <div
        style={{ backgroundImage: `url(${imageUrl})` }}
        className={clsx(
          'relative bg-contain bg-center bg-no-repeat',
          dimensionsClassName
        )}
      >
        <div className="absolute bottom-0 w-full">
          <TitleBox title={name} subtitle={positionTitle} />
        </div>
      </div>
    </div>
  )
}
