import { BottomMenu } from "Components/Molecules/BottomMenu"
import { replaceLastRouteElement } from "Helpers/replaceListRouteElement"
import { useTranslation } from "react-i18next"
import { useLocation } from "react-router-dom"
import { RegularExpressions } from "Variables/regularExpressions"

export const ShortlistCandidateBottomMenu: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isCandidateShortlistLocation = RegularExpressions.isShortListCandidatePath.test(location.pathname)

  const shortlistUserItems = [
    {
      title: t('company.header.nav.candidate.profile'),
      path: 'profile'
    },
    {
      title: t('company.header.nav.candidate.experience'),
      path: 'experience'
    },
    {
      title: t('company.header.nav.candidate.motivation'),
      path: 'motivation'
    },
    {
      title: t('company.header.nav.candidate.tests'),
      path: 'personality-tests'
    },
    {
      title: t('company.header.nav.candidate.consideration'),
      path: 'our-considerations'
    }
  ]

  const menuItems = shortlistUserItems.map(
    (item) => ({
      title: item.title,
      path: replaceLastRouteElement(location.pathname, item.path)
    })
  )

  return (
    <>
      {isCandidateShortlistLocation && (
        <div className="block sm:hidden">
          <BottomMenu items={menuItems}  />
        </div>
      )}
    </>
  )
}