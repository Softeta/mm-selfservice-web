import { TPhone } from 'API/Types/phone'
import { Input, Select } from 'Components/Atoms'
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DefaultPhoneCode } from 'Utils/constants'
import countryCodes from './countryCodes.json'

interface IOption {
  value: string
  label: string
}

interface IProps {
  onChange: (countryCode?: string, number?: string, isValid?: boolean) => void
  isError?: boolean
  labelHidden?: boolean
  isRequired?: boolean
  value?: TPhone
}

const COUNTRY_CODE_OPTIONS: IOption[] = countryCodes.map((country) => ({
  label: country.dial_code,
  value: country.dial_code
}))

const DEFAULT_COUNTRY_CODE_OPTION = COUNTRY_CODE_OPTIONS.find(
  (x) => x.value === DefaultPhoneCode
)

// TODO: integrate with react hook form
export const PhoneInput: React.FC<IProps> = ({
  onChange,
  isError: isErrorProp = false,
  labelHidden = false,
  isRequired = true,
  value
}) => {
  const { t } = useTranslation()
  const [countryCodeOption, setCountryCodeOption] = useState<
    IOption | undefined
  >(COUNTRY_CODE_OPTIONS.find((x) => x.value === value?.countryCode))
  const [phoneNumber, setPhoneNumber] = useState<string>(value?.number || '')
  const [isInternalError, setIsInternalError] = useState<boolean>(false)
  const isError = isErrorProp || isInternalError
  const countryCode = countryCodeOption?.value || ''

  useEffect(() => {
    setCountryCodeOption(
      COUNTRY_CODE_OPTIONS.find((x) => x.value == value?.countryCode)
    )
    setPhoneNumber(value?.number || '')
  }, [value])

  const handleCodeSelect = (option: IOption) => {
    setCountryCodeOption(option)
    onChange(option.value, phoneNumber, phoneNumber.trim() !== '')
  }

  const handlePhoneNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const regex = /^[0-9\b]*$/
    const value = event.target.value
    const newValue = value.replace(/[^0-9]/g, '')

    if (regex.test(newValue)) {
      if (!countryCode) {
        setCountryCodeOption(DEFAULT_COUNTRY_CODE_OPTION)
      }
      setIsInternalError(false)
      setPhoneNumber(newValue)
      onChange(countryCode, newValue, true)
    }
  }

  const handleBlur = () => {
    if (countryCode === '' && phoneNumber === '' && !isRequired) {
      return
    }

    const fullNumber = countryCode + phoneNumber
    try {
      const number = parsePhoneNumber(fullNumber)
      const isValid = isValidPhoneNumber(fullNumber, number.country)
      setIsInternalError(!isValid)
    } catch {
      setIsInternalError(true)
      return
    }
  }

  return (
    <div>
      {!labelHidden && (
        <label className="font-poppins text-base font-semibold text-mine-shaft">
          {t('phoneInput.label')}
        </label>
      )}
      <div className="mt-2 flex flex-row gap-3" onBlur={handleBlur}>
        <Select
          options={COUNTRY_CODE_OPTIONS}
          selectedOption={countryCodeOption}
          onSelectOption={handleCodeSelect}
          searchValueRegex={/^\+?[0-9\b]*$/}
          className="mb-0 w-20"
          isError={isError}
          hasArrow={false}
        />
        <Input
          containerClassName="flex-grow mb-0"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          isError={isError}
        />
      </div>
    </div>
  )
}
