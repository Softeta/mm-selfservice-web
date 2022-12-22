import { useTranslation } from 'react-i18next'
import { SingleSelect } from 'Components/Atoms/SingleSelect'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import WorkTypes from 'API/Types/Enums/workType'
import ActivityStatus from 'API/Types/Enums/activityStatus'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { updateCoreInformationStep3 } from 'Store/Slices/CandidateProfile/candidateProfileReducer'

type IProps = {
  headerLabel: string
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void,
    activityStatuses?: ActivityStatus[]
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  workTypes?: WorkTypes[]
  activityStatuses?: ActivityStatus[]
}

const validationSchema = yup.object({
  workTypes: yup.array().min(1).required()
})

export const WorkTypeForm = ({
  headerLabel,
  controlsBuilder,
  onFormPostSubmit
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => {
    const candidate = state.candidateProfile.candidate
    return {
      workTypes: candidate?.workTypes,
      activityStatuses: candidate?.activityStatuses
    }
  })
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
    mode: 'onChange'
  })
  const workTypes = watch('workTypes')

  const onFormSubmit = async () => {
    dispatch(updateCoreInformationStep3({ workTypes: workTypes! }))
    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-6 text-center text-lg">{headerLabel}</h1>
      <p className="mb-6 text-center">
        {t('candidate.createProfile.preferableJobType.subtitle')}
      </p>
      <SingleSelect
        inputType="checkbox"
        label={t('classificator.workType.Permanent')}
        value={WorkTypes.Permanent}
        id={WorkTypes.Permanent}
        checked={workTypes?.includes(WorkTypes.Permanent)}
        isError={!!errors.workTypes}
        {...register('workTypes')}
      />
      <SingleSelect
        inputType="checkbox"
        label={t('classificator.workType.Freelance')}
        value={WorkTypes.Freelance}
        id={WorkTypes.Freelance}
        checked={workTypes?.includes(WorkTypes.Freelance)}
        isError={!!errors.workTypes}
        {...register('workTypes')}
      />
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </form>
  )
}
