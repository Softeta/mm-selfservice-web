import clsx from 'clsx'
import { useState, useEffect, useRef, MutableRefObject } from 'react'
import { ReactComponent as SliderHandle } from 'Assets/Icons/slider-handle.svg'

const TRANSITION_RELIABILITY_TO_GREATER = 0.6
const TRANSITION_RELIABILITY_TO_SMALLER = 0.3

interface IRangeItem {
  value?: any
  title: string
}

interface IProps {
  values: IRangeItem[]
  label?: string
  selectedValues: IRangeItem[]
  onSelectionChanged: (values: IRangeItem[]) => void
}

export const RangeSlider: React.FC<IProps> = ({
  values,
  label,
  selectedValues,
  onSelectionChanged
}) => {
  const movingHandleRef: MutableRefObject<HTMLDivElement | null> = useRef(null)
  const progressContainerRef: MutableRefObject<HTMLDivElement | null> =
    useRef(null)
  const [handlePosition, setHandlePosition] = useState(0)
  const [indexInProgress, setIndexInProgress] = useState<number | null>(null)
  const [indicesSelection, setIndicesSelection] = useState(
    selectedValues.map((value) =>
      values.findIndex((element) => element.title == value.title)
    )
  )

  useEffect(() => {
    const mouseUpHandler = () => {
      endSelection()
    }

    const mouseMoveHandler = (event: MouseEvent | TouchEvent) => {
      updateSelection(event)
    }

    window.addEventListener('mouseup', mouseUpHandler)
    window.addEventListener('mousemove', mouseMoveHandler)
    window.addEventListener('touchend', mouseUpHandler)
    window.addEventListener('touchmove', mouseMoveHandler)

    return () => {
      window.removeEventListener('mouseup', mouseUpHandler)
      window.removeEventListener('mousemove', mouseMoveHandler)
      window.removeEventListener('touchend', mouseUpHandler)
      window.removeEventListener('touchmove', mouseMoveHandler)
    }
  }, [indexInProgress])

  const beginClickSelection = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const currentTargetRect =
      event.currentTarget.parentElement!.getBoundingClientRect()
    setHandlePosition(event.pageX - currentTargetRect.x)
    setIndexInProgress(index)
  }

  const beginTouchSelection = (
    event: React.TouchEvent<HTMLDivElement>,
    index: number
  ) => {
    const currentTargetRect =
      event.currentTarget.parentElement!.getBoundingClientRect()
    setHandlePosition(event.touches[0].pageX - currentTargetRect.x)
    setIndexInProgress(index)
  }

  const endSelection = () => {
    if (indexInProgress === null) {
      return
    }
    const parent =
      movingHandleRef.current!.parentElement!.getBoundingClientRect()
    const width = parent.width
    const position =
      movingHandleRef.current!.getBoundingClientRect().x - parent.x
    const stepSize = width / (values.length - 1)

    const maxIndex = Math.max(...indicesSelection)
    const minIndex = Math.min(...indicesSelection)

    const ratio = position / stepSize
    const fractionTransitioned = ratio % 1
    if (
      fractionTransitioned >= TRANSITION_RELIABILITY_TO_GREATER ||
      fractionTransitioned <= TRANSITION_RELIABILITY_TO_SMALLER
    ) {
      const newIndex =
        fractionTransitioned >= TRANSITION_RELIABILITY_TO_GREATER
          ? Math.ceil(ratio)
          : Math.floor(ratio)
      const newRange = [
        maxIndex === indexInProgress ? minIndex : maxIndex,
        newIndex
      ].sort((n1, n2) => n1 - n2)

      const range = Array.from(
        { length: newRange[1] - newRange[0] + 1 },
        (_, k) => k + newRange[0]
      )
      setIndicesSelection([...range])
      onSelectionChanged(range.map((index) => values[index]))
    }
    setIndexInProgress(null)
    setHandlePosition(0)
  }

  const updateSelection = (event: MouseEvent | TouchEvent) => {
    if (indexInProgress === null) {
      return
    }

    const currentTargetRect =
      progressContainerRef.current!.getBoundingClientRect()
    const maxWidth =
      currentTargetRect.width -
      movingHandleRef.current!.getBoundingClientRect().width
    if (event instanceof MouseEvent) {
      setHandlePosition(
        Math.max(0, Math.min(maxWidth, event.pageX - currentTargetRect.x))
      )
    }
    if (event instanceof TouchEvent) {
      setHandlePosition(
        Math.max(
          0,
          Math.min(maxWidth, event.touches[0].pageX - currentTargetRect.x)
        )
      )
    }
  }

  return (
    <div
      className="grid w-full gap-4 font-poppins text-base"
      ref={progressContainerRef}
    >
      {label && <p className="px-1 font-semibold">{label}</p>}
      <div className="flex w-full justify-between px-1">
        {values.map((value, index) => (
          <div key={index} className="font-normal">
            {value.title}
          </div>
        ))}
      </div>
      <div className="relative z-10 h-2 w-full rounded-md">
        <div className="absolute z-30 flex h-2 w-full justify-between">
          {values.map((_, index) => (
            <div
              key={index}
              className="h-2 w-2 rounded-full bg-slider-dot"
            ></div>
          ))}
        </div>
        <div className="visible absolute z-40 flex h-2 w-full justify-between">
          <div
            className={clsx(
              'visible relative z-40 -mt-2 h-6 w-6',
              indexInProgress === null && 'invisible'
            )}
            style={{ left: handlePosition }}
            ref={movingHandleRef}
          >
            <SliderHandle />
          </div>
        </div>
        <div className="absolute z-20 flex h-2 w-full items-stretch">
          {Array.from(Array(values.length - 1).keys()).map((index) => {
            const indexSelected =
              indicesSelection.includes(index) &&
              indicesSelection.includes(index + 1)

            return (
              <div
                key={index}
                className={clsx(
                  'grid h-2 w-full',
                  index === 0 && 'rounded-l-md',
                  index === values.length - 2 && 'rounded-r-md',
                  indexSelected && 'bg-slider-bar-selected',
                  !indexSelected && 'bg-slider-bar-normal'
                )}
              ></div>
            )
          })}
        </div>
        <div className="absolute z-50 flex h-2 w-full justify-between">
          {values.map((_, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'z-50 -mt-2 h-6 w-6 cursor-pointer',
                  index != Math.min(...indicesSelection) &&
                    index != Math.max(...indicesSelection) &&
                    'invisible',
                  indexInProgress === index && 'invisible'
                )}
                onMouseDown={(event) => beginClickSelection(event, index)}
                onTouchStart={(event) => beginTouchSelection(event, index)}
              >
                <SliderHandle />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
