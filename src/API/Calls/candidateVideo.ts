import { TCandidateResponse } from 'API/Types/Candidate/candidateGet'
import { TFileCacheResponse } from 'API/Types/fileCache'
import { TFileUpdateRequest } from 'API/Types/fileRequest'
import { HttpClient } from 'Services/HttpClient'
import {
  addFileCache,
  deleteFileCache,
  updateFileCache
} from './Common/fileCache'

const endpoint = 'candidates/videos'

export const addCandidateVideoCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint)

export const updateCandidateVideoCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint)

export const deleteCandidateVideoCache = async (
  cacheId: string
): Promise<void> => deleteFileCache(cacheId, endpoint)

export const updateCandidateVideos = async (
  candidateId: string,
  data: TFileUpdateRequest
): Promise<TCandidateResponse> =>
  HttpClient.put(`/api/v1/candidates/${candidateId}/videos`, { video: data })
