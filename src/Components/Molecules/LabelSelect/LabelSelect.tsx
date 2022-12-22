import { ReactComponent as CheckIcon } from 'Assets/Icons/check.svg'
import clsx from 'clsx'

interface IProps {
  labels: string[]
  selectedLabels: string[]
  setSelectedLabels: (labels: string[]) => void
  className?: string
}

export const LabelSelect: React.FC<IProps> = ({
  labels,
  selectedLabels,
  setSelectedLabels,
  className
}) => {
  const handleToggleLabel = (label: string) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(selectedLabels.filter((l) => l !== label))
    } else {
      setSelectedLabels([...selectedLabels, label])
    }
  }

  const labelsUI = labels.map((label, index) => {
    const isSelected = selectedLabels.includes(label)

    return (
      <button
        key={index}
        className={clsx(
          'flex flex-row justify-between items-center px-5 mb-2 last:mb-0 w-full h-12 rounded-md border',
          isSelected ? 'bg-blue-ribbon border-blue-ribbon' : 'border-nobel'
        )}
        onClick={() => handleToggleLabel(label)}
      >
        <span
          className={clsx(
            'shrink pr-2 text-base truncate',
            isSelected ? 'text-white' : 'text-nobel'
          )}
        >
          {label}
        </span>
        <div
          className={clsx(
            'aspect-square flex justify-center items-center w-5 h-5 rounded-full border',
            isSelected ? 'bg-white border border-white' : 'border-nobel'
          )}
        >
          {isSelected && <CheckIcon />}
        </div>
      </button>
    )
  })

  return <div className={className}>{labelsUI}</div>
}
