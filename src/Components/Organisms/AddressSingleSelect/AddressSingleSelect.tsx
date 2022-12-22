import { FormControl } from '@mui/material'
import { useGeocoderSuggestions } from 'API/Calls/autocompleteGeocoder'
import { fetchLocation } from 'API/Calls/locations'
import { TAddress } from 'API/Types/address'
import { TGeocoderSuggestion } from 'API/Types/Geocoder/geocoder'
import clsx from 'clsx'
import Autocomplete from 'Components/Molecules/Autocomplete'
import { TOption } from 'Components/Molecules/Autocomplete/Autocomplete'
import { useDebounce } from 'Hooks/useDebounce'
import { SyntheticEvent, useEffect, useState } from 'react'
import { formatAddressLine } from './FormatAddressLine'

interface IProps {
  onItemSelect: (address?: TAddress) => void
  className?: string
  label?: string
  isError?: boolean
  selectedValue?: string
}

const AddressSingleSelect = ({
  onItemSelect,
  className,
  label,
  isError = false,
  selectedValue = ''
}: IProps) => {
  const [suggestions, setSuggestions] = useState<TGeocoderSuggestion[]>([])
  const [searchValue, setSearchValue] = useState<[string, boolean]>([
    selectedValue,
    true
  ])

  const debouncedSearchValue = useDebounce(searchValue)
  const { status, data, refetch } = useGeocoderSuggestions(searchValue[0])

  useEffect(() => {
    setSearchValue((prevState) => [selectedValue, prevState[1]])
  }, [selectedValue])

  useEffect(() => {
    if (status === 'success' && data.data?.suggestions) {
      const suggestionsResponse = data.data.suggestions.map(x => ({
        ...x,
        label: formatAddressLine(x)
      })) ?? [];
      setSuggestions(suggestionsResponse.filter((value, index, self) => 
       index === self.findIndex((t) => (t.label === value.label))));
    }
  }, [status, data])

  useEffect(() => {
    if (
      debouncedSearchValue[0] &&
      debouncedSearchValue[0].length >= 2 &&
      debouncedSearchValue[1]
    ) {
      refetch()
    } else {
      setSuggestions([])
    }
  }, [debouncedSearchValue, refetch])

  const handleItemSelectChanged = (value: TOption) => {
    setSuggestions([])

    if (!value?.id) {
      onItemSelect(undefined)
      return
    }

    const selectedSuggestion = suggestions.find(
      (x) => x.locationId === value.id
    )
    if (selectedSuggestion) {
      onItemSelect({
        addressLine: selectedSuggestion.label,
        country: selectedSuggestion.address.country,
        city: selectedSuggestion.address.city,
        postalCode: selectedSuggestion.address.postalCode
      })
    }
  }

  const handleItemSelectBlured = async (
    e?: React.FocusEvent<HTMLDivElement, Element>
  ) => {
    setSuggestions([])
    const currentValue = (e?.target as HTMLInputElement)?.value

    if (!searchValue[1]) return

    if (!currentValue) {
      onItemSelect(undefined)
    }

    if (currentValue && currentValue != selectedValue) {
      const locationResponse = await fetchLocation(currentValue)
      onItemSelect({
        addressLine: currentValue,
        country: locationResponse.data.country,
        city: locationResponse.data.city,
        postalCode: locationResponse.data.postalCode
      })
    }
  }

  const handleInputChange = (
    e: SyntheticEvent<Element, Event>,
    value: string
  ) => {
    if (e.type === 'change') {
      setSearchValue([value, true])
    } else {
      setSearchValue([value, false])
    }
  }

  return (
    <FormControl className={clsx('w-full', className)}>
      <Autocomplete
        label={label}
        isError={isError}
        onBlur={handleItemSelectBlured}
        onChange={(_, newValue) => handleItemSelectChanged(newValue as TOption)}
        inputValue={searchValue[0]}
        onInputChange={(e, newInputValue) =>
          handleInputChange(e, newInputValue)
        }
        options={suggestions.map((x) => ({
          id: x.locationId,
          label: x.label
        }))}
        filterOptions={(options) => options}
        freeSolo
        componentsProps={{
          paper: {
            sx: {
              width: 'fit-content'
            }
          }
        }}
      />
    </FormControl>
  )
}

export default AddressSingleSelect
