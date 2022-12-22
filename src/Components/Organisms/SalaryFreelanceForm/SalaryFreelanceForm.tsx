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

type IProps = {
  headerLabel: string
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void,
    activityStatuses?: ActivityStatus[]
  ) => React.ReactNode | React.ReactNode[]
}

const validationSchema = yup.object({
  currency: yup.string(),
  monthlyFreelanceSalary: yup
    .number()
    .positive()
    .min(1)
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : null)),
  hourlySalary: yup
    .number()
    .positive()
    .min(1)
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : null))
})

type TDefaultValues = {
  currency: string
  monthlyFreelanceSalary?: number
  hourlySalary?: number
  activityStatuses?: ActivityStatus[]
  weeklyWorkHours?: number
}

export const SalaryFreelanceForm = ({
  controlsBuilder,
  headerLabel,
  onFormPostSubmit
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => {
    const candidate = state.candidateProfile.candidate
    return {
      currency: candidate?.currency ?? MainAppCurrency,
      monthlyFreelanceSalary: candidate?.freelance?.monthlySalary,
      hourlySalary: candidate?.freelance?.hourlySalary,
      activityStatuses: candidate?.activityStatuses,
      weeklyWorkHours: candidate?.weeklyWorkHours
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
  const monthlyFreelanceSalary = watch('monthlyFreelanceSalary')
  const hourlySalary = watch('hourlySalary')

  const onFormSubmit = () => {
    if (monthlyFreelanceSalary || hourlySalary) {
      dispatch(
        setSalaryData({
          currency,
          freelanceMonthlySalary: monthlyFreelanceSalary,
          freelanceHourlySalary: hourlySalary
        })
      )
    }

    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">{headerLabel}</h1>
      <div className="mt-4"></div>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.money.hourlySalary')}
      </p>
      <Controller
        name="hourlySalary"
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
            isAmountError={!!errors.hourlySalary}
          />
        )}
      />
      <div className="mt-8"></div>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.money.monthlyFreelanceSalary')}
      </p>
      <Controller
        name="monthlyFreelanceSalary"
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
            isAmountError={!!errors.monthlyFreelanceSalary}
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
      {controlsBuilder(
        handleSubmit(onFormSubmit),
        defaultValues.activityStatuses
      )}
    </form>
  )
}
