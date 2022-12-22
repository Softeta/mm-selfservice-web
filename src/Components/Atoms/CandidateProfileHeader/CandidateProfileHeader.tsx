import 'Extensions/date.extensions'
import { useTranslation } from 'react-i18next'
import { ImageBox } from '../ImageBox'
import { ReactComponent as EditIcon } from 'Assets/Icons/edit-profile-picture.svg'

interface IProps {
  photoUrl?: string
  name: string
  position?: string
  onEditPhoto: () => void
}

export const CandidateProfileHeader: React.FC<IProps> = ({
  photoUrl,
  name,
  position,
  onEditPhoto
}) => {
  const { t } = useTranslation()

  return (
    <div className="relative grid h-96 place-items-center rounded-b-3xl bg-white">
      <div className="grid justify-items-center">
        <div className="absolute right-8 top-32">
          <div
            className="flex cursor-pointer items-center gap-2"
            onClick={onEditPhoto}
          >
            <EditIcon />
            <span className="text-base font-medium text-blue-ribbon">
              {t('iconButton.edit')}
            </span>
          </div>
        </div>
        <div className="rounded-full">
          <ImageBox
            url={photoUrl}
            roundingClassName="rounded-full"
            showEmptyImageBox={true}
          />
        </div>
        <div className="h-4"></div>
        <span className="text-lg font-bold">{name}</span>
        <div className="h-2"></div>
        <span className="text-base">{position}</span>
      </div>
    </div>
  )
}
