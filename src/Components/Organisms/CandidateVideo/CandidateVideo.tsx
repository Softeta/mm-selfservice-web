import {
  addCandidateVideoCache,
  deleteCandidateVideoCache,
  updateCandidateVideoCache
} from 'API/Calls/candidateVideo'
import { TConfigurations } from 'API/Types/configurations'
import clsx from 'clsx'
import { CircleButton } from 'Components/Atoms'
import FileCacheUpload from 'Components/Molecules/FileUpload/FileCacheUpload'
import { TFile } from 'Components/Molecules/FileUpload/types'
import { ConfigurationsContext } from 'Contexts/Configurations/ConfigurationsContext'
import { Dispatch, SetStateAction, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface IProps {
  selectedFile?: TFile
  onChange: (file?: TFile, cacheId?: string) => void
  onDelete?: () => void
  setIsVideoLoading: Dispatch<SetStateAction<boolean>>
  showBottomControls?: boolean
  containerClassName?: string
  backgroundClassName?: string
}

export const CandidateVideo: React.FC<IProps> = ({
  selectedFile,
  onChange,
  onDelete,
  setIsVideoLoading,
  showBottomControls = true,
  backgroundClassName = 'bg-white'
}) => {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { videoSupportTypes, maxVideoFileSize } = useContext<TConfigurations>(
    ConfigurationsContext
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoCacheId, setVideoCacheId] = useState<string>()

  const handleVideoUpload = (cacheId?: string, file?: TFile): void => {
    if (!file) {
      if (onDelete) {
        setVideoCacheId(undefined)
        onDelete?.()
      }
      return
    }

    setVideoCacheId(cacheId)
    onChange(file, cacheId)
  }

  return (
    <div
      className={clsx(
        'relative grid justify-items-center rounded-t-3xl p-12',
        backgroundClassName
      )}
    >
      <span className="text-lg font-bold">{t('candidate.video.header')}</span>
      <div className="h-2"></div>
      <span className="text-base">{t('candidate.video.explanation')}</span>
      <div className="h-8"></div>
      <FileCacheUpload
        maxSize={maxVideoFileSize}
        label={t('candidate.video.uploadVideo')}
        defaultCacheId={videoCacheId}
        onDeleteFileCache={deleteCandidateVideoCache}
        onUpdateFileCache={updateCandidateVideoCache}
        onAddFileCache={addCandidateVideoCache}
        onFileCacheUpdated={handleVideoUpload}
        selectedFile={selectedFile}
        onLoading={setIsVideoLoading}
        supportedFileTypes={videoSupportTypes}
        description={t('candidate.video.fileFormat')}
      />
      {showBottomControls && (
        <div className="absolute bottom-2 left-4">
          <CircleButton
            iconType="back"
            variant="secondary"
            onClick={() => navigate('/myprofile')}
          />
        </div>
      )}
    </div>
  )
}
