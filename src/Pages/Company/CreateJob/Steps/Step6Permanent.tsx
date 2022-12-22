import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { Step } from 'Components/Molecules/CompanyStep'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { SelectionTabList } from 'Components/Molecules/SelectionTabList'
import { Input } from 'Components/Atoms'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MoneyInput } from 'Components/Organisms/MoneyInput'
import { MainAppCurrency } from 'Utils/constants'
import WorkFormats from 'API/Types/Enums/workFormats'
import { TAddress } from 'API/Types/address'
import AddressSingleSelect from 'Components/Organisms/AddressSingleSelect'
import { setCoreInformationStep6Permanent } from 'Store/Slices/CreateJob/createJobReducer'
import { useWeeklyFullTimeHours } from 'Hooks/useWeeklyFullTimeHours'
import { salaryToHourlyRate } from 'Utils/salary'

type TDefaultValues = {
  weeklyHours?: number
  monthlyBudgetFrom?: number
  monthlyBudgetTo?: number
  currency: string
  formats?: WorkFormats[]
  address?: TAddress
}

const validationSchema = yup.object({
  weeklyHours: yup.number().integer().min(1).nullable()
    .transform((curr, orig) => orig === '' ? null : curr),
  monthlyBudgetFrom: yup.number().integer().min(1).nullable(),
  monthlyBudgetTo: yup.number().integer().min(1).nullable()
})

