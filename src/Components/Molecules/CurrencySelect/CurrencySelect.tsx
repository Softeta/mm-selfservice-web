import Currencies from 'Assets/currencies.json'
import { TCurrency } from 'API/Types/currency'
import { Select } from 'Components/Atoms'
import { IOption } from 'Components/Atoms/Select'

type TProps = {
  selectedOption?: string
  onSelected: (option: TCurrency) => void
  className?: string
  isError: boolean
}

const toOption = (option: TCurrency): IOption => ({
  label: `${option.code} (${option.symbol})`,
  value: option
})

const fromOption = (option: IOption): TCurrency => ({
  code: option.value.code,
  symbol: option.value.symbol
})

export const CurrencySelect = ({
  selectedOption,
  onSelected,
  isError,
  ...rest
}: TProps) => {
  const initialOption = () => {
    const currency = Currencies.find((e) => e.code == selectedOption)

    if (currency) {
      return toOption(currency)
    }
  }

  return (
    <Select
      selectedOption={initialOption()}
      onSelectOption={(option) => onSelected(fromOption(option))}
      options={Currencies.map(toOption)}
      isError={isError}
      hasArrow={false}
      {...rest}
    />
  )
}
