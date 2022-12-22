import { useTranslation } from 'react-i18next'
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form'
import { Input, TextArea } from 'Components/Atoms'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import FileCacheUpload from 'Components/Molecules/FileUpload/FileCacheUpload'
import { TFile } from 'Components/Molecules/FileUpload/types'
import {
  addCertificateCache,
  deleteCertificateCache,
  updateCertificateCache
} from 'API/Calls/candidateCertificate'
import { useContext, useState } from 'react'
import {
  addCourse,
  removeCourse,
  updateCourse
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { RootState } from 'Store/Slices/rootReducer'
import { TFileResponse } from 'API/Types/fileResponse'
import { DeleteButton } from 'Components/Organisms/DeleteButton'
import { ConfigurationsContext } from 'Contexts/Configurations/ConfigurationsContext'
import { TConfigurations } from 'API/Types/configurations'

type IProps = {
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  name?: string
  issuingOrganization?: string
  description?: string
  certificate?: TFileResponse
}

const validationSchema = yup.object({
  name: yup.string().required(),
  issuingOrganization: yup.string().required()
})

export const CourseForm = ({ onFormPostSubmit, controlsBuilder }: IProps) => {
  const { fileSupportTypes, maxFileSize } = useContext<TConfigurations>(
    ConfigurationsContext
  )
  const { t } = useTranslation()
  const { courseId } = useParams()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    ...state.candidateProfile.candidate!.candidateCourses.find(
      (course) => course.id === courseId
    )
  }))
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isCertificateLoading, setIsCertificateLoading] = useState(false)

  const [certificateCacheId, setCertificateCacheId] = useState<string>()
  const name = watch('name')
  const issuingOrganization = watch('issuingOrganization')
  const description = watch('description')

  const handleCertificateUpload = (
    field: ControllerRenderProps<TDefaultValues, 'certificate'>,
    cacheId?: string,
    file?: TFile
  ): void => {
    setCertificateCacheId(cacheId)
    field.onChange(file)
  }

  const onFormSubmit = async () => {
    const request = {
      name: name!,
      issuingOrganization: issuingOrganization!,
      description: description!,
      certificate: {
        cacheId: certificateCacheId,
        hasChanged: !!certificateCacheId
      }
    }

    if (courseId) {
      dispatch(updateCourse({ id: courseId, request }))
    } else {
      dispatch(addCourse(request))
    }

    onFormPostSubmit()
  }

  const onRemoveBtnClick = () => {
    dispatch(removeCourse(courseId!))
    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">
        {t('candidate.createProfile.course.headerTitle')}
      </h1>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.course.placeOfCourse')}
      </p>
      <Input
        {...register('issuingOrganization')}
        isError={!!errors.issuingOrganization}
      />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.course.name')}
      </p>
      <Input {...register('name')} isError={!!errors.name} />
      <label className="mb-2 block font-semibold">
        {t('candidate.createProfile.course.description')}
      </label>
      <TextArea {...register('description')} />
      <div className="mt-6"></div>
      <Controller
        name="certificate"
        control={control}
        render={({ field }) => (
          <FileCacheUpload
            maxSize={maxFileSize}
            label={t('candidate.createProfile.course.uploadCertificate')}
            defaultCacheId={certificateCacheId}
            onDeleteFileCache={deleteCertificateCache}
            onUpdateFileCache={updateCertificateCache}
            onAddFileCache={addCertificateCache}
            onFileCacheUpdated={(cacheId, file) =>
              handleCertificateUpload(field, cacheId, file)
            }
            selectedFile={field.value as TFile}
            onLoading={setIsCertificateLoading}
            supportedFileTypes={fileSupportTypes}
            description={t('candidate.createProfile.course.fileFormat')}
          />
        )}
      />
      {courseId && (
        <>
          <div className="mt-6"></div>
          <div className="pb-6">
            <DeleteButton
              buttonLabel={t('candidate.createProfile.remove')}
              onDeleteConfirm={onRemoveBtnClick}
              extraClassName="w-full"
              type="button"
              confirmHeader={t(
                'candidate.createProfile.course.deleteCourseHeader'
              )}
              confirmLabel={t(
                'candidate.createProfile.course.deleteCourseConfirm'
              )}
              cancelLabel={t('button.cancel')}
            />
          </div>
        </>
      )}
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </form>
  )
}
