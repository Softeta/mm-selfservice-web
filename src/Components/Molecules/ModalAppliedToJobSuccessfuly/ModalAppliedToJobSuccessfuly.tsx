import { ModalContainer } from 'Components/Atoms/ModalContainer'
import 'Extensions/date.extensions'
import { Button } from '../../Atoms/Button'
import { ReactComponent as CloseIcon } from 'Assets/Icons/close.svg'
import { useTranslation } from 'react-i18next'

interface IProps {
  visible: boolean
  onClick: () => void
  onCancel: () => void
}

export const ModalAppliedToJobSuccessfuly: React.FC<IProps> = ({
  visible,
  onClick,
  onCancel
}) => {
  const { t } = useTranslation()

  const headerClassName = "text-center text-lg font-bold text-mine-shaft p-4"
  const textClassName = "text-base text-center text-mine-shaft pb-4"
  return (
    <ModalContainer visible={visible} className="bg-spring-wood/95">
      <CloseIcon
        className='absolute top-20 right-7 text-spanish-gray cursor-pointer'
        onClick={(event) => {
          event.preventDefault()
          onCancel()
        }}
      />
      <span className={headerClassName}>{t('candidate.appliedSuccessfully.tilte')}</span>
      <div className={textClassName}>{t('candidate.appliedSuccessfully.text1')}</div>
      <div className={textClassName}>{t('candidate.appliedSuccessfully.text2')}</div>
      <div className="grid place-items-center">
        <Button
          text={t('candidate.appliedSuccessfully.button')}
          onClick={(event) => {
            event.preventDefault()
            onClick()
          }}
        />
      </div>
    </ModalContainer>
  )
}
