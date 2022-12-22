import { TCurrency } from 'API/Types/currency'
import { Input } from 'Components/Atoms'
import { CurrencySelect } from 'Components/Molecules/CurrencySelect'
import { useState } from 'react'

type TProps = {
  selectedCurrencyCode?: string
  selectedAmount?: number
  onCurrencyChanged: (option: TCurrency) => void
  onAmountChanged: (amount: number | undefined) => void
  className?: string
  isCurrencyError: boolean
  isAmountError: boolean
  placeholder?: string
}

export const MoneyInput = ({
  selectedCurrencyCode,
  selectedAmount,
  onCurrencyChanged,
  onAmountChanged,
  isCurrencyError,
  isAmountError,
  placeholder
}: TProps) => {
  const [currentAmount, setCurrentAmount] = useState<string | undefined>(
    selectedAmount?.toString()
  )

  const processAmountChange = (amount: string) => {
    setCurrentAmount(amount)
    const positiveNumbersRegex = /^\d+(\.\d{1,2})?$/

    if (positiveNumbersRegex.test(amount)) {
      onAmountChanged(Number(amount))
    } else if (amount.length === 0) {
      onAmountChanged(undefined)
    }
  }

  return (
    <div className="flex flex-row gap-3">
      <CurrencySelect
        selectedOption={selectedCurrencyCode}
        onSelected={onCurrencyChanged}
        isError={isCurrencyError}
        className="mb-0 w-[6rem]"
      />
      <Input
        value={currentAmount}
        onChange={(event) => processAmountChange(event.target.value)}
        isError={isAmountError}
        placeholder={placeholder}
        containerClassName="flex-grow mb-0"
      />
    </div>
  )
}
