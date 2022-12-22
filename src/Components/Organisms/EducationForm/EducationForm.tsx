import { useTranslation } from 'react-i18next'
import { useForm, Controller, ControllerRenderProps } from 'react-hook-form'
import { Input, TextArea } from 'Components/Atoms'
import { DatePicker } from 'Components/Molecules/DatePicker'
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
  addEducation,
  removeEducation,
  updateEducation
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { RootState } from 'Store/Slices/rootReducer'
import { TFileResponse } from 'API/Types/fileResponse'
import { DeleteButton } from 'Components/Organisms/DeleteButton'
import { TConfigurations } from 'API/Types/configurations'
import { ConfigurationsContext } from 'Contexts/Configurations/ConfigurationsContext'

type IProps = {
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  schoolName?: string
  degree?: string
  fieldOfStudy?: string
  from?: Date
  to?: Date
  studiesDescription?: string
  certificate?: TFileResponse
}

const validationSchema = yup.object({
  schoolName: yup.string().required(),
  degree: yup.string().required(),
  fieldOfStudy: yup.string().required(),
  from: yup.date().required(),
  to: yup.date()
})

export const EducationForm = ({
  onFormPostSubmit,
  controlsBuilder
}: IProps) => {
  const { fileSupportTypes, maxFileSize } = useContext<TConfigurations>(
    ConfigurationsContext
  )
  const { t } = useTranslation()
  const { educationId } = useParams()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    ...state.candidateProfile.candidate!.candidateEducations.find(
      (ed) => ed.id === educationId
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
  const schoolName = watch('schoolName')
  const degree = watch('degree')
  const fieldOfStudy = watch('fieldOfStudy')
  const from = watch('from')
  const to = watch('to')
  const studiesDescription = watch('studiesDescription')

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
      schoolName: schoolName!,
      degree: degree!,
      fieldOfStudy: fieldOfStudy!,
      from: from!,
      to: to,
      studiesDescription: studiesDescription,
      isStillStudying: !!from,
      certificate: {
        cacheId: certificateCacheId,
        hasChanged: !!certificateCacheId
      }
    }

    if (educationId) {
      dispatch(updateEducation({ id: educationId, request }))
    } else {
      dispatch(addEducation(request))
    }

    onFormPostSubmit()
  }

  const onRemoveBtnClick = () => {
    dispatch(removeEducation(educationId!))
    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">
        {t('candidate.createProfile.education.headerTitle')}
      </h1>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.education.placeOfEducation')}
      </p>
      <Input {...register('schoolName')} isError={!!errors.schoolName} />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.education.educationDegree')}
      </p>
      <Input {...register('degree')} isError={!!errors.fieldOfStudy} />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.education.studyProgramme')}
      </p>
      <Input {...register('fieldOfStudy')} isError={!!errors.fieldOfStudy} />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.startDate')}
      </p>
      <Controller
        name="from"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value || null}
            isError={!!errors.from}
          />
        )}
      />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.endDate')}
      </p>
      <Controller
        name="to"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value || null}
            isError={!!errors.to}
          />
        )}
      />
      <label className="mb-2 block font-semibold">
        {t('candidate.createProfile.education.description')}
      </label>
      <TextArea {...register('studiesDescription')} />
      <div className="mt-6"></div>
      <Controller
        name="certificate"
        control={control}
        render={({ field }) => (
          <FileCacheUpload
            maxSize={maxFileSize}
            label={t('candidate.createProfile.education.uploadCertificate')}
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
            description={t('candidate.createProfile.education.fileFormat')}
          />
        )}
      />
      {educationId && (
        <>
          <div className="mt-6"></div>
          <div className="pb-6">
            <DeleteButton
              buttonLabel={t('candidate.createProfile.remove')}
              onDeleteConfirm={onRemoveBtnClick}
              extraClassName="w-full"
              type="button"
              confirmHeader={t(
                'candidate.createProfile.course.deleteEducationHeader'
              )}
              confirmLabel={t(
                'candidate.createProfile.course.deleteEducationConfirm'
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
