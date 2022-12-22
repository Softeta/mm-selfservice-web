import clsx from 'clsx'

interface IProps {
  visible: boolean
  children: React.ReactNode[] | React.ReactNode
  className?: string
}

export const ModalContainer: React.FC<IProps> = ({
  visible,
  children,
  className
}) => {
  return (
    <div
      className={clsx(
        'grid overflow-x-hidden overflow-y-auto fixed inset-x-0 top-0 z-[999999] content-center place-content-center w-full h-full font-poppins bg-nobel/75',
        !visible && 'hidden',
        className
      )}
    >
      {children}
    </div>
  )
}
