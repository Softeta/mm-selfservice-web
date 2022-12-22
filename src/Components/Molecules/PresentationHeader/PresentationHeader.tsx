import { TextButton } from 'Components/Atoms/TextButton'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

interface IProps {
  position?: string
  company?: string
  onBackClicked: () => void
}

export const PresentationHeader: React.FC<IProps> = ({
  position,
  company,
  onBackClicked
}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isBackOfficeVisitor = location.pathname.startsWith('/back-office')

  return (
    <>
      {!isBackOfficeVisitor && (
        <div className="flex">
          <div className="grow pl-32 text-center">
            <div className="h-12"></div>
            <h1 className="text-lg font-bold">{position}</h1>
            <div className="h-2"></div>
            <h2 className="text-base font-bold">{company}</h2>
            <div className="h-8"></div>
          </div>
          <div className="m-12 w-20 place-self-center">
            <TextButton
              label={t('company.shortlist.nav.backToJob')}
              onClick={onBackClicked}
            />
          </div>
        </div>
      )}
      {isBackOfficeVisitor && (
        <div className="text-center">
          <div className="h-12"></div>
          <h1 className="text-lg font-bold">{position}</h1>
          <div className="h-2"></div>
          <h2 className="text-base font-bold">{company}</h2>
          <div className="h-8"></div>
        </div>
      )}
    </>
  )
}
