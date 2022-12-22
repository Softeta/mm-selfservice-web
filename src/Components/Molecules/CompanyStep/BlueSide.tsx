import { useTranslation } from 'react-i18next'

interface IProps {
  titleKey: string
  className?: string
}

export const BlueSide = ({ titleKey, className }: IProps) => {
  const { t } = useTranslation()
  return (
    <div
      className={`flex flex-col items-center justify-center bg-blue-ribbon px-12 py-16 text-white md:pb-prev-next-menu ${className}`}
    >
      <div className="max-w-[600px] text-center font-serif text-xl sm:text-2xl sm:font-bold md:text-3xl">
        {t(titleKey)}
      </div>
    </div>
  )
}
