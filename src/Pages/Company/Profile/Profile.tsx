import { useCompany } from 'API/Calls/companies'
import { CompanyPageContainer } from 'Components/Atoms/CompanyPageContainer'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { CompanyForm } from './Forms/CompanyForm'
import { CircularProgress } from '@mui/material'

export const Profile = () => {
  const { t } = useTranslation()

  const companyId = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.companyId
  )

  const { data, isLoading } = useCompany(companyId)

  return (
    <CompanyPageContainer>
      <div className="w-full py-10 px-6">
        <div className="mb-8 text-lg font-bold">
          {t('company.profile.header')}
        </div>
        {isLoading ? (
          <CircularProgress />
        ) : (
          data && <CompanyForm company={data.data} />
        )}
      </div>
    </CompanyPageContainer>
  )
}
