import { CircularProgress } from '@mui/material'
import {
  addCandidateJobMotivationVideoCache,
  deleteCandidateJobMotivationVideoCache,
  updateCandidateJobMotivationVideoCache
} from 'API/Calls/candidateJobMotivationVideo'
import { TConfigurations } from 'API/Types/configurations'
import clsx from 'clsx'
import { FileUpload } from 'Components/Molecules/FileUpload'
import { TFile } from 'Components/Molecules/FileUpload/types'
import { ConfigurationsContext } from 'Contexts/Configurations/ConfigurationsContext'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'
import { useTranslation } from 'react-i18next'
import Utils from 'Utils/utils'

interface IProps {
  selectedFile?: TFile
  onChange: (file?: TFile, cacheId?: string) => void
  onDelete?: () => void
  setIsVideoLoading: Dispatch<SetStateAction<boolean>>
  showBottomControls?: boolean
  containerClassName?: string
  fileSavedSuccessfully?: boolean
}

export const CandidateJobMotivationVideo: React.FC<IProps> = ({
  selectedFile,
  onChange,
  fileSavedSuccessfully
}) => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  const { videoSupportTypes, maxVideoFileSize } = useContext<TConfigurations>(
    ConfigurationsContext
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoCacheId, setVideoCacheId] = useState<string>()

  useEffect(() => {
    if (fileSavedSuccessfully !== undefined) {
      setIsLoading(false)
    }
  }, [fileSavedSuccessfully])

  const assignVideoCache = (id?: string) => {
    setVideoCacheId(id)
  }

  const handleVideoUpload = async (file?: TFile) => {
    if (selectedFile?.uri === file?.uri) {
      return
    }

    setIsLoading(true)

    if (!file) {
      if (videoCacheId) {
        await handleDeleteCandidateJobMotivationVideoCache(videoCacheId)?.catch(
          () => {
            // preventing application from stopping
          }
        )
      }
      assignVideoCache(undefined)
      onChange(file, undefined)
      return
    }

    const response = videoCacheId
      ? await handleUpdateCandidateJobMotivationVideoCache(
          videoCacheId,
          Utils.ObjectToFormData({ file })
        )
      : await addCandidateJobMotivationVideoCache(
          Utils.ObjectToFormData({ file })
        )

    assignVideoCache(response.data.cacheId)
    onChange(file, response.data.cacheId)
  }

  const handleUpdateCandidateJobMotivationVideoCache = (
    cacheId: string,
    data: FormData
  ) => {
    if (!fileSavedSuccessfully) {
      return updateCandidateJobMotivationVideoCache(cacheId, data)
    }
    return addCandidateJobMotivationVideoCache(data)
  }

  const handleDeleteCandidateJobMotivationVideoCache = (cacheId: string) => {
    if (!fileSavedSuccessfully) {
      return deleteCandidateJobMotivationVideoCache(cacheId)
    } else {
      onChange(undefined, undefined)
    }
  }

  return (
    <div className={clsx('grid justify-items-center rounded-t-3xl px-6 py-12')}>
      <div className="grid w-full place-items-center gap-4 lg:w-content-container">
        <span className="text-lg font-bold">{t('candidate.video.header')}</span>
        <div className="h-2"></div>
        <span className="text-base">{t('candidate.video.explanation')}</span>
        <div className="h-8"></div>
        {isLoading && <CircularProgress />}
        {!isLoading && (
          <FileUpload
            maxSize={maxVideoFileSize}
            label={t('candidate.video.uploadVideo')}
            selectedFile={selectedFile}
            onFileUploaded={handleVideoUpload}
            supportedFileTypes={videoSupportTypes}
            loading={false}
            description={t('candidate.video.fileFormat')}
          />
        )}
      </div>
    </div>
  )
}
