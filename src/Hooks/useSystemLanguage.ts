import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'

export const useSystemLanguage = (): string | undefined => {
  const candidateSystemLanguage = useSelector<RootState, string | undefined>(
    (state) => state.candidateProfile.candidate?.systemLanguage
  )
  const contactSystemLanguage = useSelector<RootState, string | undefined>(
    (state) => state.contactPerson.contactPerson?.systemLanguage
  )

  return candidateSystemLanguage || contactSystemLanguage
}
