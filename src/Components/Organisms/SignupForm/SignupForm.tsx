import { Trans, useTranslation } from 'react-i18next'
import { Button } from 'Components/Atoms'
import { useContext } from 'react'
import UserSettingsContext from 'Contexts/UserSettings/UserSettingsContext'
import Checkbox from 'Components/Atoms/Checkbox'

interface IProps {
  onSignUpClick: (language: string) => void
  onGoToLogin: () => void
}

export const SignupForm = ({ onSignUpClick, onGoToLogin }: IProps) => {
  const {
    systemLanguage,
    acceptTerms,
    marketingAcknowledgementAccepted,
    acceptMarketing
  } = useContext(UserSettingsContext)

  const { t } = useTranslation()

  const processSignup = () => {
    acceptTerms(true)
    onSignUpClick(systemLanguage)
  }

  return (
    <>
      <h1 className="mb-10 text-center !font-poppins !text-lg font-semibold uppercase">
        {t('languageSelection.title')}
      </h1>
      <div className="mb-5 text-center">
        <Trans
          i18nKey="languageSelection.welcomeMessage"
          components={[
            <a
              key={0}
              className="whitespace-nowrap text-blue-ribbon"
              href="https://marchermarkholt.com/dk/terms.html"
              target="_blank"
              rel="noreferrer"
            />
          ]}
        />
      </div>
      <Button
        text={t('languageSelection.signUp')}
        extraClassName="w-full mb-5"
        onClick={processSignup}
      />
      <p className="text-center">
        <a
          className="cursor-pointer text-base font-bold text-blue-ribbon"
          onClick={onGoToLogin}
        >
          {t('languageSelection.alreadyHaveAccount')}
        </a>
      </p>
      <div className="h-6"></div>
      <Checkbox
        defaultChecked={marketingAcknowledgementAccepted}
        label={t('languageSelection.agreeWithEmails')}
        onClick={() => acceptMarketing(!marketingAcknowledgementAccepted)}
      />
    </>
  )
}
