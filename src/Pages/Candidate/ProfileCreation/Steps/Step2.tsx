import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { Input } from 'Components/Atoms/Input'
import { DatePicker } from 'Components/Molecules/DatePicker'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import PositionSingleSelect from 'Components/Organisms/PositionSingleSelect'
import WorkExperienceType from 'API/Types/Enums/workExperienceType'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { useNavigate } from 'react-router-dom'
import {
  updateCoreInformationStep2Add,
  updateCoreInformationStep2Update
} from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TCandidateWorkExperience } from 'API/Types/Candidate/Common/candidateWorkExperience'

const validationSchema = yup.object({
  position: yup.object().required(),
  companyName: yup.string().required(),
  from: yup.date().required()
})

export const Step2 = () => {
  const { t } = useTranslation()
  const currentWorkExperience = useSelector<
    RootState,
    TCandidateWorkExperience | undefined
  >((state) => state.candidateProfile?.candidate?.candidateWorkExperiences[0])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: currentWorkExperience,
    resolver: yupResolver(validationSchema)
  })
  const companyName = watch('companyName')
  const jobPosition = watch('position')
  const currentJobStartDate = watch('from')

  const onFormSubmit = () => {
    if (currentWorkExperience) {
      dispatch(
        updateCoreInformationStep2Update({
          ...currentWorkExperience,
          companyName: companyName!,
          position: jobPosition!,
          from: currentJobStartDate!
        })
      )
    } else {
      dispatch(
        updateCoreInformationStep2Add({
          type: WorkExperienceType.Job,
          companyName: companyName!,
          position: jobPosition!,
          from: currentJobStartDate!,
          isCurrentJob: true,
          skills: []
        })
      )
    }
    navigate('/myprofile/profile-creation/step-3')
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
        <PrevNextMenu
          onBackBtnClick={() => navigate('/myprofile/profile-creation/step-1')}
          onSubmitBtnClick={handleSubmit(onFormSubmit)}
          bottomPositionClassName="bottom-settings-only-menu"
        />
      </div>
    </form>
  )
}
