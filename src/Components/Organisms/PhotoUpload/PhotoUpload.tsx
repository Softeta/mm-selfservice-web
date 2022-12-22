import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { centerCrop, Crop, makeAspectCrop, PixelCrop } from 'react-image-crop'
import ReactCrop from 'react-image-crop'
import { useDebounceEffect } from 'Hooks/useDebounce'
import { createImageBlob } from './Utils/imageUtils'
import { TConfigurations } from 'API/Types/configurations'
import { ConfigurationsContext } from 'Contexts/Configurations/ConfigurationsContext'
import { Button } from 'Components/Atoms'
import { FileUpload } from '../../Molecules/FileUpload'
import { ModalContainer } from 'Components/Atoms/ModalContainer'
import { Notification } from '../../Molecules/Notification'
import { TFile } from '../../Molecules/FileUpload/types'
import { useTranslation } from 'react-i18next'
import { FileError } from 'react-dropzone'
import { ReactComponent as TrashIcon } from 'Assets/Icons/trash.svg'
import 'react-image-crop/dist/ReactCrop.css'

type TPhotoUpload = {
  /** Photo aspect ratio for crop */
  croppedPhotoAspectRatio: number

  /** css class names */
  className?: string

  /** Label for the button */
  label: string

  /** Selected photo */
  selectedPhoto?: TFile

  /** Button type */
  buttonType?: 'primary' | 'secondary'

  /** Description */
  description?: string

  /** No active buttons when loading */
  loading?: boolean

  /** Max image width */
  maxWidth: number

  /** Max image height */
  maxHeight: number

  /** On photo upload callback */
  onPhotoUploaded?: (files?: TFile) => void

  /** On photo upload error callback */
  onPhotoUploadError?: (error?: FileError) => void

  /** On photo remove callback */
  onPhotoRemoved?: () => void
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

export const PhotoUpload = ({
  croppedPhotoAspectRatio,
  className,
  label,
  buttonType,
  description,
  selectedPhoto,
  loading,
  maxWidth,
  maxHeight,
  onPhotoUploadError,
  onPhotoUploaded,
  onPhotoRemoved
}: TPhotoUpload) => {
  const { t } = useTranslation()
  const { photoImageSupportTypes } = useContext<TConfigurations>(
    ConfigurationsContext
  )
  const [cropTransactionOpen, setCropTransactionOpen] = useState(false)
  const [imgSrc, setImgSrc] = useState('')
  const imgRef = useRef<HTMLImageElement>(null)
  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [errorMessage, setErrorMessage] = useState<string>()
  const [imageName, setImageName] = useState<string>()
  const [cropInProgress, setCropInProgress] = useState(false)
  const [uploadedPhoto, setUploadedPhoto] = useState<TFile | undefined>(
    selectedPhoto
  )
  const [error, setError] = useState<FileError[]>()

  useDebounceEffect(
    () => {
      setErrorMessage(undefined)
    },
    1000,
    [errorMessage]
  )

  useEffect(() => {
    if (uploadedPhoto) {
      setUploadedPhoto(uploadedPhoto)
    }
  }, [uploadedPhoto])

  useEffect(() => {
    onPhotoUploadError?.(error?.[0])
    if (error?.[0]) {
      setUploadedPhoto(undefined)
    }
  }, [onPhotoUploadError, error])

  const handleRemoveFileClick = () => {
    setError(undefined)
    setUploadedPhoto(undefined)
    onPhotoUploadError?.()
    onPhotoUploaded?.()
    onPhotoRemoved?.()
  }

  const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = event.currentTarget

    setCrop(centerAspectCrop(width, height, croppedPhotoAspectRatio))
  }

  const onFileDropped = useCallback((file: TFile | undefined) => {
    if (!file) {
      return
    }

    setImageName(file.name)

    setCrop(undefined)

    const reader = new FileReader()
    reader.addEventListener('load', () => {
      setImgSrc(reader?.result?.toString() || '')
      setCropTransactionOpen(true)
    })
    reader.readAsDataURL(file)
  }, [])

  const completeImageCrop = async () => {
    if (!completedCrop) {
      setErrorMessage(t('imageCrop.selectAreaError'))
      return
    }

    setCropInProgress(true)
    const imageCropped = await createImageBlob(
      imageName!,
      imgRef,
      completedCrop,
      maxWidth,
      maxHeight
    )

    if (!imageCropped) {
      setErrorMessage(t('imageCrop.cropError'))
      return
    }

    setCropInProgress(false)
    setCropTransactionOpen(false)

    const photo = Object.assign(imageCropped, {
      uri: imageCropped.size ? URL.createObjectURL(imageCropped) : ''
    })

    setUploadedPhoto(photo)
    onPhotoUploaded?.(photo)
  }

  const cancelCrop = async () => {
    setImgSrc('')
    setCrop(undefined)
    setCompletedCrop(undefined)
    setImageName(undefined)
    setCropTransactionOpen(false)
  }

  return (
    <>
      <FileUpload
        className={className}
        buttonType={buttonType}
        description={description}
        loading={loading}
        label={label || t('button.uploadPhoto')}
        supportedFileTypes={photoImageSupportTypes}
        onFileDropped={onFileDropped}
        onHandleRemoveFileClick={handleRemoveFileClick}
        selectedFileCanBeUnset={true}
        renderFile={() => (
          <>
            {uploadedPhoto && (
              <div className="grid place-content-center place-items-center">
                <img src={uploadedPhoto.uri} />
                <div className="h-2"></div>
                <p
                  className="flex cursor-pointer gap-2 font-medium text-blue-ribbon"
                  onClick={handleRemoveFileClick}
                >
                  <TrashIcon />
                  <span>{t('fileUploader.remove')}</span>
                </p>
                <div className="h-4"></div>
              </div>
            )}
          </>
        )}
      />
      <ModalContainer
        visible={cropTransactionOpen}
        className="grid place-items-center justify-items-center bg-spring-wood"
      >
        <div className="flex max-h-[90vh] max-w-content-container flex-col items-center">
          {errorMessage && (
            <Notification
              className="fixed inset-x-0 bottom-0 overflow-y-auto overflow-x-hidden"
              type={'error'}
            >
              {errorMessage}
            </Notification>
          )}
          <div className="max-h-photo-crop-container shrink overflow-hidden sm:max-h-[unset] sm:overflow-visible">
            <ReactCrop
              crop={crop}
              onChange={(crop) => setCrop(crop)}
              onComplete={setCompletedCrop}
              aspect={croppedPhotoAspectRatio}
            >
              <img
                ref={imgRef}
                src={imgSrc}
                onLoad={onImageLoad}
                className="m-auto w-content-container object-cover"
              />
            </ReactCrop>
          </div>
          <div className="h-8"></div>
          <div>
            <Button
              disabled={cropInProgress}
              text={t('button.cropImage')}
              onClick={completeImageCrop}
            />
            <div className="h-2"></div>
            <Button
              disabled={cropInProgress}
              text={t('button.cancel')}
              onClick={cancelCrop}
              variant="custom"
              className="border-2 border-cathedral bg-spring-wood text-cathedral"
            />
          </div>
        </div>
      </ModalContainer>
    </>
  )
}
