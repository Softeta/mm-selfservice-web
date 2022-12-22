import { ModalContainer } from 'Components/Atoms/ModalContainer'
import 'Extensions/date.extensions'
import { Button } from '../../Atoms/Button'

interface IProps {
  title: string
  confirmLabel: string
  cancelLabel: string
  visible: boolean
  onConfirm: () => void
  onCancel: () => void
}

export const ModalConfirmation: React.FC<IProps> = ({
  title,
  confirmLabel,
  cancelLabel,
  visible,
  onConfirm,
  onCancel
}) => {
  return (
    <ModalContainer visible={visible}>
      <span className="text-center text-lg font-bold">{title}</span>
      <div className="h-8"></div>
      <div className="grid place-items-center">
        <Button
          text={confirmLabel}
          onClick={(event) => {
            event.preventDefault()
            onConfirm()
          }}
        />
        <div className="h-3"></div>
        <Button
          text={cancelLabel}
          variant="custom"
          onClick={(event) => {
            event.preventDefault()
            onCancel()
          }}
          className="border-2 border-cathedral bg-spring-wood text-cathedral"
        />
      </div>
    </ModalContainer>
  )
}
