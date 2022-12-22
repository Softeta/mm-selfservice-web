import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { ActionIntroduction } from 'Components/Molecules/ActionIntroduction'
import { routes } from 'Routes/routes'

export const Step3 = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const { jobId } = params

  return (
    <div className="h-screen overflow-y-auto bg-blue-ribbon md:h-[calc(100vh_-_theme(height.header)_-_theme(spacing.scroll-bar-correction))]">
      <div className="grid h-full w-full place-content-center px-6">
        <div className="grid w-full justify-items-center lg:w-content-container">
          <div className="w-full max-w-candidate-profile-form">
            <ActionIntroduction
              header={t('company.job.create.positionStep.header')}
              description={t('company.job.create.positionStep.description')}
              actionLabel={t('company.job.create.positionStep.continueAction')}
              skipLabel={t('company.job.create.positionStep.skipAction')}
              onActionSelected={() =>
                navigate(routes.company.jobs.create.step4(jobId!))
              }
              onSkipSelected={() => navigate(routes.company.root)}
              sizeClassName="w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
