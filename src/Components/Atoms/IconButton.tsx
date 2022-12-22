import { ReactComponent as EditIcon } from 'Assets/Icons/edit.svg'
import { ReactComponent as TrashIcon } from 'Assets/Icons/trash.svg'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

interface IProps extends ButtonProps {
  buttonType: 'edit' | 'delete' | 'custom'
  Icon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  label?: string
}

export const IconButton: React.FC<IProps> = ({
  buttonType,
  Icon,
  label,
  className,
  ...rest
}) => {
  const { t } = useTranslation()

  if (buttonType === 'edit') {
    label = t('iconButton.edit')
    Icon = EditIcon
  } else if (buttonType === 'delete') {
    label = t('iconButton.delete')
    Icon = TrashIcon
  }

  return (
    <button
      className={clsx(
        'flex flex-row text-base font-medium text-blue-ribbon',
        className
      )}
      {...rest}
    >
      {Icon && <Icon />}
      <span className="ml-1">{label}</span>
    </button>
  )
}
