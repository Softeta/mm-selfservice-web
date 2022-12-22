import ContactPersonRole from 'API/Types/Enums/contactPersonRole'
import { useTranslation } from 'react-i18next'

interface IProps {
  role: ContactPersonRole
}

export const RoleCard: React.FC<IProps> = ({ role }) => {
  const { t } = useTranslation()

  return (
    <div className="grid h-fit w-32 justify-items-center rounded bg-orange py-1 px-2 text-white">
      {role === ContactPersonRole.Admin && t('contactPerson.role.admin')}
      {role === ContactPersonRole.User && t('contactPerson.role.user')}
    </div>
  )
}
