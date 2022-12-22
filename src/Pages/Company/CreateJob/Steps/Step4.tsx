import { useTranslation } from 'react-i18next'
import { useForm } from 'react-hook-form'
import { Step } from 'Components/Molecules/CompanyStep'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { TextArea } from 'Components/Atoms'
import { setCoreInformationStep4 } from 'Store/Slices/CreateJob/createJobReducer'

type TDefaultValues = {
  description?: string
}

export const Step4 = () => {
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    description: state.createJob.job?.description
  }))
  const isAdditionalJobCreationFlow = useSelector<RootState, boolean>(
    (state) => state.createJob?.isAdditionalJobCreationFlow ?? false
  )

  const { t } = useTranslation()
  const navigate = useNavigate()
  const params = useParams()
  const { jobId } = params
  const dispatch = useDispatch()

  const { register, handleSubmit, watch } = useForm<TDefaultValues>({
    mode: 'onChange',
    defaultValues: defaultValues
  })

  const description = watch('description')
  const submitForm = async () => {
    dispatch(setCoreInformationStep4({ description: description }))
    navigate(routes.company.jobs.create.step5(jobId!))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Step
        titleKey="company.job.create.descriptionStep.header"
        onNextClick={handleSubmit(submitForm)}
        onBackClick={
          !isAdditionalJobCreationFlow
            ? undefined
            : () => navigate(routes.company.jobs.create.step3(jobId!))
        }
      >
        <label className="mb-2 block font-semibold">
          {t('company.job.create.descriptionStep.form.label')}
        </label>
        <TextArea
          sizeClassName="h-72"
          {...register('description')}
          placeholder={t('company.job.create.descriptionStep.form.placeholder')}
        />
      </Step>
    </form>
  )
}
