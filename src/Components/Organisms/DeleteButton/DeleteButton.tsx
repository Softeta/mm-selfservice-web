import { Button } from 'Components/Atoms'
import { ModalConfirmation } from 'Components/Molecules/ModalConfirmation'
import { useState } from 'react'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

interface IProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'disabled' | 'custom'
  size?: 'small' | 'medium' | 'large'
  mode?: 'light' | 'dark'
  extraClassName?: string
  isLoading?: boolean
  buttonLabel: string
  confirmHeader: string
  confirmLabel: string
  cancelLabel: string
  onDeleteConfirm: () => void
}

export const DeleteButton: React.FC<IProps> = ({
  variant = 'primary',
  size = 'large',
  mode = 'light',
  disabled,
  className,
  extraClassName,
  isLoading,
  buttonLabel,
  confirmHeader,
  confirmLabel,
  cancelLabel,
  onDeleteConfirm,
  ...rest
}) => {
  variant = disabled ? 'disabled' : variant

  const [visible, setVisible] = useState(false)

  const processConfirm = () => {
    setVisible(false)
    onDeleteConfirm()
  }

  const processCancel = () => {
    setVisible(false)
  }

  const processClick = () => {
    setVisible(true)
  }

  return (
    <>
      <ModalConfirmation
        title={confirmHeader}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        visible={visible}
        onConfirm={processConfirm}
        onCancel={processCancel}
      />
      <Button
        text={buttonLabel}
        variant={variant}
        size={size}
        mode={mode}
        disabled={disabled}
        className={className}
        extraClassName={extraClassName}
        isLoading={isLoading}
        onClick={(event) => {
          event.preventDefault()
          processClick()
        }}
        {...rest}
      />
    </>
  )
}
