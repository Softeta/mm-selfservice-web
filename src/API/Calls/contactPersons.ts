import {
  TCompanyContactPersonCreateRequest,
  TCompanyContactPersonUpdateRequest
} from 'API/Types/Company/companyContactPerson'
import { TContactPerson } from 'API/Types/Company/contactPerson'
import { TContactPersonResponse } from 'API/Types/Company/contactPersonGet'
import { TContacPersonSelfRegistrationRequest } from 'API/Types/Company/contactPersonSelfRegistration'
import { TLegalTerms } from 'API/Types/legalAgreement'
import { TSettings } from 'API/Types/settings'
import { HttpClient } from 'Services/HttpClient'

export enum ContactPersonQueryKeys {
  self = 'self'
}

export const getSelf = async (): Promise<TContactPersonResponse> =>
  HttpClient.get(`api/v1/companies/contact-persons/self`)

export const registerMyself = async (
  data: TContacPersonSelfRegistrationRequest
): Promise<TContactPersonResponse> =>
  HttpClient.post(`api/v1/companies/contact-persons/register`, data)

export const requestEmailVerification = async (): Promise<void> =>
  HttpClient.put(`api/v1/companies/contact-persons/request-verification`)

export const verifyContactPerson = async (
  companyId: string,
  contactId: string,
  verificationKey: string
): Promise<TContactPersonResponse> =>
  HttpClient.put(
    `/api/v1/companies/${companyId}/contact-persons/${contactId}/verify/${verificationKey}`
  )

export const updateContactPersonLegalTerms = async (
  companyId: string,
  contactId: string,
  terms: TLegalTerms
): Promise<TContactPersonResponse> =>
  HttpClient.put(
    `api/v1/companies/${companyId}/contact-persons/${contactId}/legal-terms`,
    terms
  )

export const createContactPerson = async (
  companyId: string,
  payload: TCompanyContactPersonCreateRequest
): Promise<TContactPersonResponse> =>
  HttpClient.post(`/api/v1/companies/${companyId}/contact-persons`, payload)

export const updateContactPerson = async (
  companyId: string,
  contactId: string,
  payload: TCompanyContactPersonUpdateRequest
): Promise<TContactPersonResponse> =>
  HttpClient.put(
    `/api/v1/companies/${companyId}/contact-persons/${contactId}`,
    payload
  )

export const rejectContactPerson = async (
  companyId: string,
  contactId: string
): Promise<void> =>
  HttpClient.put(
    `/api/v1/companies/${companyId}/contact-persons/${contactId}/rejected`
  )

export const updateContactPersonSettings = async (
  companyId: string,
  contactId: string,
  settings: TSettings
): Promise<TContactPersonResponse> =>
  HttpClient.put(
    `/api/v1/companies/${companyId}/contact-persons/${contactId}/settings`,
    settings
  )
