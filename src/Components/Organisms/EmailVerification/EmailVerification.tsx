import { ReactComponent as InfoIcon } from 'Assets/Icons/info.svg'
import { ReactComponent as CheckInfoIcon } from 'Assets/Icons/check-info.svg'
import { Notification } from 'Components/Molecules/Notification'
import { Trans, useTranslation } from 'react-i18next'
import { CircularProgress } from '@mui/material'

type IProps = {
  isError: boolean
  isLoading: boolean
  email: string
  onNavigateClick: () => void
}

export const EmailVerification = ({
  isError,
  isLoading,
  email,
  onNavigateClick
}: IProps) => {
  const { t } = useTranslation()

  return (
    <div className="grid h-screen w-screen bg-blue-ribbon p-5 text-white">
      <div className="grid justify-items-center gap-10 place-self-center py-14">
        <div className="grid justify-items-center">
          {!isLoading && !isError && (
            <CheckInfoIcon className="h-[10rem] w-[10rem]" />
          )}
          {!isLoading && isError && (
            <InfoIcon className="h-[10rem] w-[10rem]" />
          )}
          {isLoading && <CircularProgress className="h-[10rem] w-[10rem]" />}
        </div>
        <h1 className="text-center !font-poppins !text-xl font-semibold uppercase !leading-8">
          {t('emailVerification.heading')}
        </h1>
        {!isLoading && isError && (
          <Notification type={'error'}>
            <Trans
              i18nKey="emailVerification.failed"
              values={{
                email: email
              }}
              components={[<strong key={0} className="text-red" />]}
            />
          </Notification>
        )}
        {!isLoading && !isError && (
          <Notification type={'info'}>
            <Trans
              i18nKey="emailVerification.success"
              values={{
                email: email
              }}
              components={[<strong key={0} className="text-blue-ribbon" />]}
            />
          </Notification>
        )}
        {!isError && <button
          className="rounded-full border border-white py-5 px-10 text-lg"
          onClick={onNavigateClick}
          disabled={isLoading}
        >
          {t('emailVerification.createProfile')}
        </button>}
      </div>
    </div>
  )
}
