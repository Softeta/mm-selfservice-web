import { Button } from 'Components/Atoms'
import {
  useDropzone,
  FileError,
  Accept,
  FileRejection,
  DropEvent
} from 'react-dropzone'
import { useState, useEffect, useCallback, ReactNode } from 'react'
import { ReactComponent as TrashIcon } from 'Assets/Icons/trash.svg'
import { useTranslation } from 'react-i18next'
import { TFile } from './types'

const bytesToMegaBytes = (bytes: number) => (bytes / 1024 ** 2).toFixed(2)

type TFileUpload = {
  /** css class names */
  className?: string
  /** Max allowed file size in bytes */
  maxSize?: number
  /** Label for the button */
  label: string
  /** Supported file types */
  supportedFileTypes: Accept
  /** Selected file */
  selectedFile?: TFile
  /** Button type */
  buttonType?: 'primary' | 'secondary'
  /** Description */
  description?: string
  /** No active buttons when loading */
  loading?: boolean
  /** Allow for other components to unset the selected file. */
  selectedFileCanBeUnset?: boolean
  /** On file upload callback */
  onFileUploaded?: (files?: TFile) => void
  /** On file drop callback */
  onFileDropped?: (files?: TFile) => void
  /** On file upload error callback */
  onFileUploadError?: (error?: FileError) => void
  /** Custom remove handler */
  onHandleRemoveFileClick?: () => void
  /** Custom file render method */
  renderFile?: (file?: TFile) => ReactNode
  /** Flag to mark if show max size or not */
}

export const FileUpload = ({
  className,
  label,
  maxSize,
  supportedFileTypes,
  buttonType,
  description,
  selectedFile,
  loading,
  selectedFileCanBeUnset,
  onFileUploadError,
  onFileUploaded,
  onFileDropped,
  onHandleRemoveFileClick,
  renderFile
}: TFileUpload) => {
  const { t } = useTranslation()
  const [uploadedFile, setUploadedFile] = useState<TFile | undefined>(
    selectedFile
  )
  const [error, setError] = useState<FileError[]>()

  const buildFile = (file: File) =>
    Object.assign(file, {
      uri: file.size ? URL.createObjectURL(file) : ''
    })

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (fileRejections.length) {
        setError(fileRejections[0].errors)
        return
      }

      const file = buildFile(acceptedFiles[0])
      setUploadedFile(file)
      onFileDropped?.(file)
      setError(undefined)
    },
    []
  )

  useEffect(() => {
    if (selectedFile || selectedFileCanBeUnset === true) {
      setUploadedFile(selectedFile)
    }
  }, [selectedFile])

  useEffect(() => {
    onFileUploaded?.(uploadedFile)
  }, [uploadedFile])

  useEffect(() => {
    onFileUploadError?.(error?.[0])
    if (error?.[0]) {
      setUploadedFile(undefined)
    }
  }, [onFileUploadError, error])

  const handleRemoveFileClick = () => {
    setError(undefined)
    setUploadedFile(undefined)
    onFileUploadError?.()
    onFileUploaded?.()
  }

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: supportedFileTypes,
    maxSize: maxSize,
    onDrop
  })

  return (
    <div className={className}>
      {renderFile && renderFile(uploadedFile)}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex flex-wrap justify-center">
          <Button
            disabled={loading}
            text={label}
            variant={buttonType}
            extraClassName="mb-3"
            onClick={(e) => e.preventDefault()}
          />
          {description && (
            <p className="w-full text-center text-xs text-nobel">
              {description}
              {maxSize && ` (max ${bytesToMegaBytes(maxSize)}MB)`}
            </p>
          )}
        </div>
      </div>
      {uploadedFile && uploadedFile.uri && uploadedFile.name && (
        <>
          {!renderFile && (
            <div className="mt-6 grid grid-cols-[1fr_auto] gap-2 rounded-lg bg-pampas p-5">
              <span className="text-xs uppercase text-dusty-gray">
                {`${uploadedFile.name.split('.').pop()} - ${bytesToMegaBytes(
                  uploadedFile.size
                )}MB`}
              </span>
              <p
                className="flex cursor-pointer gap-2 font-medium text-blue-ribbon"
                onClick={onHandleRemoveFileClick || handleRemoveFileClick}
              >
                <TrashIcon />
                <span>{t('fileUploader.remove')}</span>
              </p>
              <p className="col-span-2 text-base font-semibold">
                {uploadedFile.name}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
