import { Button } from 'Components/Atoms/Button'
import { TContactPerson } from 'API/Types/Company/contactPerson'
import { RoleCard } from 'Components/Atoms/RoleCard'
import { useTranslation } from 'react-i18next'
import ContactPersonRole from 'API/Types/Enums/contactPersonRole'

type TProps = {
  modificationAllowed: boolean
  person: TContactPerson
  onEdit: (person: TContactPerson) => void
}

export const ContactPersonCard = ({
  modificationAllowed,
  person,
  onEdit
}: TProps) => {
  const { t } = useTranslation()

  return (
    <div className="relative h-[16rem] w-[20rem] rounded-md bg-white px-5 pt-12 pb-5">
      {person.role === ContactPersonRole.Admin && (
        <div className="absolute top-2.5 -left-1.5">
          <RoleCard role={person.role} />
        </div>
      )}
      <div className="grid gap-2">
        <span className="text-lg font-bold">{`${person.firstName} ${person.lastName}`}</span>
        <span className="text-base font-semibold">{person.position?.code}</span>
      </div>
      <div className="grid py-8">
        {person.phone?.phoneNumber && (
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold">
              {t('contactPerson.card.phone')}
            </span>
            <span>{person.phone?.phoneNumber}</span>
          </div>
        )}
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-semibold">
            {t('contactPerson.card.email')}
          </span>
          <span className="break-all">{person.email}</span>
        </div>
      </div>
      {modificationAllowed && (
        <Button
          text={t('contactPerson.card.edit')}
          onClick={() => onEdit(person)}
        />
      )}
    </div>
  )
}
