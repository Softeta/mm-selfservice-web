import { ReactNode } from 'react'
import {
  Autocomplete as MuiAutocomplete,
  AutocompleteProps,
  AutocompleteRenderInputParams
} from '@mui/material'
import { Input } from 'Components/Atoms'
import MenuItem from 'Components/Atoms/MenuItem'

export type TOption = {
  id?: string
  label: string
  code?: string
  obj?: React.ReactNode
}

interface IAutocomplete
  extends Omit<
    AutocompleteProps<TOption, boolean, boolean, boolean>,
    'renderInput' | 'options'
  > {
  options: TOption[]
  className?: string
  label?: string
  isError?: boolean
  renderInput?: (params: AutocompleteRenderInputParams) => ReactNode
}

const Autocomplete = ({
  options,
  className,
  label,
  isError,
  ...rest
}: IAutocomplete) => (
  <MuiAutocomplete
    className={`mm-autocomplete ${className ?? ''}`}
    options={options}
    renderInput={(params) => (
      <div ref={params.InputProps.ref}>
        <Input {...params.inputProps} label={label} isError={isError} />
      </div>
    )}
    getOptionLabel={(option) =>
      typeof option === 'string' ? option : option.label?.toString() || ''
    }
    renderOption={(props, option, state) =>
      !state.selected ? (
        <MenuItem {...props} id={option.id}>
          {option.obj || option.label || ''}
        </MenuItem>
      ) : null
    }
    isOptionEqualToValue={(option, value) =>
      !!(option.id && option.id === value.id)
    }
    includeInputInList={false}
    popupIcon={null}
    {...rest}
  />
)

export default Autocomplete
