import { ReactComponent as AddIcon } from 'Assets/Icons/add-circle.svg'
import clsx from 'clsx'

interface IProps {
  label: string
  onClick: () => void
  className?: string
}

export const AddActionCard: React.FC<IProps> = ({
  label,
  onClick,
  className
}) => {
  return (
    <div
      className={clsx(
        'grid h-[16rem] w-[20rem] cursor-pointer rounded-md border border-dashed border-blue-ribbon p-4',
        className
      )}
      onClick={onClick}
    >
      <div className="grid justify-items-center gap-4">
        <AddIcon className="h-20 w-20" />
        <span className="font-bold text-blue-ribbon">{label}</span>
      </div>
    </div>
  )
}
