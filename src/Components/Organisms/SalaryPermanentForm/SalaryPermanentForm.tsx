import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import ActivityStatus from 'API/Types/Enums/activityStatus'
import { MoneyInput } from 'Components/Organisms/MoneyInput'
import { MainAppCurrency } from 'Utils/constants'
import { Chip } from 'Components/Atoms/Chip'
import { setSalaryData } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import WorkTypes from 'API/Types/Enums/workType'

type IProps = {
  headerLabel: string
  onFormPostSubmit: (workTypes: WorkTypes[]) => void
  controlsBuilder: (
    submitHandler: () => void,
    workTypes: WorkTypes[]
  ) => React.ReactNode | React.ReactNode[]
}

const validationSchema = yup.object({
  currency: yup.string(),
  monthlyFullTimeSalary: yup
    .number()
    .positive()
    .min(1)
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : null))
})

type TDefaultValues = {
  currency: string
  monthlyFullTimeSalary?: number
  activityStatuses: ActivityStatus[]
  weeklyWorkHours?: number
  workTypes: WorkTypes[]
}

export const SalaryPermanentForm = ({
  controlsBuilder,
  headerLabel,
  onFormPostSubmit
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => {
    const candidate = state.candidateProfile.candidate
    return {
      currency: candidate?.currency ?? MainAppCurrency,
      monthlyFullTimeSalary: candidate?.permanent?.monthlySalary,
      activityStatuses: candidate?.activityStatuses || [],
      weeklyWorkHours: candidate?.weeklyWorkHours,
      workTypes: state.candidateProfile.candidate?.workTypes || []
    }
  })

  const dispatch = useDispatch()

  const {
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const currency = watch('currency')
  const monthlyFullTimeSalary = watch('monthlyFullTimeSalary')

  const onFormSubmit = () => {
    if (monthlyFullTimeSalary) {
      dispatch(
        setSalaryData({
          currency,
          fullTimeMonthlySalary: monthlyFullTimeSalary
        })
      )
    }

    onFormPostSubmit(defaultValues.workTypes)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">{headerLabel}</h1>
      <div className="mt-4"></div>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.money.monthlyFullTimeSalary')}
      </p>
      <Controller
        name="monthlyFullTimeSalary"
        control={control}
        render={({ field }) => (
          <MoneyInput
            selectedCurrencyCode={currency}
            selectedAmount={field.value}
            onCurrencyChanged={(currency) =>
              setValue('currency', currency.code)
            }
            onAmountChanged={field.onChange}
            isCurrencyError={!!errors.currency}
            isAmountError={!!errors.monthlyFullTimeSalary}
            placeholder={t(
              'candidate.createProfile.money.monthlyFullTimeSalaryPlaceholder'
            )}
          />
        )}
      />
      {defaultValues.weeklyWorkHours && (
        <Chip
          text={t('candidate.createProfile.money.weeklyWorkHours', {
            hours: defaultValues.weeklyWorkHours
          })}
          variant="gray"
          className="mt-1 text-xs"
        />
      )}
      {controlsBuilder(handleSubmit(onFormSubmit), defaultValues.workTypes)}
    </form>
  )
}
