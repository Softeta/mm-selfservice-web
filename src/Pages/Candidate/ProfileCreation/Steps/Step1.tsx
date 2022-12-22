import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useTranslation } from 'react-i18next'
import { SingleSelect } from 'Components/Atoms/SingleSelect'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import ActivityStatus from 'API/Types/Enums/activityStatus'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { useNavigate } from 'react-router-dom'
import { updateCoreInformationStep1 } from 'Store/Slices/CandidateProfile/candidateProfileReducer'

type TDefaultValues = {
  activityStatuses?: ActivityStatus[]
}

const validationSchema = yup.object({
  activityStatuses: yup.array().min(1).required()
})

export const Step1 = () => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    activityStatuses: state.candidateProfile.candidate?.activityStatuses || []
  }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })
  const activityStatuses = watch('activityStatuses')

  const isPermanent = activityStatuses?.includes(ActivityStatus.Permanent)
  const isFreelancer = activityStatuses?.includes(ActivityStatus.Freelancer)

  const onFormSubmit = () => {
    dispatch(
      updateCoreInformationStep1({
        activityStatuses: activityStatuses!
      })
    )

    if (!isFreelancer && !isPermanent) {
      navigate('/myprofile/profile-creation/step-3')
    } else {
      navigate('/myprofile/profile-creation/step-2')
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="pt-16">
        <h1 className="mb-20 text-center text-lg">
          {t('candidate.createProfile.whatIsYourStatus')}
        </h1>
        <SingleSelect
          inputType="checkbox"
          label={t('candidate.createProfile.whatIsYourStatus.option.employed')}
          value={ActivityStatus.Permanent}
          id={ActivityStatus.Permanent}
          checked={isPermanent}
          isError={!!errors.activityStatuses}
          {...register('activityStatuses')}
        />
        <SingleSelect
          inputType="checkbox"
          label={t(
            'candidate.createProfile.whatIsYourStatus.option.selfEmployed'
          )}
          value={ActivityStatus.Freelancer}
          id={ActivityStatus.Freelancer}
          checked={isFreelancer}
          isError={!!errors.activityStatuses}
          {...register('activityStatuses')}
        />
        <SingleSelect
          inputType="checkbox"
          label={t('candidate.createProfile.whatIsYourStatus.option.student')}
          value={ActivityStatus.Student}
          id={ActivityStatus.Student}
          checked={activityStatuses?.includes(ActivityStatus.Student)}
          isError={!!errors.activityStatuses}
          {...register('activityStatuses')}
        />
        <SingleSelect
          inputType="checkbox"
          label={t('candidate.createProfile.whatIsYourStatus.option.other')}
          value={ActivityStatus.Other}
          id={ActivityStatus.Other}
          checked={activityStatuses?.includes(ActivityStatus.Other)}
          isError={!!errors.activityStatuses}
          {...register('activityStatuses')}
        />
        <PrevNextMenu
          onSubmitBtnClick={handleSubmit(onFormSubmit)}
          bottomPositionClassName="bottom-settings-only-menu"
        />
      </div>
    </form>
  )
}
