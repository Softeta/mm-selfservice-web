import {
  addCandidateCurriculumVitaeCache,
  deleteCandidateCurriculumVitaeCache,
  updateCandidateCurriculumVitaeCache
} from 'API/Calls/candidateCurriculumVitae'
import { TConfigurations } from 'API/Types/configurations'
import { TFileResponse } from 'API/Types/fileResponse'
import { TextArea } from 'Components/Atoms'
import FileCacheUpload from 'Components/Molecules/FileUpload/FileCacheUpload'
import { TFile } from 'Components/Molecules/FileUpload/types'
import { ConfigurationsContext } from 'Contexts/Configurations/ConfigurationsContext'
import { useContext, useState } from 'react'
import { Controller, ControllerRenderProps, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { setCandidateCurriculumVitae } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { RootState } from 'Store/Slices/rootReducer'

type IProps = {
  headerLabel: string
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  bio?: string
  curriculumVitae?: TFileResponse
}

export const DescriptionForm = ({
  headerLabel,
  controlsBuilder,
  onFormPostSubmit
}: IProps) => {
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    bio: state.candidateProfile.candidate!.bio,
    curriculumVitae: state.candidateProfile.candidate!.curriculumVitae
  }))
  const { fileSupportTypes, maxFileSize } = useContext<TConfigurations>(
    ConfigurationsContext
  )
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { control, watch, register, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCurriculumVitaeLoading, setIsCurriculumVitaeLoading] =
    useState(false)
  const [curriculumVitaeCacheId, setCurriculumVitaeCacheId] = useState<string>()
  const [curriculumVitaeFile, setCurriculumVitaeFile] =
    useState<TFileResponse>()

  const handleCurriculumVitaeUpload = (
    field: ControllerRenderProps<TDefaultValues, 'curriculumVitae'>,
    cacheId?: string,
    file?: TFile
  ): void => {
    if (!file) {
      return
    }

    setCurriculumVitaeFile({
      uri: file.uri,
      name: file.name
    })

    setCurriculumVitaeCacheId(cacheId)
    field.onChange(file)
  }

  const bio = watch('bio')

  const onFormSubmit = async () => {
    const request = {
      bio: bio,
      curriculumVitae: curriculumVitaeFile!,
      curriculumVitaeCache: {
        cacheId: curriculumVitaeCacheId,
        hasChanged: !!curriculumVitaeCacheId
      }
    }

    dispatch(setCandidateCurriculumVitae(request))

    onFormPostSubmit()
  }

  return (
    <>
      <h1 className="mb-20 text-center text-lg">{headerLabel}</h1>
      <label className="mb-2 block font-semibold">
        {t('candidate.createProfile.bioAndCurriculumVitae.biography')}
      </label>
      <TextArea
        {...register('bio')}
        placeholder={t(
          'candidate.createProfile.bioAndCurriculumVitae.placeholder'
        )}
      />
      <div className="mt-6" />
      <Controller
        name="curriculumVitae"
        control={control}
        render={({ field }) => (
          <FileCacheUpload
            maxSize={maxFileSize}
            label={t(
              'candidate.createProfile.bioAndCurriculumVitae.uploadCurriculumVitae'
            )}
            defaultCacheId={curriculumVitaeCacheId}
            onDeleteFileCache={deleteCandidateCurriculumVitaeCache}
            onUpdateFileCache={updateCandidateCurriculumVitaeCache}
            onAddFileCache={addCandidateCurriculumVitaeCache}
            onFileCacheUpdated={(cacheId, file) =>
              handleCurriculumVitaeUpload(field, cacheId, file)
            }
            selectedFile={field.value as TFile}
            onLoading={setIsCurriculumVitaeLoading}
            supportedFileTypes={fileSupportTypes}
            description={t(
              'candidate.createProfile.bioAndCurriculumVitae.fileFormat'
            )}
          />
        )}
      />
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </>
  )
}
