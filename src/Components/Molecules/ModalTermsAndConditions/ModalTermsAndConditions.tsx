import Checkbox from 'Components/Atoms/Checkbox'
import { ModalContainer } from 'Components/Atoms/ModalContainer'
import UserSettingsContext from 'Contexts/UserSettings/UserSettingsContext'
import 'Extensions/date.extensions'
import { useContext, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Button } from '../../Atoms/Button'
import Loader from '../CenteredLoader'
import { Notification } from '../Notification'

interface IProps {
  visible: boolean
  onAccept: (marketing: boolean) => void
  isLoading?: boolean
}

export const ModalTermsAndConditions: React.FC<IProps> = ({
  visible,
  onAccept,
  isLoading
}) => {
  const { t } = useTranslation()
  const [termsAgreementErrorVisible, setTermsAgreementErrorVisible] =
    useState(false)
  const {
    termsAndConditionsAccepted,
    acceptTerms,
    marketingAcknowledgementAccepted,
    acceptMarketing
  } = useContext(UserSettingsContext)

  const processAccept = () => {
    if (!termsAndConditionsAccepted) {
      setTermsAgreementErrorVisible(true)
      return
    }

    setTermsAgreementErrorVisible(false)
    onAccept(marketingAcknowledgementAccepted)
  }

  return (
    <ModalContainer visible={visible} className="p-6">
      <span className="text-center text-lg font-bold">
        {t('profileMigrated.message')}
      </span>
      <div className="h-12"></div>
      <div className="grid">
        <Checkbox
          defaultChecked={termsAndConditionsAccepted}
          label={
            <Trans
              i18nKey="languageSelection.agreeWithTermsAndConditions"
              components={[
                <a
                  key={0}
                  className="text-blue-ribbon"
                  href="https://marchermarkholt.com/dk/terms.html"
                  target="_blank"
                  rel="noreferrer"
                />
              ]}
            />
          }
          onClick={() => acceptTerms(!termsAndConditionsAccepted)}
        />
        {termsAgreementErrorVisible && (
          <>
            <div className="h-1"></div>
            <Notification type="error">
              {t('languageSelection.mustAgreeWithTermsAndConditions')}
            </Notification>
          </>
        )}
        <div className="h-2"></div>
        <Checkbox
          defaultChecked={marketingAcknowledgementAccepted}
          label={t('languageSelection.agreeWithEmails')}
          onClick={() => acceptMarketing(!marketingAcknowledgementAccepted)}
        />
      </div>
      {isLoading && <Loader />}
      <div
        className={`fixed inset-x-0 bottom-0 flex h-[5rem] items-center justify-center rounded-t-3xl border-t bg-white p-6`}
      >
        <Button
          text={t('button.next')}
          extraClassName="min-w-[20rem]"
          onClick={() => processAccept()}
          disabled={isLoading}
        />
      </div>
    </ModalContainer>
  )
}
