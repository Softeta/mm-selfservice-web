import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { Input, TextArea } from 'Components/Atoms'
import { DatePicker } from 'Components/Molecules/DatePicker'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PositionSingleSelect from 'Components/Organisms/PositionSingleSelect'
import WorkExperienceType from 'API/Types/Enums/workExperienceType'
import { SkillsSelect } from 'Components/Organisms/SkillsSelect'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { useNavigate } from 'react-router-dom'
import {
  addWorkExperience,
  updateWorkExperience
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'

const validationSchema = yup.object({
  position: yup.object().required(),
  companyName: yup.string().required(),
  from: yup.date().required()
})

export const Step8 = () => {
  const { t } = useTranslation()
  const defaultValues = useSelector<
    RootState,
    TCandidateWorkExperience | undefined
  >((state) => state.candidateProfile.currentWorkExperience)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
  const companyName = watch('companyName')
  const jobPosition = watch('position')
  const currentJobStartDate = watch('from')
  const skills = watch('skills')
  const jobDescription = watch('jobDescription')

  const onFormSubmit = async () => {
    if (defaultValues?.id) {
      dispatch(
        updateWorkExperience({
          id: defaultValues?.id,
          type: WorkExperienceType.Job,
          companyName: companyName!,
          position: jobPosition!,
          from: currentJobStartDate!,
          isCurrentJob: true,
          skills: skills,
          jobDescription: jobDescription
        })
      )
    } else {
      dispatch(
        addWorkExperience({
          type: WorkExperienceType.Job,
          companyName: companyName!,
          position: jobPosition!,
          from: currentJobStartDate!,
          isCurrentJob: true,
          skills: skills,
          jobDescription: jobDescription
        })
      )
    }
    navigate('/myprofile/profile-creation/step-9')
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="pt-16">
        <h1 className="mb-20 text-center text-lg">
          {t('candidate.createProfile.currentEmployment')}
        </h1>
        <p className="mb-2 font-semibold">
          {t('candidate.createProfile.currentEmployment.position')}
        </p>
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <PositionSingleSelect
              className="mb-6"
              selectedItem={field.value || null}
              onItemSelect={field.onChange}
              isError={!!errors.position}
              label=""
            />
          )}
        />
        <p className="mb-2 font-semibold">
          {t('candidate.createProfile.currentEmployment.company')}
        </p>
        <Input {...register('companyName')} isError={!!errors.companyName} />
        <p className="mb-2 font-semibold">
          {t('candidate.createProfile.currentEmployment.startDate')}
        </p>
        <Controller
          name="from"
          control={control}
          render={({ field }) => (
            <DatePicker
              {...field}
              value={field.value ? new Date(field.value) : null}
              isError={!!errors.from}
              onChange={(value, keyboardInput) => {
                if (keyboardInput || value) {
                  field.onChange(
                    value && !isNaN(value.getTime())
                      ? value.toISOString()
                      : keyboardInput
                  )
                }
              }}
            />
          )}
        />
        <hr className="mb-6" />
        <label className="mb-2 block font-semibold">
          {t('candidate.createProfile.skills')}
        </label>
        <Controller
          control={control}
          name="skills"
          render={({ field }) => (
            <SkillsSelect
              className="mb-6"
              jobPosition={jobPosition}
              selectedTags={field.value}
              onTagsSelect={field.onChange}
              isError={!!errors.skills}
            />
          )}
        />
        <hr className="mb-6" />
        <label className="mb-2 block font-semibold">
          {t('candidate.createProfile.whatDoesJobEntail')}
        </label>
        <TextArea {...register('jobDescription')} className="pb-32" />
        <PrevNextMenu
          onBackBtnClick={() => navigate('/myprofile/profile-creation/step-7')}
          onSubmitBtnClick={handleSubmit(onFormSubmit)}
          bottomPositionClassName="bottom-settings-only-menu"
        />
      </div>
    </form>
  )
}
