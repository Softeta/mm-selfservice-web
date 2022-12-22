import { TContactPerson } from 'API/Types/Company/contactPerson'
import { useTranslation } from 'react-i18next'
import { ContactPersonCard } from 'Components/Molecules/ContactPersonCard'
import { AddActionCard } from 'Components/Atoms/AddActionCard'
import CompanyStatus from 'API/Types/Enums/companyStatus'

type TProps = {
  modificationAllowed: boolean
  persons: TContactPerson[]
  companyStatus?: CompanyStatus
  onEdit: (person: TContactPerson) => void
  onCreate: () => void
}

export const ContactPersonsList = ({
  modificationAllowed,
  persons,
  companyStatus,
  onEdit,
  onCreate
}: TProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {persons.map((person, index) => (
        <ContactPersonCard
          key={index}
          person={person}
          onEdit={onEdit}
          modificationAllowed={modificationAllowed}
        />
      ))}
      {modificationAllowed && companyStatus === CompanyStatus.Approved && (
        <AddActionCard
          label={t('contactPerson.list.addNew')}
          onClick={onCreate}
        />
      )}
    </div>
  )
}
