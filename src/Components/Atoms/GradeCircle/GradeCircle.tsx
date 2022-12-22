import clsx from 'clsx'

interface IProps {
  grade: string
  isActive: boolean
}

export const GradeCircle: React.FC<IProps> = ({ grade, isActive }) => {
  return (
    <div
      className={clsx(
        'grid h-7 w-7 items-center justify-items-center rounded-full',
        !isActive && 'bg-foggy-day text-early-evening',
        isActive && 'bg-blue-ribbon text-white'
      )}
    >
      <span className="text-base font-semibold">{grade}</span>
    </div>
  )
}
