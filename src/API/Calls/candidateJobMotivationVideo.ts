import { TFileCacheResponse } from 'API/Types/fileCache'
import {
  addFileCache,
  deleteFileCache,
  updateFileCache
} from './Common/fileCache'

const endpoint = 'candidates/selected-jobs/motivation-videos'

export const addCandidateJobMotivationVideoCache = async (
  data: FormData
): Promise<TFileCacheResponse> => addFileCache(data, endpoint)

export const updateCandidateJobMotivationVideoCache = async (
  cacheId: string,
  data: FormData
): Promise<TFileCacheResponse> => updateFileCache(cacheId, data, endpoint)

export const deleteCandidateJobMotivationVideoCache = async (
  cacheId: string
): Promise<void> => deleteFileCache(cacheId, endpoint)
