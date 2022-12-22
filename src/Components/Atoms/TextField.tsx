import MuiTextField from '@mui/material/TextField'
import type { TextFieldProps } from '@mui/material'
import { forwardRef, Ref, useState } from 'react'
import clsx from 'clsx'

const TextFieldComponent = (
  { className, ...props }: TextFieldProps,
  ref: Ref<HTMLDivElement>
) => {
  const [isDirty, setIsDirty] = useState<boolean>(false)

  const handleOnBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>
  ) => {
    setIsDirty(true)

    if (props.onBlur) {
      props.onBlur(event)
    }
  }

  return (
    <MuiTextField
      ref={ref}
      error={props.required && !props.value && isDirty}
      className={clsx(
        'px-3 w-full h-12 font-poppins text-base font-normal placeholder:text-nobel rounded-md focus:outline-none appearance-none',
        props.disabled
          ? 'text-nobel bg-satin-linen'
          : 'text-mine-shaft bg-white',
        !!props.label && 'mt-2',
        className
      )}
      {...props}
      onBlur={handleOnBlur}
    />
  )
}

export const TextField = forwardRef(TextFieldComponent)
