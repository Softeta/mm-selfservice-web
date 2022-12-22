import { ReactComponent as Tick } from 'Assets/Icons/big-tick.svg'
import { useTranslation } from 'react-i18next'
import { Button } from 'Components/Atoms'

type TBinaryDecisionSelection = {
  description: string | React.ReactNode
  firstOptionLabel: string
  secondOptionLabel: string
  onFirstOptionSelected: () => void
  onSecondOptionSelected: () => void
}

export const BinaryDecisionSelection = ({
  description,
  firstOptionLabel,
  secondOptionLabel,
  onFirstOptionSelected,
  onSecondOptionSelected
}: TBinaryDecisionSelection) => {
  const { t } = useTranslation()

  return (
    <div>
      <div className="mx-auto mb-20 flex h-48 w-48 items-center justify-center rounded-full bg-dodger-blue">
        <Tick />
      </div>
      <p className="mb-20 text-center text-white">{description}</p>
      <div className="grid grid-cols-1 justify-items-center">
        <Button
          text={firstOptionLabel}
          mode="dark"
          extraClassName="mb-5"
          onClick={onFirstOptionSelected}
        />
        <div className="mb-5 text-xs uppercase text-white opacity-40">
          <span className="pr-2">------------</span>
          {t('general.or')}
          <span className="pl-2">------------</span>
        </div>
        <Button
          text={secondOptionLabel}
          variant="secondary"
          mode="dark"
          onClick={onSecondOptionSelected}
        />
      </div>
    </div>
  )
}
