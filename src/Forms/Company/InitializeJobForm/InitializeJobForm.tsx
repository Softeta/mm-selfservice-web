import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { DatePicker } from 'Components/Molecules/DatePicker'
import PositionSingleSelect from 'Components/Organisms/PositionSingleSelect'
import Checkbox from 'Components/Atoms/Checkbox'
import { TPosition } from 'API/Types/position'
import { SingleSelect } from 'Components/Atoms/SingleSelect'
import WorkTypes from 'API/Types/Enums/workType'
import { Step } from 'Components/Molecules/CompanyStep'
import { ChangeEvent } from 'react'

const currentDate = new Date()

const validationSchema = yup.object({
  position: yup.object().required(),
  workTypes: yup.array().min(1).required(),
  startDate: yup.date().when('isUrgent', {
    is: (value: boolean) => !value,
    then: yup
      .date()
      .min(currentDate)
      .when('endDate', (endDate, schema) => endDate && schema.max(endDate))
      .required(),
    otherwise: yup.date()
  }),
  endDate: yup.date().min(currentDate)
})

export type TInitJobFormDefaultValues = {
  position?: TPosition
  startDate: Date
  endDate?: Date
  workTypes: WorkTypes[]
  isUrgent: boolean
}

type TProps = {
  defaultValues: TInitJobFormDefaultValues
  onFormSubmit: (values: TInitJobFormDefaultValues) => void
  isLoading: boolean
}

export const InitializeJobForm = ({
  defaultValues,
  onFormSubmit,
  isLoading
}: TProps) => {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm<TInitJobFormDefaultValues>({
    mode: 'onChange',
    defaultValues: {
      ...defaultValues,
      startDate: defaultValues?.startDate ?? currentDate
    },
    resolver: yupResolver(validationSchema)
  })

  const startDate = watch('startDate')

  const workTypes = watch('workTypes')
  const isUrgent = watch('isUrgent')

  const handleIsUrgentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { checked }
    } = event
    setValue('isUrgent', checked, { shouldValidate: true })
    if (checked) {
      setValue('startDate', defaultValues.startDate, { shouldValidate: true })
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Step
        titleKey="company.profileCreation.step1.title"
        onNextClick={handleSubmit(onFormSubmit)}
        isLoading={isLoading}
      >
        <p className="mb-3 text-md font-semibold">
          {t('company.profileCreation.step1.position')}
        </p>
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <PositionSingleSelect
              selectedItem={field.value || null}
              onItemSelect={field.onChange}
              isError={!!errors.position}
              label=""
            />
          )}
        />
        <p className="mt-7 mb-3 text-md font-semibold">
          {t('company.profileCreation.step1.workTypes')}
        </p>
        <div className="grid grid-cols-2 gap-2">
          <SingleSelect
            variant="small"
            inputType="checkbox"
            label={t('classificator.workType.Permanent')}
            value={WorkTypes.Permanent}
            id={WorkTypes.Permanent}
            checked={workTypes?.includes(WorkTypes.Permanent)}
            isError={!!errors.workTypes}
            {...register('workTypes')}
          />
          <SingleSelect
            variant="small"
            inputType="checkbox"
            label={t('classificator.workType.Freelance')}
            value={WorkTypes.Freelance}
            id={WorkTypes.Freelance}
            checked={workTypes?.includes(WorkTypes.Freelance)}
            isError={!!errors.workTypes}
            {...register('workTypes')}
          />
        </div>
        <div className="mt-7 grid grid-cols-2 gap-6">
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <div>
                <p className="mb-3 text-md font-semibold">
                  {t('company.profileCreation.step1.startDate')}
                </p>
                <DatePicker
                  {...field}
                  value={field.value || null}
                  disabled={isUrgent}
                  isError={!!errors.startDate}
                />
              </div>
            )}
          />
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <div>
                <p className="mb-3 text-md font-semibold">
                  {t('company.profileCreation.step1.endDate')}
                </p>
                <DatePicker
                  {...field}
                  value={field.value || null}
                  isError={!!errors.endDate}
                />
              </div>
            )}
          />
        </div>
        <Checkbox
          {...register('isUrgent')}
          className="mt-4 text-md"
          defaultChecked={isUrgent}
          label={t('company.profileCreation.step1.isUrgent')}
          onChange={handleIsUrgentChange}
        />
      </Step>
    </form>
  )
}
