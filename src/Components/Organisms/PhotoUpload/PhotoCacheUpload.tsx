import { TFileCacheResponse } from 'API/Types/fileCache'
import { TFile } from 'Components/Molecules/FileUpload/types'
import { useState } from 'react'
import Utils from 'Utils/utils'
import { PhotoUpload } from './PhotoUpload'

interface IProps {
  /** Photo aspect ratio for crop */
  croppedPhotoAspectRatio: number

  /** css class names */
  className?: string

  /** Label */
  label: string

  /** Selected file */
  selectedPhoto?: TFile

  /** Initial cacheId */
  defaultCacheId?: string

  description?: string

  /** Max image width */
  maxWidth: number

  /** Max image height */
  maxHeight: number

  /** Callback to send updated cacheid */
  onPhotoCacheUpdated: (cacheId?: string, file?: TFile) => void

  /** API call to delete file cache */
  onDeletePhotoCache: (cacheId: string) => Promise<void>

  /** API call to update file cache */
  onUpdatePhotoCache: (
    cacheId: string,
    file: FormData
  ) => Promise<TFileCacheResponse>

  /** API call to add file cache */
  onAddPhotoCache: (file: FormData) => Promise<TFileCacheResponse>

  /** Callback to send loading status */
  onLoading: (loading: boolean) => void

  /** On photo remove callback */
  onPhotoRemoved?: () => void
}

export const PhotoCacheUpload = ({
  croppedPhotoAspectRatio,
  className,
  selectedPhoto,
  label,
  defaultCacheId,
  description,
  maxWidth,
  maxHeight,
  onPhotoCacheUpdated,
  onDeletePhotoCache,
  onUpdatePhotoCache,
  onAddPhotoCache,
  onLoading,
  onPhotoRemoved
}: IProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [cacheId, setCacheId] = useState(defaultCacheId)

  const setLoaders = (loading: boolean) => {
    onLoading(loading)
    setIsLoading(loading)
  }

  const assignPhotoCache = (id?: string, file?: TFile) => {
    setCacheId(id)
    setLoaders(false)
    onPhotoCacheUpdated(id, file)
  }

  const handlePhotoUpload = async (file?: TFile) => {
    if (selectedPhoto?.uri === file?.uri) {
      return
    }

    setLoaders(true)

    if (!file && cacheId) {
      await onDeletePhotoCache(cacheId)
      assignPhotoCache(undefined)
      return
    }

    if (!file) {
      assignPhotoCache(undefined)
      setLoaders(false)
      return
    }

    if (cacheId) {
      const response = await onUpdatePhotoCache(
        cacheId,
        Utils.ObjectToFormData({ file })
      )
      assignPhotoCache(response.data.cacheId, file)
    } else {
      const response = await onAddPhotoCache(Utils.ObjectToFormData({ file }))
      assignPhotoCache(response.data.cacheId, file)
    }
  }

  return (
    <PhotoUpload
      croppedPhotoAspectRatio={croppedPhotoAspectRatio}
      className={className}
      label={label}
      selectedPhoto={selectedPhoto}
      onPhotoUploaded={handlePhotoUpload}
      loading={isLoading}
      description={description}
      maxWidth={maxWidth}
      maxHeight={maxHeight}
      onPhotoRemoved={onPhotoRemoved}
    />
  )
}

export default PhotoCacheUpload
