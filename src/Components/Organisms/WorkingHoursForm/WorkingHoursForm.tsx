import { useTranslation } from 'react-i18next'
import { SingleSelect } from 'Components/Atoms/SingleSelect'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import WorkingHoursType from 'API/Types/Enums/workingHoursType'
import { Input } from 'Components/Atoms'
import { DatePicker } from 'Components/Molecules/DatePicker'
import WorkFormats from 'API/Types/Enums/workFormats'
import { setWorkTerms } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import ActivityStatus from 'API/Types/Enums/activityStatus'
import WorkTypes from 'API/Types/Enums/workType'

type IProps = {
  headerLabel: string
  onFormPostSubmit: (workTypes: WorkTypes[]) => void
  controlsBuilder: (
    submitHandler: () => void,
    workTypes: WorkTypes[]
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  workingHoursTypes?: WorkingHoursType[]
  startDate?: Date
  weeklyWorkHours?: number
  formats?: WorkFormats[]
  activityStatuses: ActivityStatus[]
  workTypes: WorkTypes[]
}
const currentDate = new Date()
const validationSchema = yup.object({
  startDate: yup.date().min(currentDate).nullable(),
  weeklyWorkHours: yup.number().integer().min(1).nullable()
})

export const WorkingHoursForm = ({
  controlsBuilder,
  headerLabel,
  onFormPostSubmit
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    workingHoursTypes: state.candidateProfile.candidate?.workingHourTypes || [],
    startDate: state.candidateProfile.candidate?.startDate
      ? new Date(Date.parse(state.candidateProfile.candidate?.startDate))
      : undefined,
    weeklyWorkHours: state.candidateProfile.candidate?.weeklyWorkHours,
    formats: state.candidateProfile.candidate?.formats,
    activityStatuses: state.candidateProfile.candidate?.activityStatuses || [],
    workTypes: state.candidateProfile.candidate?.workTypes || []
  }))

  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const workingHoursTypes = watch('workingHoursTypes')
  const startDate = watch('startDate')
  const weeklyWorkHours = watch('weeklyWorkHours')
  const formats = watch('formats')

  const isPartTime = workingHoursTypes?.includes(WorkingHoursType.PartTime)
  const isFreelance = defaultValues.workTypes?.includes(WorkTypes.Freelance)

  const onFormSubmit = () => {
    if (workingHoursTypes || startDate || weeklyWorkHours || formats) {
      dispatch(
        setWorkTerms({
          workingHoursTypes: workingHoursTypes,
          startDate: startDate?.toISOString(),
          weeklyWorkHours: weeklyWorkHours,
          formats: formats
        })
      )
    }

    onFormPostSubmit(defaultValues.workTypes)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <p className="pb-5 text-lg font-bold">{headerLabel}</p>
      <SingleSelect
        inputType="checkbox"
        label={t('candidate.createProfile.workLoad.fulltime')}
        value={WorkingHoursType.FullTime}
        id={WorkingHoursType.FullTime}
        checked={workingHoursTypes?.includes(WorkingHoursType.FullTime)}
        isError={!!errors.workingHoursTypes}
        {...register('workingHoursTypes')}
      />
      <SingleSelect
        inputType="checkbox"
        label={t('candidate.createProfile.workLoad.parttime')}
        value={WorkingHoursType.PartTime}
        id={WorkingHoursType.PartTime}
        checked={isPartTime}
        isError={!!errors.workingHoursTypes}
        {...register('workingHoursTypes')}
      />
      {isFreelance && (
        <SingleSelect
          inputType="checkbox"
          label={t('candidate.createProfile.workLoad.projectemployment')}
          value={WorkingHoursType.ProjectEmployment}
          id={WorkingHoursType.ProjectEmployment}
          checked={workingHoursTypes?.includes(
            WorkingHoursType.ProjectEmployment
          )}
          isError={!!errors.workingHoursTypes}
          {...register('workingHoursTypes')}
        />
      )}
      {isPartTime && (
        <>
          <p className="my-2 font-semibold">
            {t('candidate.createProfile.workLoad.weeklyWorkHours')}
          </p>
          <Input
            {...register('weeklyWorkHours')}
            isError={!!errors.weeklyWorkHours}
          />
        </>
      )}
      <p className="pt-7 pb-5 text-lg font-bold">
        {t('candidate.createProfile.workLoad.startDate')}
      </p>
      <Controller
        name="startDate"
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            value={field.value || null}
            isError={!!errors.startDate}
            onChange={field.onChange}
          />
        )}
      />
      <p className="pt-7 pb-5 text-lg font-bold">
        {t('candidate.createProfile.workLoad.workFormats')}
      </p>
      <SingleSelect
        inputType="checkbox"
        label={t('candidate.createProfile.workLoad.onsite')}
        value={WorkFormats.OnSite}
        id={WorkFormats.OnSite}
        checked={formats?.includes(WorkFormats.OnSite)}
        {...register('formats')}
      />
      <SingleSelect
        inputType="checkbox"
        label={t('candidate.createProfile.workLoad.remote')}
        value={WorkFormats.Remote}
        id={WorkFormats.Remote}
        checked={formats?.includes(WorkFormats.Remote)}
        {...register('formats')}
      />
      <SingleSelect
        inputType="checkbox"
        label={t('candidate.createProfile.workLoad.hybrid')}
        value={WorkFormats.Hybrid}
        id={WorkFormats.Hybrid}
        checked={formats?.includes(WorkFormats.Hybrid)}
        {...register('formats')}
      />
      {controlsBuilder(handleSubmit(onFormSubmit), defaultValues.workTypes)}
    </form>
  )
}
