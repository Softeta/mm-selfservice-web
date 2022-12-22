import React from 'react'

export const Checkbox = React.forwardRef(
  (
    {
      name,
      label,
      className,
      ...rest
    }: React.InputHTMLAttributes<HTMLInputElement> & {
      label?: React.ReactNode
    },
    ref: React.ForwardedRef<HTMLInputElement>
  ) => (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={name}
        name={name}
        ref={ref}
        {...rest}
        className="mr-3 h-6 w-6"
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )
)

Checkbox.displayName = 'Checkbox'

export default Checkbox
