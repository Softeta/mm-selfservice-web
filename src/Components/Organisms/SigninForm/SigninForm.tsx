import { useTranslation } from 'react-i18next'
import { Button } from 'Components/Atoms'
import { useContext } from 'react'
import UserSettingsContext from 'Contexts/UserSettings/UserSettingsContext'

interface IProps {
  onSignInClick: (language: string) => void
  onGoToSignup: () => void
}

export const SigninForm = ({ onSignInClick, onGoToSignup }: IProps) => {
  const { systemLanguage } = useContext(UserSettingsContext)

  const { t } = useTranslation()

  return (
    <>
      <h1 className="mb-10 text-center !font-poppins !text-lg font-semibold uppercase">
        {t('languageSelection.title')}
      </h1>
      <div className="h-8"></div>
      <Button
        text={t('languageSelection.signIn')}
        extraClassName="w-full mb-5"
        onClick={() => onSignInClick(systemLanguage)}
      />
      <p className="text-center">
        <a
          className="cursor-pointer text-base font-bold text-blue-ribbon"
          onClick={onGoToSignup}
        >
          {t('languageSelection.notHaveAccount')}
        </a>
      </p>
    </>
  )
}
