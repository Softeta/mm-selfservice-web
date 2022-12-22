import { TLegalTerms } from 'API/Types/legalAgreement'
import { RootState } from 'Store/Slices/rootReducer'
import { getMaxDateFromStrings } from 'Utils/date'

export type TLegalTermsState = {
  terms: TLegalTerms
  termsPending?: boolean
}

export const getCandidateAgreement = (state: RootState): TLegalTermsState => {
  const candidate = state.candidateProfile.candidate
  const marketing = candidate?.marketingAcknowledgement
  const terms = candidate?.termsAndConditions

  return {
    terms: {
      termsAgreement: terms?.agreed || false,
      marketingAgreement: marketing?.agreed || false,
      modifiedAt:
        getMaxDateFromStrings(
          terms?.modifiedAt,
          marketing?.modifiedAt
        )?.toISOString() || new Date().toISOString()
    },
    termsPending: state.candidateProfile.loadingData?.termsPending
  }
}

export const getContactPersonAgreement = (
  state: RootState
): TLegalTermsState => {
  const contactPerson = state.contactPerson.contactPerson
  const marketing = contactPerson?.marketingAcknowledgement
  const terms = contactPerson?.termsAndConditions

  return {
    terms: {
      termsAgreement: terms?.agreed || false,
      marketingAgreement: marketing?.agreed || false,
      modifiedAt:
        getMaxDateFromStrings(
          terms?.modifiedAt,
          marketing?.modifiedAt
        )?.toISOString() || new Date().toISOString()
    },
    termsPending: state.contactPerson.loadingData?.termsPending
  }
}
