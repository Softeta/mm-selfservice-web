import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import './Chart.css'

interface IProps {
  label: string
  progressPercentage?: number
  chartSizeRem?: number
}

const SVG_FLATTENING_ADJUSTMENT_FACTOR = 0.1

export const Chart: React.FC<IProps> = ({
  label,
  progressPercentage,
  chartSizeRem = 10
}) => {
  const { t } = useTranslation()

  const radius = (chartSizeRem / 2) * (1 - SVG_FLATTENING_ADJUSTMENT_FACTOR)
  const circleLength = 2 * radius * Math.PI
  const currentProgressLength =
    (Math.max(0, 100 - (progressPercentage || 0)) / 100) * circleLength
  const progressRounded = Math.round(progressPercentage || 0)

  return (
    <div className="grid h-fit w-fit justify-items-center">
      <div className="text-md font-bold">{label}</div>
      <div className="h-4"></div>
      <div className="relative">
        {progressPercentage &&
          <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold text-[2rem]'>
            {progressRounded}%
          </div>
        }
        <svg
          className="justify-self-center"
          width={`${chartSizeRem}rem`}
          height={`${chartSizeRem}rem`}
          xmlns="http://www.w3.org/2000/svg"
          transform="rotate(-90)"
        >
          <g>
            <circle
              id="circle"
              className="not-filled-circle"
              r={`${radius}rem`}
              cy="50%"
              cx="50%"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${circleLength}rem`}
              strokeDashoffset="0"
            />
            <circle
              id="circle"
              className="filled-circle"
              r={`${radius}rem`}
              cy="50%"
              cx="50%"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${circleLength}rem`}
              strokeDashoffset={`${currentProgressLength}rem`}
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
