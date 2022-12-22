import 'Extensions/date.extensions'
import { useTranslation } from 'react-i18next'

interface IProps {
  title: string
  company: string
  startDate?: Date
  endDate?: Date
}

export const ActivitySummary: React.FC<IProps> = ({
  title,
  company,
  startDate,
  endDate
}) => {
  const { t } = useTranslation()
  return (
    <div className="grid content-between font-poppins text-mine-shaft">
      <div className="grid">
        <span className="text-md font-bold">{title}</span>
        <span className="text-base font-semibold">{company}</span>
      </div>
      <div className="h-6"></div>
      {(startDate || endDate) && (
        <span className="text-xs">
          {startDate && startDate.formatToMonthYear()} -{' '}
          {!endDate && t('activitySummary.now')}
          {endDate && endDate.formatToMonthYear()}
        </span>
      )}
    </div>
  )
}
