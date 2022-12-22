import clsx from 'clsx'
import { SelectionTab } from 'Components/Atoms/SelectionTab'
import { useState } from 'react'

export interface ITabItem {
  title: string
  value?: any
}

export interface IProps {
  label?: string
  items: ITabItem[]
  selectedItems: ITabItem[]
  onTabsChanged: (items: ITabItem[]) => void
  isError?: boolean
}

const SelectionTabListComponent = ({
  label,
  items,
  selectedItems,
  onTabsChanged,
  isError,
  ...rest
}: IProps) => {
  const [activeIndexes, setActiveIndexes] = useState(
    selectedItems.map((item) => items.findIndex((x) => item.title == x.title))
  )

  const selectIndex = (newIndex: number): void => {
    const newIndexes = activeIndexes
    if (newIndexes.includes(newIndex)) {
      const index = newIndexes.indexOf(newIndex, 0)
      if (index > -1) {
        newIndexes.splice(index, 1)
      }
    } else {
      newIndexes.push(newIndex)
    }

    setActiveIndexes(newIndexes)
    onTabsChanged(newIndexes.map((index) => items[index]))
  }

  return (
    <div className={clsx(isError && '-m-2 rounded-md border border-red p-2')}>
      {label && (
        <span className="inline-block h-8 font-poppins text-base font-semibold">
          {label}
        </span>
      )}
      <ul
        className="flex divide-x divide-selection-tab rounded-lg border border-selection-tab text-center"
        {...rest}
      >
        {items.map((item: ITabItem, index: number) => {
          const orientation = _getOrientation(index, items)
          return (
            <SelectionTab
              key={index}
              value={item.title}
              orientation={orientation}
              isSelected={activeIndexes.includes(index)}
              onClick={() => selectIndex(index)}
              isError={isError}
            />
          )
        })}
      </ul>
    </div>
  )
}

export const SelectionTabList = SelectionTabListComponent

const _getOrientation = (
  index: number,
  items: ITabItem[]
): 'left' | 'middle' | 'right' => {
  if (index === 0) {
    return 'left'
  } else if (index == items.length - 1) {
    return 'right'
  }

  return 'middle'
}
