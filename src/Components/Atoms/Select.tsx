import clsx from 'clsx'
import { useRef, useState } from 'react'
import { Input } from './Input'
import { ReactComponent as DropdownArrowIcon } from 'Assets/Icons/dropdown-arrow.svg'
import { MutableRefObject } from 'react'

export interface IOption {
  label: string
  value: any
}

interface IProps {
  options: IOption[]
  selectedOption: IOption | undefined
  onSelectOption: (option: IOption, index?: number) => void
  searchValueRegex?: RegExp
  inputClassName?: string
  className?: string
  isError?: boolean
  isReadOnly?: boolean
  hasArrow?: boolean
}

export const Select: React.FC<IProps> = ({
  options,
  selectedOption,
  onSelectOption,
  searchValueRegex,
  inputClassName,
  className,
  isError,
  isReadOnly,
  hasArrow = true
}) => {
  const inputRef: MutableRefObject<HTMLInputElement | null> = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const handleChangeSearchText = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value

    if (searchValueRegex && searchValueRegex.test(newValue)) {
      setSearchValue(newValue)
      setIsOpen(true)
    }
  }

  const handleOpenDropdown = (focusInput: boolean) => {
    if (focusInput) {
      inputRef?.current?.focus()
    }

    setIsOpen(true)
    setSearchValue('')
  }

  const handleCloseDropdown = () => {
    setIsOpen(false)
    setSearchValue('')
  }

  const handleSelect = (option: IOption, index: number) => {
    setIsOpen(false)
    onSelectOption(option, index)
    setSearchValue('')
  }

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  )

  const inputValue = isOpen && !isReadOnly ? searchValue : selectedOption?.label

  return (
    <div className="relative">
      <div className={clsx('relative', className)}>
        <Input
          ref={inputRef}
          value={inputValue ?? ''}
          onChange={handleChangeSearchText}
          onBlur={handleCloseDropdown}
          onFocus={() => handleOpenDropdown(false)}
          className={clsx(inputClassName, isReadOnly && 'cursor-pointer')}
          containerClassName="mb-0"
          isError={isError}
          RightElement={
            hasArrow && (
              <DropdownArrowIcon
                onClick={() =>
                  isOpen ? handleCloseDropdown() : handleOpenDropdown(true)
                }
                className="m-3 cursor-pointer"
              />
            )
          }
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 max-h-60 w-full overflow-scroll rounded-md border border-nobel bg-white">
          {filteredOptions.map((option, index) => (
            <li
              key={String(index)}
              className="z-20 flex h-12 cursor-pointer items-center justify-start px-4 text-dusty-gray last:rounded-b-lg hover:bg-blue-ribbon hover:text-white"
              onMouseDown={() => handleSelect(option, index)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
