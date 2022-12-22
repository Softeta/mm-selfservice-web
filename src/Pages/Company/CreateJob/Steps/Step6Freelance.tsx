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
import { setCoreInformationStep6Freelance } from 'Store/Slices/CreateJob/createJobReducer'

type TDefaultValues = {
  companyWorkingHours?: CompanyWorkingHoursType[]
  weeklyHours?: number
  projectHours?: number
  monthlyBudgetFrom?: number
  monthlyBudgetTo?: number
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
  monthlyBudgetFrom: yup.number().integer().min(1).nullable(),
  monthlyBudgetTo: yup.number().integer().min(1).nullable(),
  hourlyBudgetFrom: yup.number().integer().min(1).nullable(),
  hourlyBudgetTo: yup.number().integer().min(1).nullable()
})

export const Step6Freelance = () => {
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    companyWorkingHours: state.createJob.companyWorkingHours,
    weeklyHours: state.createJob.job?.weeklyHours,
    projectHours: state.createJob.job?.freelance?.hoursPerProject,
    monthlyBudgetFrom: state.createJob.job?.freelance?.monthlyBudget?.from,
    monthlyBudgetTo: state.createJob.job?.freelance?.monthlyBudget?.to,
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
  const monthlyBudgetFrom = watch('monthlyBudgetFrom')
  const monthlyBudgetTo = watch('monthlyBudgetTo')
  const monthlyBudget =
    monthlyBudgetFrom && monthlyBudgetTo
      ? { from: monthlyBudgetFrom, to: monthlyBudgetTo }
      : undefined
  const companyWorkingHourTypes = watch('companyWorkingHours')

  const submitForm = async () => {
    dispatch(
      setCoreInformationStep6Freelance({
        weeklyWorkHours,
        hoursPerProject,
        formats,
        currency,
        address,
        hourlyBudget,
        monthlyBudget,
        companyWorkingHourTypes
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
                {...register('weeklyHours')}
                isError={!!errors.weeklyHours}
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
            name="monthlyBudgetFrom"
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
                  'company.job.create.freelance.salary.month.budget.to'
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
