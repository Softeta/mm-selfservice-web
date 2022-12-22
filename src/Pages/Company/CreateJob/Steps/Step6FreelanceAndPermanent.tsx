import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { Step } from 'Components/Molecules/CompanyStep'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { SelectionTabList } from 'Components/Molecules/SelectionTabList'
import CompanyWorkingHoursType from 'API/Types/Enums/companyWorkingHours'
import { Input } from 'Components/Atoms'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { MoneyInput } from 'Components/Organisms/MoneyInput'
import { MainAppCurrency } from 'Utils/constants'
import WorkFormats from 'API/Types/Enums/workFormats'
import { TAddress } from 'API/Types/address'
import AddressSingleSelect from 'Components/Organisms/AddressSingleSelect'
import { setCoreInformationStep6FreelanceAndPermanent } from 'Store/Slices/CreateJob/createJobReducer'
import { useWeeklyFullTimeHours } from 'Hooks/useWeeklyFullTimeHours'
import { salaryToHourlyRate } from 'Utils/salary'

type TDefaultValues = {
  companyWorkingHours?: CompanyWorkingHoursType[]
  weeklyHours?: number
  projectHours?: number
  permanentMonthlyBudgetFrom?: number
  permanentMonthlyBudgetTo?: number
  freelanceMonthlyBudgetFrom?: number
  freelanceMonthlyBudgetTo?: number
  currency: string
  hourlyBudgetFrom?: number
  hourlyBudgetTo?: number
  formats?: WorkFormats[]
  address?: TAddress
}

const validationSchema = yup.object({
  weeklyHours: yup.number().integer().min(1).nullable()
    .transform((curr, orig) => orig === '' ? null : curr),
  projectHours: yup.number().integer().min(1).nullable()
    .transform((curr, orig) => orig === '' ? null : curr),
  permanentMonthlyBudgetFrom: yup.number().integer().min(1).nullable(),
  permanentMonthlyBudgetTo: yup.number().integer().min(1).nullable(),
  freelanceMonthlyBudgetFrom: yup.number().integer().min(1).nullable(),
  freelanceMonthlyBudgetTo: yup.number().integer().min(1).nullable(),
  hourlyBudgetFrom: yup.number().integer().min(1).nullable(),
  hourlyBudgetTo: yup.number().integer().min(1).nullable()
})

