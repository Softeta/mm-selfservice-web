import { ReactComponent as InfoIcon } from 'Assets/Icons/info.svg'
import { ReactComponent as BackWhiteIcon } from 'Assets/Icons/back-white.svg'
import { StatusBox } from 'Components/Molecules/StatusBox'
import { TErrorResponse } from 'API/Types/errorResponse'
import { Notification } from 'Components/Molecules/Notification'
import { Trans, useTranslation } from 'react-i18next'

interface IProps {
  email: string
  isLoading: boolean
  isError: boolean
  isEmailSent: boolean
  error: TErrorResponse
  onRequestEmailVerification: () => void
  onLogoutClick: () => void
}

export const ConfirmationEmail = ({
  email,
  isLoading,
  isError,
  isEmailSent,
  error,
  onRequestEmailVerification,
  onLogoutClick
}: IProps) => {
  const { t } = useTranslation()

  return (
    <div className="grid h-screen w-screen bg-blue-ribbon p-5 text-white">
      <div className="grid justify-items-center gap-10 place-self-center py-14">
        <div className="grid justify-items-center">
          <InfoIcon className="h-[10rem] w-[10rem]" />
        </div>
        <h1 className="text-center !font-poppins !text-xl font-semibold uppercase !leading-8">
          {t('emailConfirmation.heading')}
        </h1>
        <span className="text-center text-base">
          <Trans
            i18nKey="emailConfirmation.explanation"
            values={{
              email: email
            }}
            components={[<strong key={0} className="text-white" />]}
          />
        </span>
        <button
          className="rounded-full border border-white py-5 px-10 text-lg"
          onClick={onRequestEmailVerification}
          disabled={isLoading}
        >
          {t('emailConfirmation.resend')}
        </button>
        <StatusBox error={error} isLoading={isLoading} isError={isError} />
        {!isLoading && !isError && isEmailSent && (
          <Notification type={'info'}>
            {t('emailConfirmation.resent')}
          </Notification>
        )}
      </div>
      <div className="relative md:hidden">
        <BackWhiteIcon
          className="absolute bottom-0 left-0 h-16 w-16 cursor-pointer"
          onClick={onLogoutClick}
        />
      </div>
    </div>
  )
}
