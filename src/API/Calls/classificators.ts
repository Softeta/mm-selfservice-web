import { PublicHttpClient } from 'Services/HttpClient'
import { TClassificatorsResponse } from 'API/Types/classificators'
import { useQuery } from 'react-query'

export enum ClassificatorsQueryKeys {
  classificators = 'classificators'
}

const fetchClassificatorData = async (): Promise<TClassificatorsResponse> =>
  PublicHttpClient.get('/api/v1/classificators')

export const useClassificators = () =>
  useQuery(ClassificatorsQueryKeys.classificators, () =>
    fetchClassificatorData()
  )
