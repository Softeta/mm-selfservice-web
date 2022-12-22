import { ReactComponent as Tick } from 'Assets/Icons/big-tick.svg'
import { Button, CircleButton } from 'Components/Atoms'

type TSingularDecisionSelection = {
  header: string | React.ReactNode
  description: string | React.ReactNode
  actionLabel: string
  onOptionSelected: () => void
  onBackSelected?: () => void
}

export const SingularDecisionSelection = ({
  header,
  description,
  actionLabel,
  onOptionSelected,
  onBackSelected
}: TSingularDecisionSelection) => {
  return (
    <div>
      <div>
        <div className="mx-auto mb-20 flex h-[12rem] w-[12rem] items-center justify-center rounded-full bg-dodger-blue">
          <Tick />
        </div>
        <h1 className="mb-4 text-center text-white">{header}</h1>
        <p className="mb-20 text-center text-white">{description}</p>
        <div className="grid grid-cols-1 justify-items-center">
          <Button
            text={actionLabel}
            mode="dark"
            extraClassName="mb-5"
            onClick={onOptionSelected}
          />
        </div>
      </div>
      <div className="fixed bottom-4 grid">
        {onBackSelected && (
          <CircleButton
            iconType="back"
            variant="secondary"
            onClick={onBackSelected}
          />
        )}
        <div className="h-settings-only-menu"></div>
      </div>
    </div>
  )
}
