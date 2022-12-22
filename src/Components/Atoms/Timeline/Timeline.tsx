import clsx from 'clsx'

interface IProps {
  title?: string
  allValues: string[]
  selectedValues?: string[]
}

export const Timeline = ({ title, allValues, selectedValues }: IProps) => {
  return (
    <div className="grid gap-16 py-5">
      <p className="text-base font-bold">{title}</p>
      <div className="relative flex h-1.5 w-full justify-between rounded bg-slider-bar-normal">
        {allValues.map((value, index) => {
          return (
            <div
              key={index}
              className={clsx(
                'relative top-1/2 flex -translate-y-2/4 justify-start rounded-full bg-nobel',
                (selectedValues?.includes(value) &&
                  'h-3.5 w-3.5 bg-mine-shaft') ||
                  'h-1.5 w-1.5',
                index === 0 && 'justify-start',
                index !== 0 && index < allValues.length - 1 && 'justify-center',
                index === allValues.length - 1 && 'justify-end'
              )}
            >
              <div
                className={clsx(
                  'absolute bottom-0 mb-7',
                  selectedValues?.includes(value) &&
                    'rounded bg-mine-shaft text-white'
                )}
              >
                <p
                  className={clsx(
                    selectedValues?.includes(value) && 'px-1.5 py-0.5',
                    'text-base'
                  )}
                >
                  {value}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
