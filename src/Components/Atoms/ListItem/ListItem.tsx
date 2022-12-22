import { ReactComponent as ArrowIcon } from 'Assets/ListItem/list-arrow-right.svg'
import clsx from 'clsx'

type ListItemProps = React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>

interface IProps extends ListItemProps {
  subtitle?: string
  onClick?: () => void
}

export const ListItem: React.FC<IProps> = ({
  value,
  subtitle,
  onClick,
  ...rest
}) => {
  return (
    <li
      className={clsx('grid grid-cols-1 gap-4', onClick && 'cursor-pointer')}
      onClick={onClick}
      {...rest}
    >
      <div className="flex space-x-4 font-poppins">
        <div className="grow">
          <p className="text-lg font-bold">{value}</p>
          {subtitle && <p className="text-base text-slate-400">{subtitle}</p>}
        </div>
        <div className="flex items-center">
          <ArrowIcon className="h-3.5 w-3.5" />
        </div>
      </div>
      <div>
        <hr className="border-dashed border-list-separator" />
      </div>
    </li>
  )
}
