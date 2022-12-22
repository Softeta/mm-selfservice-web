import { useMsal } from '@azure/msal-react'
import { CircularProgress } from '@mui/material'
import ContactPersonStage from 'API/Types/Enums/contactPersonStage'
import { ModalTermsAndConditions } from 'Components/Molecules/ModalTermsAndConditions'
import UserSettingsContext from 'Contexts/UserSettings/UserSettingsContext'
import {
  FunctionComponent,
  ReactNode,
  useContext,
  useEffect
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAcceptedAccountResolver,
  getAccount
} from 'Services/AzureMsal'
import {
  getSelfRequest,
  registerSelfRequest,
  setLegalTerms
} from 'Store/Slices/ContactPerson/contactPersonReducer'
import { RootState } from 'Store/Slices/rootReducer'
import {
  getContactPersonAgreement,
  TLegalTermsState
} from 'Store/State/agreement'

type TProps = {
  pending?: boolean
  children: ReactNode
  contactPersonExists?: boolean
  status?: ContactPersonStage
}

const AuthenticatedCompanyComponent: FunctionComponent<TProps> = (props) => {
  const { pending, children, contactPersonExists, status } = props

  const agreement = useSelector<RootState, TLegalTermsState>(
    getContactPersonAgreement
  )

  const {
    systemLanguage,
    termsAndConditionsAccepted,
    marketingAcknowledgementAccepted
  } = useContext(UserSettingsContext)

  const { instance } = useMsal()
  const dispatch = useDispatch()

  const _processAcceptTerms = (marketingAgreement: boolean) => {
    dispatch(
      setLegalTerms({
        marketingAgreement: marketingAgreement,
        termsAgreement: true,
        modifiedAt: new Date().toISOString()
      })
    )
  }

  useEffect(() => {
    dispatch(getSelfRequest())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (contactPersonExists !== false) {
      return
    }

    const account = getAccount(instance, getAcceptedAccountResolver())
    if (account === null) {
      return
    }

    const emails = account?.idTokenClaims?.emails
    const externalId = account?.idTokenClaims?.oid
    if (!emails || emails.length === 0 || !externalId) {
      return
    }

    const email = emails[0]
    dispatch(
      registerSelfRequest({
        email: email,
        externalId: externalId,
        systemLanguage: systemLanguage,
        acceptTermsAndConditions: termsAndConditionsAccepted,
        acceptMarketingAcknowledgement: marketingAcknowledgementAccepted
      })
    )
    // We only care if contact person exists or not.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactPersonExists])

  if (pending === true || !contactPersonExists) {
    return <CircularProgress />
  }

  if (
    contactPersonExists &&
    (agreement.terms.termsAgreement === false ||
      agreement.termsPending === true)
  ) {
    return (
      <ModalTermsAndConditions
        visible={true}
        onAccept={_processAcceptTerms}
        isLoading={agreement.termsPending}
      />
    )
  }

  return <>{children}</>
}

export default AuthenticatedCompanyComponent
