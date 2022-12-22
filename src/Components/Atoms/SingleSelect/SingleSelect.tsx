import { forwardRef } from 'react'
import clsx from 'clsx'
import { ReactComponent as Icon } from 'Assets/Icons/tick.svg'

type TSingleSelect = {
  variant?: 'big' | 'small'
  label?: string
  value?: number | string
  name: string
  isError?: boolean
  inputType: 'radio' | 'checkbox'
} & React.InputHTMLAttributes<HTMLInputElement>

export const SingleSelect = forwardRef(
  (
    {
      variant = 'big',
      label = '',
      id,
      checked,
      inputType = 'radio',
      isError,
      ...rest
    }: TSingleSelect,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    const big = variant === 'big'
    return (
      <div
        className={clsx(
          'relative mb-3 flex w-full items-center justify-end rounded-md border',
          big && 'h-[6rem] pr-7 text-lg font-bold',
          !big && 'h-[4rem] pr-5',
          checked && 'bg-blue-ribbon text-white',
          !checked && 'border-spanish-gray text-nobel',
          isError && 'border-red'
        )}
      >
        <label htmlFor={id} className="absolute inset-0 flex items-center p-7">
          {label}
        </label>
        <input type={inputType} ref={ref} {...rest} id={id} className="-z-10" />
        <div
          className={clsx(
            'flex items-center justify-center rounded-full border',
            big && 'h-[3rem] w-[3rem]',
            !big && 'h-[2rem] w-[2rem]',
            checked && 'bg-white',
            !checked && ' border-spanish-gray'
          )}
        >
          {checked && <Icon className={clsx(!big && 'w-2')} />}
        </div>
      </div>
    )
  }
)

SingleSelect.displayName = 'SingleSelect'
