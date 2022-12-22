import { useTranslation } from 'react-i18next'

interface IProps {
  label: string
  value?: string
  visible?: boolean
}

export const InfoRecord: React.FC<IProps> = ({
  label,
  value,
  visible = true
}) => {
  const { t } = useTranslation()
  return (
    <>
      {visible && value && (
        <div className="flex justify-between">
          <div className="text-base font-bold text-mine-shaft">{label}</div>
          <div className="text-base text-mine-shaft">
            {value}
          </div>
        </div>
      )}
    </>
  )
}
