import { CircleButton } from 'Components/Atoms'
import { useTranslation } from 'react-i18next'

type IProps = {
  onButtonClick: () => void
}

export const JobAddCard = ({ onButtonClick }: IProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex w-96 h-96 rounded-md border border-blue-ribbon border-dashed">
      <div className="m-auto">
        <CircleButton
          extraClassName="w-16 h-16 m-auto hover:bg-bluebonnet"
          iconType="add"
          onClick={onButtonClick}
        />
        <p className="mt-5 text-sm font-semibold text-blue-ribbon">
          {t('jobAddCard.button.title')}
        </p>
      </div>
    </div>
  )
}
