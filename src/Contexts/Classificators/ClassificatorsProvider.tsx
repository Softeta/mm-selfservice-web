import { CircularProgress } from '@mui/material'
import { useClassificators } from 'API/Calls/classificators'
import { TGetClassificators } from 'API/Types/classificators'
import { IProvider } from 'Contexts/IProvider'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ClassificatorsContext,
  initClassificators,
  TLanguage
} from './ClassificatorsContext'

export const ClassificatorsProvider = ({ children }: IProvider) => {
  const [classificators, setClassificators] = useState(initClassificators)
  const { t } = useTranslation()

  const { isLoading, isError, data } = useClassificators()

  const handleResponse = (classificators: TGetClassificators) => {
    const languages: TLanguage[] = classificators.systemLanguages.map(
      (code) => ({
        value: code,
        label: t(`language.${code}`)
      })
    )

    setClassificators({ languages })
  }

  useEffect(() => {
    if (data?.data) {
      handleResponse(data.data)
    }
  }, [data])

  if (isLoading) return <CircularProgress />
  if (isError) return <p>Error</p>

  return (
    <ClassificatorsContext.Provider value={classificators}>
      {children}
    </ClassificatorsContext.Provider>
  )
}

export default ClassificatorsProvider
