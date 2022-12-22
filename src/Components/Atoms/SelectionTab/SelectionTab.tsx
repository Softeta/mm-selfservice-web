import clsx from 'clsx'
import { DetailedHTMLProps, forwardRef, LiHTMLAttributes } from 'react'

export type SelectionTabProps = DetailedHTMLProps<
  LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>

export interface IProps extends SelectionTabProps {
  orientation: 'left' | 'middle' | 'right'
  isSelected: boolean
  isError?: boolean
}

const SelectionTabComponent = (
  { value, orientation, isSelected, ...rest }: IProps,
  ref: React.ForwardedRef<HTMLLIElement>
) => {
  return (
    <li className="w-full" ref={ref} {...rest}>
      <span
        className={clsx(
          'inline-block w-full cursor-pointer p-3',
          isSelected &&
            'bg-selection-tab-active font-semibold text-selection-tab-active',
          !isSelected && 'text-selection-tab-normal',
          orientation == 'left' && 'rounded-l-lg',
          orientation == 'right' && 'rounded-r-lg'
        )}
      >
        {value}
      </span>
    </li>
  )
}

export const SelectionTab = forwardRef(SelectionTabComponent)
