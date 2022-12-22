import { AxiosInstance } from 'axios'
import { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { t } from 'i18next'
import snackbarState from 'Components/Molecules/Snackbar/snackbarState'
import { AlertType } from 'Components/Molecules/Snackbar'

interface IProps {
  client: AxiosInstance
}

const getTranslatedErrorMessage = (error: any): string | undefined => {
  const handledErrorMessage = !!error.response?.data?.Code
  if (handledErrorMessage) {
    let translatedValue = t(`Error.${error.response.data.Code}`)
    if (error.response.data.Parameters.length > 0) {
      for (
        let index = 0;
        index < error.response.data.Parameters.length;
        index += 1
      ) {
        translatedValue = translatedValue.replace(
          `{${index}}`,
          error.response.data.Parameters[index]
        )
      }
    }
    return translatedValue
  }
  const serverError =
    error.response.status >= 500 && error.response.status <= 599
  if (serverError) {
    return t('Error.Unhandled')
  }

  return undefined
}

export const ClientInterceptor = ({ client }: IProps) => {
  const setSnackbar = useSetRecoilState(snackbarState)

  useEffect(() => {
    client.interceptors.response.use(
      (response) => response,
      (error) => {
        const message = getTranslatedErrorMessage(error)
        if (message) {
          setSnackbar({
            open: true,
            message,
            severity: AlertType.error
          })
        }
        return Promise.reject(error)
      }
    )
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [client])

  return null
}
