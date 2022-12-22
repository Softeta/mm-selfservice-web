import clsx from 'clsx'
import { SettingsOnlyBottomMenu } from 'Components/Atoms/SettingsOnlyBottomMenu'
import { ProgressBar } from 'Components/Atoms/ProgressBar'
import { useLocation } from 'react-router-dom'
import CandidateProfileCreationRoutes from 'Routes/Candidate/CandidateProfileCreationRoutes'
import { routes } from 'Routes/Candidate/routes'

const blueSteps = Object.freeze([
  '/step-6',
  '/step-7',
  '/step-11',
  '/step-15',
  '/step-16',
  '/step-20',
  '/step-24',
  '/step-26',
  '/step-27',
  '/step-31'
])

export const ProfileCreation = () => {
  const location = useLocation()
  const currentStep = location.pathname.replace(
    '/myprofile/profile-creation',
    ''
  )
  const parts = currentStep.split('/')
  const stepNumber =
    parts.length > 1 ? parseInt(parts[1].replace('step-', '')) : 0

  const hasBlueStep = blueSteps.find((step) => step === currentStep)

  return (
    <div
      className={clsx(
        'h-screen overflow-y-auto md:h-[calc(100vh_-_theme(height.header)_-_theme(spacing.scroll-bar-correction))]',
        hasBlueStep && 'bg-blue-ribbon',
        !hasBlueStep && 'bg-spring-wood'
      )}
    >
      <ProgressBar progress={(stepNumber / 30) * 100} />
      <div
        className={clsx(
          'grid h-[calc(100%_-_theme(height.candidate-profile-progress-bar)_-_theme(height.settings-only-menu))] w-full px-6',
          hasBlueStep && 'place-content-center',
          !hasBlueStep && 'justify-items-center'
        )}
      >
        <div className="grid w-full justify-items-center lg:w-content-container">
          <div className="w-full max-w-candidate-profile-form">
            <CandidateProfileCreationRoutes />
          </div>
        </div>
      </div>
      <SettingsOnlyBottomMenu settingsPath={routes.settings} />
    </div>
  )
}
