import { RootState } from 'Store/Slices/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { TFileResponse } from 'API/Types/fileResponse'
import { useContext, useState } from 'react'
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form'
import { TFile } from 'Components/Molecules/FileUpload/types'
import { ConfigurationsContext } from 'Contexts/Configurations/ConfigurationsContext'
import { TConfigurations } from 'API/Types/configurations'
import {
  addCandidatePictureCache,
  deleteCandidatePictureCache,
  updateCandidatePictureCache
} from 'API/Calls/candidatePictures'
import PhotoCacheUpload from 'Components/Organisms/PhotoUpload/PhotoCacheUpload'
import { useTranslation } from 'react-i18next'
import { setCandidatePicture } from 'Store/Slices/CandidateProfile/candidateProfileReducer'

type IProps = {
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  picture?: TFileResponse
}

export const PictureForm = ({ onFormPostSubmit, controlsBuilder }: IProps) => {
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    picture: state.candidateProfile.candidate!.picture
  }))
  const { candidatePicture } = useContext<TConfigurations>(
    ConfigurationsContext
  )
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPictureLoading, setIsPictureLoading] = useState(false)
  const [pictureCacheId, setPictureCacheId] = useState<string>()
  const [pictureFile, setPictureFile] = useState<TFileResponse>()
  const [photoRemoved, setPhotoRemoved] = useState(false)

  const handlePictureUpload = (
    field: ControllerRenderProps<TDefaultValues, 'picture'>,
    cacheId?: string,
    file?: TFile
  ): void => {
    if (!file) {
      return
    }

    setPictureFile({
      uri: file.uri,
      name: file.name
    })

    setPictureCacheId(cacheId)
    field.onChange(file)
  }

  const onFormSubmit = async () => {
    const request = {
      picture: pictureFile!,
      pictureCache: {
        cacheId: pictureCacheId,
        hasChanged: !!pictureCacheId || photoRemoved
      }
    }

    dispatch(setCandidatePicture(request))
    onFormPostSubmit()
  }

  return (
    <>
      <Controller
        name="picture"
        control={control}
        render={({ field }) => (
          <PhotoCacheUpload
            croppedPhotoAspectRatio={candidatePicture.aspectRatio}
            maxWidth={candidatePicture.maxWidth}
            maxHeight={candidatePicture.maxHeight}
            label={t('candidate.createProfile.photo.upload')}
            defaultCacheId={pictureCacheId}
            onDeletePhotoCache={deleteCandidatePictureCache}
            onUpdatePhotoCache={updateCandidatePictureCache}
            onAddPhotoCache={addCandidatePictureCache}
            onPhotoCacheUpdated={(cacheId, file) =>
              handlePictureUpload(field, cacheId, file)
            }
            selectedPhoto={field.value as TFile}
            onLoading={setIsPictureLoading}
            description={t('candidate.createProfile.photo.fileFormat')}
            onPhotoRemoved={() => setPhotoRemoved(true)}
          />
        )}
      />
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </>
  )
}