export const Step6FreelanceAndPermanent = () => {
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    companyWorkingHours: state.createJob.companyWorkingHours,
    weeklyHours: state.createJob.job?.weeklyHours,
    projectHours: state.createJob.job?.freelance?.hoursPerProject,
    permanentMonthlyBudgetFrom:
      state.createJob.job?.permanent?.monthlyBudget?.from,
    permanentMonthlyBudgetTo: state.createJob.job?.permanent?.monthlyBudget?.to,
    freelanceMonthlyBudgetFrom:
      state.createJob.job?.freelance?.monthlyBudget?.from,
    freelanceMonthlyBudgetTo: state.createJob.job?.freelance?.monthlyBudget?.to,
    currency: state.createJob.job?.currency ?? MainAppCurrency,
    hourlyBudgetFrom: state.createJob.job?.freelance?.hourlyBudget?.from,
    hourlyBudgetTo: state.createJob.job?.freelance?.hourlyBudget?.to,
    formats: state.createJob.job?.formats,
    address: state.createJob.job?.company?.address
  }))

  const { t } = useTranslation()

  const allWorkingHoursSelections = Object.keys(CompanyWorkingHoursType).map(
    (w) => ({
      value: w,
      title: t(`company.job.create.freelance.workType.${w.toLowerCase()}`)
    })
  )

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
  const hoursPerProject = watch('projectHours')
  const companyWorkingHours = watch('companyWorkingHours')
  const formats = watch('formats')
  const currency = watch('currency')
  const address = watch('address')
  const hourlyBudgetFrom = watch('hourlyBudgetFrom')
  const hourlyBudgetTo = watch('hourlyBudgetTo')
  const hourlyBudget =
    hourlyBudgetFrom && hourlyBudgetTo
      ? { from: hourlyBudgetFrom, to: hourlyBudgetTo }
      : undefined
  const permanentMonthlyBudgetFrom = watch('permanentMonthlyBudgetFrom')
  const permanentMonthlyBudgetTo = watch('permanentMonthlyBudgetTo')
  const permanentMonthlyBudget =
    permanentMonthlyBudgetFrom && permanentMonthlyBudgetTo
      ? { from: permanentMonthlyBudgetFrom, to: permanentMonthlyBudgetTo }
      : undefined
  const freelanceMonthlyBudgetFrom = watch('freelanceMonthlyBudgetFrom')
  const freelanceMonthlyBudgetTo = watch('freelanceMonthlyBudgetTo')
  const freelanceMonthlyBudget =
    freelanceMonthlyBudgetFrom && freelanceMonthlyBudgetTo
      ? { from: freelanceMonthlyBudgetFrom, to: freelanceMonthlyBudgetTo }
      : undefined
  const companyWorkingHourTypes = watch('companyWorkingHours')
  const fullTimeWeeklyHours = useWeeklyFullTimeHours(address?.country)

  const submitForm = async () => {
    dispatch(
      setCoreInformationStep6FreelanceAndPermanent({
        currency,
        formats,
        address,
        weeklyWorkHours,
        permanent: {
          monthlyBudget: permanentMonthlyBudget
        },
        freelance: {
          hourlyBudget,
          monthlyBudget: freelanceMonthlyBudget,
          hoursPerProject,
          companyWorkingHourTypes
        }
      })
    )
    navigate(routes.company.jobs.create.step7(jobId!))
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Step
        titleKey="company.job.create.freelance.header"
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
              name="permanentMonthlyBudgetFrom"
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
                  isAmountError={!!errors.permanentMonthlyBudgetFrom}
                />
              )}
            />
            <Controller
              name="permanentMonthlyBudgetTo"
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
                  isAmountError={!!errors.permanentMonthlyBudgetTo}
                />
              )}
            />
          </div>
          {permanentMonthlyBudgetFrom &&
            permanentMonthlyBudgetTo &&
            weeklyWorkHours && (
              <p>
                {t(
                  'company.job.create.permanent.workHours.hourlyRateComputed',
                  {
                    minSalary: salaryToHourlyRate(
                      permanentMonthlyBudgetFrom,
                      weeklyWorkHours
                    ),
                    maxSalary: salaryToHourlyRate(
                      permanentMonthlyBudgetTo,
                      weeklyWorkHours
                    ),
                    currency: currency,
                    numHours: weeklyWorkHours
                  }
                )}
              </p>
            )}
        </div>
        <div className="h-12"></div>
        <p className="font-bold">{t('company.job.create.freelancer.title')}</p>
        <div className="h-2"></div>
        <p className="mb-2 font-semibold">
          {t('company.job.create.freelance.workType')}
        </p>
        <Controller
          name="companyWorkingHours"
          control={control}
          render={({ field }) => (
            <div className="mb-6">
              <SelectionTabList
                items={allWorkingHoursSelections}
                selectedItems={
                  companyWorkingHours?.map((w) => ({
                    value: w,
                    title: t(
                      `company.job.create.freelance.workType.${w.toLowerCase()}`
                    )
                  })) || []
                }
                onTabsChanged={(values) =>
                  field.onChange(
                    values.map((v) => v.value as CompanyWorkingHoursType)
                  )
                }
              />
            </div>
          )}
        />
        {(companyWorkingHours || []).length > 0 && (
          <p className="mb-2 font-semibold">
            {t('company.job.create.freelance.workHours')}
          </p>
        )}
        <div className="flex justify-start gap-4">
          {companyWorkingHours?.includes(
            CompanyWorkingHoursType.Continuous
          ) && (
              <div className="flex w-fit items-center gap-2">
                <Input
                  marginClassName="mb-0"
                  widthClassName="w-32"
                  disabled={true}
                  value={weeklyWorkHours}
                />
                <p>{t('company.job.create.freelance.workHours.weekly')}</p>
              </div>
            )}
          {companyWorkingHours?.includes(
            CompanyWorkingHoursType.ProjectEmployment
          ) && (
              <div className="flex w-fit items-center gap-2">
                <Input
                  marginClassName="mb-0"
                  widthClassName="w-32"
                  {...register('projectHours')}
                  isError={!!errors.projectHours}
                />
                <p>{t('company.job.create.freelance.workHours.project')}</p>
              </div>
            )}
        </div>
        <div className="h-6"></div>
        <p className="mb-2 font-semibold">
          {t('company.job.create.freelance.salary.month.budget')}
        </p>
        <div className="flex justify-start gap-8">
          <Controller
            name="freelanceMonthlyBudgetFrom"
            control={control}
            render={({ field }) => (
              <MoneyInput
                placeholder={t(
                  'company.job.create.freelance.salary.month.budget.from'
                )}
                selectedCurrencyCode={currency}
                selectedAmount={field.value}
                onCurrencyChanged={(currency) =>
                  setValue('currency', currency.code)
                }
                onAmountChanged={field.onChange}
                isCurrencyError={!!errors.currency}
                isAmountError={!!errors.freelanceMonthlyBudgetFrom}
              />
            )}
          />
          <Controller
            name="freelanceMonthlyBudgetTo"
            control={control}
            render={({ field }) => (
              <MoneyInput
                placeholder={t(
                  'company.job.create.freelance.salary.month.budget.to'
                )}
                selectedCurrencyCode={currency}
                selectedAmount={field.value}
                onCurrencyChanged={(currency) =>
                  setValue('currency', currency.code)
                }
                onAmountChanged={field.onChange}
                isCurrencyError={!!errors.currency}
                isAmountError={!!errors.freelanceMonthlyBudgetTo}
              />
            )}
          />
        </div>
        <div className="h-6"></div>
        <p className="mb-2 font-semibold">
          {t('company.job.create.freelance.salary.hour.budget')}
        </p>
        <div className="flex justify-start gap-8">
          <Controller
            name="hourlyBudgetFrom"
            control={control}
            render={({ field }) => (
              <MoneyInput
                placeholder={t(
                  'company.job.create.freelance.salary.hour.budget.from'
                )}
                selectedCurrencyCode={currency}
                selectedAmount={field.value}
                onCurrencyChanged={(currency) =>
                  setValue('currency', currency.code)
                }
                onAmountChanged={field.onChange}
                isCurrencyError={!!errors.currency}
                isAmountError={!!errors.hourlyBudgetFrom}
              />
            )}
          />
          <Controller
            name="hourlyBudgetTo"
            control={control}
            render={({ field }) => (
              <MoneyInput
                placeholder={t(
                  'company.job.create.freelance.salary.hour.budget.to'
                )}
                selectedCurrencyCode={currency}
                selectedAmount={field.value}
                onCurrencyChanged={(currency) =>
                  setValue('currency', currency.code)
                }
                onAmountChanged={field.onChange}
                isCurrencyError={!!errors.currency}
                isAmountError={!!errors.hourlyBudgetTo}
              />
            )}
          />
        </div>
        <div className="h-6"></div>
        <p className="mb-2 font-semibold">
          {t('company.job.create.freelance.formats')}
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
