import { FormControl } from '@mui/material'
import { needRefecth, useCompanies } from 'API/Calls/companies'
import { fetchLocation } from 'API/Calls/locations'
import { TCompanySearch } from 'API/Types/Company/companySearchGet'
import clsx from 'clsx'
import Autocomplete from 'Components/Molecules/Autocomplete/Autocomplete'
import { TOption } from 'Components/Molecules/Autocomplete/Autocomplete'
import { useEffect, useMemo, useState } from 'react'
import { toOptions, toOption, buildAddress } from './helpers'

interface IProps {
  selectedItem: TCompanySearch | null
  onCompanySelect: (company: TCompanySearch | null) => void
  onBlur: (value: string) => void
  className?: string
  label?: string
  isError?: boolean
}

const CompanySingleSelect = ({
  selectedItem,
  onCompanySelect,
  onBlur,
  className = '',
  label = 'Company',
  isError = false
}: IProps) => {
  const [searchInput, setSearchInput] = useState<string>('')
  const [companies, setCompanies] = useState<TCompanySearch[]>([])

  const { data, refetch } = useCompanies(searchInput)

  const options = useMemo(() => toOptions(companies), [companies])

  const value = useMemo(
    () => (selectedItem ? toOption(selectedItem) : null),
    [selectedItem]
  )

  const handleItemSelect = async (item: TOption) => {
    if (!item) {
      onCompanySelect(null)
      return
    }

    if (!item?.code) return
    const company = companies?.find((c) => c.registrationNumber === item.code)

    if (!company) return
    const address = await fetchLocation(buildAddress(company.address))
    onCompanySelect({
      ...company,
      address: {
        ...company.address || {
          addressLine: ''
        },
        postalCode: address.data.postalCode,
        city: address.data.city
      }
    })
  }

  useEffect(() => {
    if (needRefecth(searchInput)) refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  useEffect(() => {
    if (data?.data?.data) setCompanies(data?.data?.data)
  }, [data?.data])

  return (
    <FormControl className={clsx('w-full', className)}>
      <Autocomplete
        isError={isError}
        className={className}
        label={label}
        options={options}
        inputValue={searchInput}
        value={value}
        onBlur={() => onBlur(searchInput)}
        onChange={(_, newInputvalue) =>
          handleItemSelect(newInputvalue as TOption)
        }
        onInputChange={(_, newInputValue) => setSearchInput(newInputValue)}
        filterOptions={(ops) => ops}
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

export default CompanySingleSelect
