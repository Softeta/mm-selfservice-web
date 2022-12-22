import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { Input, TextArea } from 'Components/Atoms'
import { DatePicker } from 'Components/Molecules/DatePicker'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PositionSingleSelect from 'Components/Organisms/PositionSingleSelect'
import WorkExperienceType from 'API/Types/Enums/workExperienceType'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { useParams } from 'react-router-dom'
import {
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'
import { SkillsSelect } from 'Components/Organisms/SkillsSelect'
import { DeleteButton } from 'Components/Organisms/DeleteButton'

type IProps = {
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

const currentDate = new Date()

type TDefaultValues = {
  candidateWorkExperiences: TCandidateWorkExperience[]
}

const validationSchema = yup.object({
  jobPosition: yup.object().required(),
  jobCompany: yup.string().required(),
  jobStartDate: yup.date().max(currentDate).required(),
  jobEndDate: yup.date().max(currentDate).nullable()
})

export const ExperienceForm = ({
  onFormPostSubmit,
  controlsBuilder
}: IProps) => {
  const { type, experienceEditId } = useParams()
  const isProject = type === WorkExperienceType.Project

  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    candidateWorkExperiences:
      state.candidateProfile.candidate!.candidateWorkExperiences!
  }))

  const dispatch = useDispatch()

  const getExperience = () => {
    if (experienceEditId) {
      const exp = defaultValues.candidateWorkExperiences.find(
        (exp) => exp.id === experienceEditId
      )

      return {
        ...exp,
        jobCompany: exp?.companyName,
        jobPosition: exp?.position,
        jobStartDate: new Date(exp?.from ?? ''),
        jobEndDate: exp?.to ? new Date(exp?.to) : undefined,
        jobSkills: exp?.skills,
        jobDescription: exp?.jobDescription
      }
    }
    return undefined
  }

  const experience = getExperience()
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: experience,
    resolver: yupResolver(validationSchema)
  })
  const companyName = watch('jobCompany')
  const jobPosition = watch('jobPosition')
  const jobStartDate = watch('jobStartDate')
  const jobEndDate = watch('jobEndDate')
  const jobDescription = watch('jobDescription')
  const jobSkills = watch('jobSkills')

  const onRemoveBtnClick = () => {
    dispatch(removeWorkExperience(experience!.id!))
    onFormPostSubmit()
  }

  const onFormSubmit = () => {
    if (experienceEditId) {
      dispatch(
        updateWorkExperience({
          id: experienceEditId,
          type: isProject ? WorkExperienceType.Project : WorkExperienceType.Job,
          companyName: companyName!,
          position: jobPosition!,
          from: jobStartDate!.toISOString(),
          to: jobEndDate?.toISOString(),
          jobDescription: jobDescription,
          isCurrentJob: !jobEndDate,
          skills: jobSkills
        })
      )
    } else {
      dispatch(
        addWorkExperience({
          type: isProject ? WorkExperienceType.Project : WorkExperienceType.Job,
          companyName: companyName!,
          position: jobPosition!,
          from: jobStartDate!.toISOString(),
          to: jobEndDate?.toISOString(),
          jobDescription: jobDescription,
          isCurrentJob: !jobEndDate,
          skills: jobSkills
        })
      )
    }

    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">
        {t(
          isProject
            ? 'candidate.createProfile.project'
            : 'candidate.createProfile.previousEmployment'
        )}
      </h1>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.position')}
      </p>
      <Controller
        name="jobPosition"
        control={control}
        render={({ field }) => (
          <PositionSingleSelect
            className="mb-6"
            selectedItem={field.value || null}
            onItemSelect={field.onChange}
            isError={!!errors.jobPosition}
            label=""
          />
        )}
      />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.company')}
      </p>
      <Input {...register('jobCompany')} isError={!!errors.jobCompany} />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.startDate')}
      </p>
      <Controller
        name="jobStartDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value || null}
            isError={!!errors.jobStartDate}
          />
        )}
      />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.endDate')}
      </p>
      <Controller
        name="jobEndDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value || null}
            isError={!!errors.jobEndDate}
          />
        )}
      />
      <hr className="mb-6" />
      <label className="mb-2 block font-semibold">
        {t('candidate.createProfile.skills')}
      </label>
      <Controller
        control={control}
        name="jobSkills"
        render={({ field }) => (
          <SkillsSelect
            className="mb-6"
            jobPosition={jobPosition}
            selectedTags={field.value}
            onTagsSelect={field.onChange}
            isError={!!errors.jobSkills}
          />
        )}
      />
      <hr className="mb-6" />
      <label className="mb-2 block font-semibold">
        {t(
          isProject
            ? 'candidate.createProfile.whatDoesProjectEntail'
            : 'candidate.createProfile.whatDoesJobEntail'
        )}
      </label>
      <TextArea {...register('jobDescription')} className="pb-32" />
      {experience && (
        <div className="pb-32">
          <DeleteButton
            buttonLabel={t('candidate.createProfile.remove')}
            onDeleteConfirm={onRemoveBtnClick}
            extraClassName="w-full"
            type="button"
            confirmHeader={
              isProject
                ? t('candidate.createProfile.deleteProjectHeader')
                : t('candidate.createProfile.deleteJobHeader')
            }
            confirmLabel={
              isProject
                ? t('candidate.createProfile.deleteProjectConfirm')
                : t('candidate.createProfile.deleteJobConfirm')
            }
            cancelLabel={t('button.cancel')}
          />
        </div>
      )}
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </form>
  )
}