export const Step6Permanent = () => {
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    weeklyHours: state.createJob.job?.weeklyHours,
    monthlyBudgetFrom: state.createJob.job?.permanent?.monthlyBudget?.from,
    monthlyBudgetTo: state.createJob.job?.permanent?.monthlyBudget?.to,
    currency: state.createJob.job?.currency ?? MainAppCurrency,
    formats: state.createJob.job?.formats,
    address: state.createJob.job?.company?.address
  }))

  const { t } = useTranslation()

  const allFormats = Object.keys(WorkFormats).map((w) => ({
    value: w,
    title: t(`company.job.create.workFormat.${w.toLowerCase()}`)
  }))

  const navigate = useNavigate()
  const params = useParams()
  const { jobId } = params
  const dispatch = useDispatch()

  const {
    handleSubmit,
    watch,
    control,
    register,
    setValue,
    formState: { errors }
  } = useForm<TDefaultValues>({
    mode: 'onChange',
    defaultValues: defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const weeklyWorkHours = watch('weeklyHours')
  const formats = watch('formats')
  const currency = watch('currency')
  const address = watch('address')
  const monthlyBudgetFrom = watch('monthlyBudgetFrom')
  const monthlyBudgetTo = watch('monthlyBudgetTo')
  const monthlyBudget =
    monthlyBudgetFrom && monthlyBudgetTo
      ? { from: monthlyBudgetFrom, to: monthlyBudgetTo }
      : undefined
  const fullTimeWeeklyHours = useWeeklyFullTimeHours(address?.country)

  const submitForm = async () => {
    dispatch(
      setCoreInformationStep6Permanent({
        weeklyWorkHours,
        formats,
        currency,
        address,
        monthlyBudget
      })
    )

    navigate(routes.company.jobs.create.step7(jobId!))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Step
        titleKey="company.job.create.permanent.header"
        onNextClick={handleSubmit(submitForm)}
        onBackClick={() => navigate(routes.company.jobs.create.step5(jobId!))}
      >
        <p className="font-bold">{t('company.job.create.permanent.title')}</p>
        <div className="h-2"></div>
        <p className="mb-2 font-semibold">
          {t('company.job.create.permanent.workHours')}
        </p>
        <div className="flex w-fit items-center gap-2">
          <Input
            marginClassName="mb-0"
            widthClassName="w-32"
            {...register('weeklyHours')}
            isError={!!errors.weeklyHours}
          />
          <p>{t('company.job.create.permanent.workHours.weekly')}</p>
        </div>
        <div className="h-6"></div>
        <p className="mb-2 font-semibold">
          {t('company.job.create.permanent.salary.month.budget')}
        </p>
        <div className="grid gap-2">
          <div className="flex justify-start gap-8">
            <Controller
              name="monthlyBudgetFrom"
              control={control}
              render={({ field }) => (
                <MoneyInput
                  placeholder={t(
                    'company.job.create.permanent.salary.month.budget.from'
                  )}
                  selectedCurrencyCode={currency}
                  selectedAmount={field.value}
                  onCurrencyChanged={(currency) =>
                    setValue('currency', currency.code)
                  }
                  onAmountChanged={field.onChange}
                  isCurrencyError={!!errors.currency}
                  isAmountError={!!errors.monthlyBudgetFrom}
                />
              )}
            />
            <Controller
              name="monthlyBudgetTo"
              control={control}
              render={({ field }) => (
                <MoneyInput
                  placeholder={t(
                    'company.job.create.permanent.salary.month.budget.to'
                  )}
                  selectedCurrencyCode={currency}
                  selectedAmount={field.value}
                  onCurrencyChanged={(currency) =>
                    setValue('currency', currency.code)
                  }
                  onAmountChanged={field.onChange}
                  isCurrencyError={!!errors.currency}
                  isAmountError={!!errors.monthlyBudgetTo}
                />
              )}
            />
          </div>
          {monthlyBudgetFrom && monthlyBudgetTo && weeklyWorkHours && (
            <p>
              {t('company.job.create.permanent.workHours.hourlyRateComputed', {
                minSalary: salaryToHourlyRate(
                  monthlyBudgetFrom,
                  weeklyWorkHours
                ),
                maxSalary: salaryToHourlyRate(monthlyBudgetTo, weeklyWorkHours),
                currency: currency,
                numHours: weeklyWorkHours
              })}
            </p>
          )}
        </div>
        <div className="h-6"></div>
        <p className="mb-2 font-semibold">
          {t('company.job.create.permanent.formats')}
        </p>
        <Controller
          name="formats"
          control={control}
          render={({ field }) => (
            <div className="mb-6">
              <SelectionTabList
                items={allFormats}
                selectedItems={
                  formats?.map((w) => ({
                    value: w,
                    title: t(`company.job.create.workFormat.${w.toLowerCase()}`)
                  })) || []
                }
                onTabsChanged={(values) =>
                  field.onChange(values.map((v) => v.value as WorkFormats))
                }
              />
            </div>
          )}
        />
        {(formats?.includes(WorkFormats.OnSite) ||
          formats?.includes(WorkFormats.Hybrid)) && (
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <>
                  <p className="mb-2 font-semibold">
                    {t('candidate.createProfile.contactInfo.address')}
                  </p>
                  <AddressSingleSelect
                    isError={!!errors.address}
                    onItemSelect={field.onChange}
                    selectedValue={field.value?.addressLine}
                  />
                  <div className="flex w-full items-stretch gap-4">
                    <div className="w-32 flex-none">
                      <p className="mb-2 font-semibold">
                        {t('candidate.createProfile.contactInfo.postalCode')}
                      </p>
                      <Input
                        value={field.value?.postalCode ?? ''}
                        onChange={(event) => {
                          const state = field.value
                          if (state == undefined) {
                            return
                          }

                          state.postalCode = event.target.value
                          field.onChange(state)
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="mb-2 font-semibold">
                        {t('candidate.createProfile.contactInfo.city')}
                      </p>
                      <Input
                        value={field.value?.city ?? ''}
                        onChange={(event) => {
                          const state = field.value
                          if (state == undefined) {
                            return
                          }

                          state.city = event.target.value
                          field.onChange(state)
                        }}
                      />
                    </div>
                  </div>
                </>
              )}
            />
          )}
      </Step>
    </form>
  )
}
