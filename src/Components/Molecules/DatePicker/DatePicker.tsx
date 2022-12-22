import {
  DatePicker as MuiDatePicker,
  DatePickerProps
} from '@mui/x-date-pickers/DatePicker'
import { Input } from 'Components/Atoms/Input'
import { forwardRef, Ref } from 'react'
import clsx from 'clsx'
import DateFormats from 'API/Types/Enums/dateFormats'

// eslint-disable-next-line react/display-name
export const DatePicker = forwardRef(
  (
    props: Omit<DatePickerProps<Date, Date>, 'renderInput'> & {
      isError?: boolean
    },
    ref: Ref<HTMLDivElement>
  ) => (
    <MuiDatePicker
      ref={ref}
      renderInput={({ inputRef, inputProps, InputProps }) => (
        <Input
          ref={inputRef}
          {...inputProps}
          RightElement={InputProps!.endAdornment}
          className={clsx(
            props.isError && 'text-sunset-orange border border-sunset-orange'
          )}
        />
      )}
      inputFormat={DateFormats.DateInputField}
      mask="__-__-____"
      {...props}
    />
  )
)
export default DatePicker
