import { TCandidateCurriculumVitaeUpdateRequest } from 'API/Types/Candidate/candidateCurriculumVitaes'
import { TCandidatesResponse } from 'API/Types/Candidate/candidatesBriefGet'
import { TFileCacheResponse } from 'API/Types/fileCache'
import { HttpClient } from 'Services/HttpClient'
import {
  addFileCache,
  deleteFileCache,
  updateFileCache
} from './Common/fileCache'

const endpoint = 'candidates/curriculum-vitaes'

export const addCandidateCurriculumVitaeCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint)

export const updateCandidateCurriculumVitaeCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint)

export const deleteCandidateCurriculumVitaeCache = async (
  cacheId: string
): Promise<void> => deleteFileCache(cacheId, endpoint)

export const setCandidateCurriculumVitae = async (
  candidateId: string,
  data: TCandidateCurriculumVitaeUpdateRequest
): Promise<TCandidatesResponse> =>
  HttpClient.post(`/api/v1/candidates/${candidateId}/curriculum-vitae`, data)
