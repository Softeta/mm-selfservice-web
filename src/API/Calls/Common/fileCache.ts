import { TFileCacheResponse } from 'API/Types/fileCache'
import { HttpClient } from 'Services/HttpClient'

export const addFileCache = async (
  data: FormData,
  endpoint: string
): Promise<TFileCacheResponse> => HttpClient.post(`/api/v1/${endpoint}`, data)

export const updateFileCache = async (
  cacheId: string,
  data: FormData,
  endpoint: string
): Promise<TFileCacheResponse> =>
  HttpClient.put(`/api/v1/${endpoint}/${cacheId}`, data)

export const deleteFileCache = async (
  cacheId: string,
  endpoint: string
): Promise<void> => HttpClient.delete(`/api/v1/${endpoint}/${cacheId}`)
