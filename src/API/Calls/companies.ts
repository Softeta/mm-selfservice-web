import {
  TCompanyRegisterRequest,
  TCompanyRegistrationResponse
} from 'API/Types/Company/companyRegister'
import { TCompanyResponse } from 'API/Types/Company/companyGet'
import { TCompaniesSearchResponse } from 'API/Types/Company/companySearchGet'
import { QueryClient, useQuery } from 'react-query'
import { HttpClient } from 'Services/HttpClient'
import { TCompanyUpdateRequest } from 'API/Types/Company/companyUpdate'
import { JobQueryKeys } from './jobs'

export enum CompaniesQueryKeys {
  companies = 'companies',
  company = 'company'
}

export const needRefecth = (search?: string) =>
  search ? search?.length > 2 : false

const fetchCompanies = async (
  search?: string
): Promise<TCompaniesSearchResponse> => {
  const searchQuery = search ? `?search=${search}` : ''
  return HttpClient.get(`api/v1/companies/search${searchQuery}`)
}

export const updateCompany = async (
  id: string,
  payload: TCompanyUpdateRequest
): Promise<TCompanyResponse> =>
  HttpClient.put(`/api/v1/companies/${id}`, payload)

export const registerCompany = async (
  payload: TCompanyRegisterRequest
): Promise<TCompanyRegistrationResponse> => {
  return HttpClient.post(`/api/v1/companies/registration`, payload)
}

export const useCompanies = (search?: string) =>
  useQuery(
    `${CompaniesQueryKeys.companies}.${search}`,
    () => fetchCompanies(search),
    { enabled: needRefecth(search) }
  )

export const getCompany = async (
  companyId: string
): Promise<TCompanyResponse> => HttpClient.get(`/api/v1/companies/${companyId}`)

export const useCompany = (companyId: string) =>
  useQuery(
    `${CompaniesQueryKeys.company}.${companyId}`,
    () => getCompany(companyId),
    { enabled: true }
  )
