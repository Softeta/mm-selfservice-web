import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { ActionIntroduction } from 'Components/Molecules/ActionIntroduction'
import { routes } from 'Routes/routes'
import { RootState } from 'Store/Slices/rootReducer'
import { useSelector } from 'react-redux'
import { useCompany } from 'API/Calls/companies'
import { CircularProgress } from '@mui/material'

export const Step7 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const companyId = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.companyId
  )
  const { data, isLoading } = useCompany(companyId)

  return (
    <div className="h-screen overflow-y-auto bg-blue-ribbon md:h-[calc(100vh_-_theme(height.header)_-_theme(spacing.scroll-bar-correction))]">
      <div className="grid h-full w-full place-content-center px-6">
        <div className="grid w-full justify-items-center lg:w-content-container">
          <div className="w-full max-w-candidate-profile-form">
            {isLoading && <CircularProgress />}
            {!isLoading && (
              <ActionIntroduction
                header={t('company.job.create.thankYou.header')}
                description={t('company.job.create.thankYou.description', {
                  companyName: data?.data.name
                })}
                actionLabel={t('company.job.create.thankYou.continueAction')}
                onActionSelected={() => navigate(routes.company.root)}
                sizeClassName="w-fit"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
