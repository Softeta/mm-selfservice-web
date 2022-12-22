import clsx from 'clsx'
import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import { v4 } from 'uuid'

export type TextAreaProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

interface IProps extends TextAreaProps {
  isMobile?: boolean
  label?: string
  isError?: boolean
  sizeClassName?: string
}

const DEFAULT_MAX_CHARACTERS_MOBILE = 150
const DEFAULT_MAX_CHARACTERS_DESKTOP = 3500

const TextAreaComponent = (
  {
    label,
    isMobile = false,
    isError,
    maxLength,
    className,
    disabled,
    sizeClassName,
    ...textAreaProps
  }: IProps,
  ref: React.ForwardedRef<HTMLTextAreaElement>
) => {
  const { t } = useTranslation()
  const id = v4()

  if (!maxLength) {
    maxLength = isMobile
      ? DEFAULT_MAX_CHARACTERS_MOBILE
      : DEFAULT_MAX_CHARACTERS_DESKTOP
  }

  return (
    <div className={className}>
      {label && (
        <label
          className="font-poppins text-base font-semibold text-mine-shaft"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        maxLength={maxLength}
        className={clsx(
          'w-full resize-none appearance-none rounded-md py-4 px-3 font-poppins text-base font-normal placeholder:text-nobel focus:outline-none',
          disabled ? 'bg-satin-linen text-nobel' : 'bg-white text-mine-shaft',
          !!label && 'mt-2',
          isError && 'border border-sunset-orange text-sunset-orange',
          !sizeClassName && 'h-36',
          sizeClassName
        )}
        {...textAreaProps}
      />
      {isMobile && (
        <span className="flex h-8 items-center justify-start text-nobel">
          {t('textArea.maxLength', { maxLength })}
        </span>
      )}
    </div>
  )
}

export const TextArea = forwardRef(TextAreaComponent)
