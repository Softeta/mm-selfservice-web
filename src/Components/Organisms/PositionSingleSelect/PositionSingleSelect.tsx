import { CircularProgress, FormControl } from '@mui/material'
import { addJobPosition, useJobPositions } from 'API/Calls/jobPositions'
import { TPosition } from 'API/Types/position'
import clsx from 'clsx'
import Autocomplete from 'Components/Molecules/Autocomplete/Autocomplete'
import { TOption } from 'Components/Molecules/Autocomplete/Autocomplete'
import { SyntheticEvent, useEffect, useMemo, useState } from 'react'
import {
  optionToPosition,
  positionsToOptions,
  positionToOption
} from './helpers'
import { useMutation } from 'react-query'
import { useDebounce } from 'Hooks/useDebounce'
import { useTranslation } from 'react-i18next'

interface IProps {
  selectedItem: TPosition | null
  onItemSelect: (position: TPosition | null) => void
  className?: string
  label?: string
  isError?: boolean
}

type TValue = TOption | null

const PositionSingleSelect = ({
  selectedItem: selectedItemProp,
  onItemSelect,
  className = '',
  label = 'Position',
  isError = false
}: IProps) => {
  const { t } = useTranslation()

  const [searchInput, setSearchInput] = useState<[string, boolean]>(['', false])
  const [selectedItem, setSelectedItem] = useState<TPosition | null>(
    selectedItemProp
  )
  const [isLoading, setIsLoading] = useState(false)
  const [positions, setPositions] = useState<TPosition[]>([])
  const { data, refetch } = useJobPositions(searchInput[0])
  const debouncedSearchValue = useDebounce(searchInput)

  const { mutateAsync } = useMutation(
    async (position: string) => await addJobPosition(position)
  )

  const value = useMemo(
    () => (selectedItem ? positionToOption(selectedItem) : null),
    [selectedItem]
  )

  const showCreateOption = useMemo(() => {
    const searchValue = searchInput[0].trim()
    return (
      searchValue.length > 1 &&
      selectedItem?.code !== searchValue &&
      !positions.find(
        (position) => position.code.toLowerCase() === searchValue.toLowerCase()
      )
    )
  }, [searchInput, selectedItem, positions])

  const options = useMemo(() => {
    const positionOptions = positionsToOptions(positions)
    return !showCreateOption
      ? positionOptions
      : [
          ...positionOptions,
          {
            code: searchInput[0],
            label: searchInput[0],
            obj: (
              <div>
                <span className="mb-2 pr-2 text-2xs font-normal">
                  {t('positionSingleSelect.add')}
                </span>
                {searchInput[0]}
              </div>
            )
          }
        ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showCreateOption, positions, searchInput])

  const handleInputChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: string
  ) => {
    if (
      selectedItem &&
      selectedItem.code.toLowerCase() !== newValue.trim().toLowerCase()
    ) {
      setSelectedItem(null)
    }

    if (event?.type === 'change') {
      setSearchInput([newValue, true])
    } else {
      setSearchInput([newValue, false])
      setIsLoading(false)
      return
    }

    if (newValue.length > 1) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }

  const handleItemCreate = async (item: TValue) => {
    if (!item || !item.code) return
    const response = await mutateAsync(searchInput[0])
    setSelectedItem(response.data)
    onItemSelect(response.data)
  }

  const handleItemSelect = async (item: TValue) => {
    setSearchInput([searchInput[0], false])
    if (!item?.id) {
      await handleItemCreate(item)
      return
    }

    const position = item ? optionToPosition(item) : null
    setSelectedItem(position)
    onItemSelect(position)
  }

  const handleBlur = () => {
    if (!selectedItem || !searchInput[0]) return
    if (selectedItem.code !== searchInput[0])
      setSearchInput([selectedItem?.code || '', false])
  }

  useEffect(() => {
    if (data?.data?.data) setPositions(data?.data?.data)
  }, [data?.data])

  useEffect(() => {
    if (debouncedSearchValue[0].length > 1 && debouncedSearchValue[1]) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue])

  useEffect(() => {
    setIsLoading(false)
  }, [positions])

  return (
    <FormControl className={clsx('w-full', className)}>
      {isLoading && (
        <CircularProgress className="absolute top-3 right-6 z-50" size={20} />
      )}
      <Autocomplete
        isError={isError}
        className={className}
        label={label}
        options={options}
        inputValue={searchInput[0]}
        value={value}
        onChange={(_, newInputvalue) =>
          handleItemSelect(newInputvalue as TValue)
        }
        onInputChange={handleInputChange}
        freeSolo
        componentsProps={{
          paper: {
            sx: {
              width: 'fit-content'
            }
          }
        }}
        onBlur={handleBlur}
      />
    </FormControl>
  )
}

export default PositionSingleSelect
