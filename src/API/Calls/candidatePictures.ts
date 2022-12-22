import { TCandidatePictureUpdateRequest } from 'API/Types/Candidate/candidatePictures'
import { TCandidatesResponse } from 'API/Types/Candidate/candidatesBriefGet'
import { TFileCacheResponse } from 'API/Types/fileCache'
import { HttpClient } from 'Services/HttpClient'
import {
  addFileCache,
  deleteFileCache,
  updateFileCache
} from './Common/fileCache'

const endpoint = 'candidates/pictures'

export const addCandidatePictureCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint)

export const updateCandidatePictureCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint)

export const deleteCandidatePictureCache = async (
  cacheId: string
): Promise<void> => deleteFileCache(cacheId, endpoint)

export const setCandidatePicture = async (
  candidateId: string,
  data: TCandidatePictureUpdateRequest
): Promise<TCandidatesResponse> =>
  HttpClient.post(`/api/v1/candidates/${candidateId}/picture`, data)
