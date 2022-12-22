import { useTranslation } from 'react-i18next'
import { Button, Select } from 'Components/Atoms'
import { useContext, useState } from 'react'
import { IOption } from 'Components/Atoms/Select'
import { ClassificatorsContext } from 'Contexts/Classificators/ClassificatorsContext'
import Checkbox from 'Components/Atoms/Checkbox'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { RootState } from 'Store/Slices/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setSettings } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { Notification } from 'Components/Molecules/Notification'
import Loader from 'Components/Molecules/CenteredLoader'
import UserSettingsContext from 'Contexts/UserSettings/UserSettingsContext'
import { TSettingsUpdateState } from 'Store/Slices/Types/settingsUpdateState'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { useMsal } from '@azure/msal-react'
import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/Candidate/routes'

type TDefaultValues = {
  systemLanguage: string | undefined
  marketingAcknowledgement: boolean | undefined
}

export const CandidateSettings = () => {
  const { instance } = useMsal()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    systemLanguage: state.candidateProfile.candidate!.systemLanguage,
    marketingAcknowledgement:
      state.candidateProfile.candidate!.marketingAcknowledgement?.agreed
  }))

  const state = useSelector<RootState, TSettingsUpdateState | undefined>(
    (state) => state.candidateProfile.loadingData?.settingsUpdateState
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
    navigate(routes.base)
  }

  return (
    <ProfilePageContainer>
      <div className="w-full max-w-candidate-profile-form pt-16">
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
    </ProfilePageContainer>
  )
}
