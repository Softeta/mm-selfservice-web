import { TFileCacheResponse } from 'API/Types/fileCache'
import { useState } from 'react'
import { Accept } from 'react-dropzone'
import Utils from 'Utils/utils'
import { FileUpload } from './FileUpload'
import { TFile } from './types'

interface IProps {
  /** css class names */
  className?: string
  /** Max allowed file size in bytes */
  maxSize?: number
  /** Support types */
  supportedFileTypes: Accept
  /** Label */
  label: string
  /** Selected file */
  selectedFile?: TFile
  /** Initial cacheId */
  defaultCacheId?: string
  description?: string
  /** Callback to send updated cacheid */
  onFileCacheUpdated: (cacheId?: string, file?: TFile) => void
  /** API call to delete file cache */
  onDeleteFileCache: (cacheId: string) => Promise<void>
  /** API call to update file cache */
  onUpdateFileCache: (
    cacheId: string,
    file: FormData
  ) => Promise<TFileCacheResponse>
  /** API call to add file cache */
  onAddFileCache: (file: FormData) => Promise<TFileCacheResponse>
  /** Callback to send loading status */
  onLoading: (loading: boolean) => void
}

export const FileCacheUpload = ({
  className,
  maxSize,
  supportedFileTypes,
  selectedFile,
  label,
  defaultCacheId,
  description,
  onFileCacheUpdated,
  onDeleteFileCache,
  onUpdateFileCache,
  onAddFileCache,
  onLoading
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [cacheId, setCacheId] = useState(defaultCacheId)

  const setLoaders = (loading: boolean) => {
    onLoading(loading)
    setIsLoading(loading)
  }

  const assignFileCache = (id?: string, file?: TFile) => {
    setCacheId(id)
    setLoaders(false)
    onFileCacheUpdated(id, file)
  }

  const handleFileUpload = async (file?: TFile) => {
    if (selectedFile?.uri === file?.uri) {
      return
    }

    setLoaders(true)

    if (!file && cacheId) {
      await onDeleteFileCache(cacheId).catch(() => {
        // preventing application from stopping
      })
    }

    if (!file) {
      assignFileCache()
      return
    }

    if (cacheId) {
      const response = await onUpdateFileCache(
        cacheId,
        Utils.ObjectToFormData({ file })
      )
      assignFileCache(response.data.cacheId, file)
    } else {
      const response = await onAddFileCache(Utils.ObjectToFormData({ file }))
      assignFileCache(response.data.cacheId, file)
    }
  }

  return (
    <FileUpload
      className={className}
      maxSize={maxSize}
      label={label}
      selectedFile={selectedFile}
      onFileUploaded={handleFileUpload}
      supportedFileTypes={supportedFileTypes}
      loading={isLoading}
      description={description}
    />
  )
}

export default FileCacheUpload
