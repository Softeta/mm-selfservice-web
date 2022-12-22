import { TLocationResponse } from 'API/Types/locations'
import { HttpClient } from 'Services/HttpClient'

export const fetchLocation = async (addressLine?: string): Promise<TLocationResponse> => 
  HttpClient.get(`/api/v1/locations?address=${addressLine}`)
