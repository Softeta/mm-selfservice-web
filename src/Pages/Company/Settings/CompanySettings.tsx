import { useTranslation } from 'react-i18next'
import { Button, Select } from 'Components/Atoms'
import { useContext, useState } from 'react'
import { IOption } from 'Components/Atoms/Select'
import { ClassificatorsContext } from 'Contexts/Classificators/ClassificatorsContext'
import Checkbox from 'Components/Atoms/Checkbox'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { RootState } from 'Store/Slices/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Notification } from 'Components/Molecules/Notification'
import Loader from 'Components/Molecules/CenteredLoader'
import UserSettingsContext from 'Contexts/UserSettings/UserSettingsContext'
import { TSettingsUpdateState } from 'Store/Slices/Types/settingsUpdateState'
import { setSettings } from 'Store/Slices/ContactPerson/contactPersonReducer'
import { useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/routes'

type TDefaultValues = {
  systemLanguage: string | undefined
  marketingAcknowledgement: boolean | undefined
}

export const CompanySettings = () => {
  const { instance } = useMsal()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    systemLanguage: state.contactPerson.contactPerson!.systemLanguage,
    marketingAcknowledgement:
      state.contactPerson.contactPerson!.marketingAcknowledgement?.agreed
  }))

  const state = useSelector<RootState, TSettingsUpdateState | undefined>(
    (state) => state.contactPerson.loadingData?.settingsUpdateState
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { languages } = useContext(ClassificatorsContext)
  const { systemLanguage } = useContext(UserSettingsContext)

  const getSelectedLanguage = () =>
    languages.find((x) => x.value === defaultValues.systemLanguage)

  const [selectedLanguage, setSelectedLanguage] = useState(
    getSelectedLanguage()
  )

  const [
    marketingAcknowledgementAccepted,
    setMarketingAcknowledgementAccepted
  ] = useState(defaultValues.marketingAcknowledgement)

  const { t } = useTranslation()

  const handleLanguageSelect = (option: IOption) => {
    setSelectedLanguage(option)
  }

  const processSubmit = () => {
    dispatch(
      setSettings({
        systemLanguage: selectedLanguage?.value || systemLanguage,
        marketingAcknowledgement: marketingAcknowledgementAccepted || false,
        modifiedAt: new Date().toISOString()
      })
    )
  }

  const handleLogout = () => {
    instance.logoutRedirect()
    navigate(routes.company.root)
  }

  return (
    <div className="h-screen overflow-y-auto bg-spring-wood md:h-[calc(100vh_-_theme(spacing.scroll-bar-correction))]">
      <div className="grid h-screen w-full justify-items-center px-6">
        <div className="grid w-full justify-items-center lg:w-content-container">
          <div className="w-full max-w-candidate-profile-form">
            <div className="pt-16">
              <h1 className="mb-20 text-center text-lg">
                {t('candidate.settings.header')}
              </h1>
              {state == TSettingsUpdateState.error && (
                <>
                  <Notification type={'error'}>
                    {t('candidate.settings.saveFailed')}
                  </Notification>
                  <div className="h-2"></div>
                </>
              )}
              <p className="mb-2 font-semibold">
                {t('candidate.settings.selectedLanguage')}
              </p>
              <Select
                options={languages}
                selectedOption={selectedLanguage}
                onSelectOption={handleLanguageSelect}
                className="mb-0 rounded-lg border border-nobel p-0.5"
                isReadOnly={true}
                hasArrow={false}
              />
              <p className="mt-6 mb-2 font-semibold">
                {t('candidate.settings.emails')}
              </p>
              <Checkbox
                defaultChecked={marketingAcknowledgementAccepted}
                label={t('languageSelection.agreeWithEmails')}
                onClick={() =>
                  setMarketingAcknowledgementAccepted(
                    !marketingAcknowledgementAccepted
                  )
                }
              />
              <Button
                extraClassName="mx-auto mt-14 sm:hidden"
                isLoading={state == TSettingsUpdateState.loading}
                type="button"
                text={t('header.logout')}
                disabled={state == TSettingsUpdateState.loading}
                onClick={(event) => {
                  event.preventDefault()
                  handleLogout()
                }}
              />
              {state == TSettingsUpdateState.loading && <Loader />}
              <PrevNextMenu
                isBackBtnDisabled={state == TSettingsUpdateState.loading}
                isSubmitBtnDisabled={state == TSettingsUpdateState.loading}
                continueButtonLabel={t('candidate.settings.save')}
                onBackBtnClick={() => history.back()}
                onSubmitBtnClick={processSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
