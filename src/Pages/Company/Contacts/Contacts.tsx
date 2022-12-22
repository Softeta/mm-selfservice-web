import { CircularProgress } from '@mui/material'
import { useCompany } from 'API/Calls/companies'
import { TContactPerson } from 'API/Types/Company/contactPerson'
import ContactPersonRole from 'API/Types/Enums/contactPersonRole'
import { CompanyPageContainer } from 'Components/Atoms/CompanyPageContainer'
import { ContactPersonsList } from 'Components/Organisms/ContactPersonsList'
import { ContactPersonForm } from 'Forms/Company/ContactPersonForm'
import { useSelfRole } from 'Hooks/useSelfRole'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { RootState } from 'Store/Slices/rootReducer'

type TProps = {
  createNew?: boolean
}

export const Contacts = ({ createNew }: TProps) => {
  const { t } = useTranslation()
  const { contactPersonId } = useParams()
  const role = useSelfRole()
  const navigate = useNavigate()

  const companyId = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.companyId
  )

  const showModificationForm = !!createNew || !!contactPersonId

  const { data, isLoading, refetch } = useCompany(companyId)

  const editContactPerson = (person: TContactPerson) => {
    navigate(`${routes.company.contacts.base}/${person.id}`)
  }

  const createContactPerson = () => {
    navigate(routes.company.contacts.new)
  }

  return (
    <CompanyPageContainer>
      <div className="w-full py-10">
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <>
            {showModificationForm && (
              <>
                <ContactPersonForm
                  companyId={companyId}
                  person={data?.data.contactPersons?.find(
                    (p) => p.id === contactPersonId
                  )}
                  onUpdated={() => {
                    refetch()
                    navigate(routes.company.contacts.base)
                  }}
                />
                <div className="py-6 px-4">
                  <hr className="border-dashed border-list-separator" />
                </div>
              </>
            )}
            <div className="mb-4 px-3 text-lg font-bold">
              {t('contactPerson.list.header')}
            </div>
            <ContactPersonsList
              companyStatus={data?.data.status}
              modificationAllowed={role === ContactPersonRole.Admin}
              persons={data?.data.contactPersons || []}
              onEdit={editContactPerson}
              onCreate={createContactPerson}
            />
          </>
        )}
      </div>
    </CompanyPageContainer>
  )
}
