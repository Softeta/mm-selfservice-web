import clsx from 'clsx'
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import { v4 } from 'uuid'

export type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>

export interface IProps extends InputProps {
  label?: string
  isError?: boolean
  containerClassName?: string
  RightElement?: JSX.Element | React.ReactNode
  children?: React.ReactNode
  marginClassName?: string
  widthClassName?: string
}

const InputComponent = (
  {
    label,
    isError,
    disabled,
    className,
    containerClassName,
    RightElement,
    children,
    marginClassName = 'mb-6',
    widthClassName = 'w-full',
    ...inputProps
  }: IProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const id = v4()

  return (
    <div className={clsx(marginClassName, containerClassName)}>
      {label && (
        <label
          className="font-poppins text-base font-semibold text-mine-shaft"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          id={id}
          ref={ref}
          className={clsx(
            'h-12 appearance-none rounded-md px-3 font-poppins text-base font-normal placeholder:text-nobel focus:outline-none',
            disabled ? 'bg-satin-linen text-nobel' : 'bg-white text-mine-shaft',
            !!label && 'mt-2',
            isError && 'border border-sunset-orange text-sunset-orange',
            className,
            widthClassName
          )}
          disabled={disabled}
          {...inputProps}
        />
        {RightElement}
      </div>
      {children}
    </div>
  )
}

export const Input = forwardRef(InputComponent)
