import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Notification } from 'Components/Molecules/Notification'
import PositionSingleSelect from 'Components/Organisms/PositionSingleSelect'
import { TPosition } from 'API/Types/position'
import { Step } from 'Components/Molecules/CompanyStep'
import { useNavigate } from 'react-router-dom'
import AddressSingleSelect from 'Components/Organisms/AddressSingleSelect'
import { TAddress } from 'API/Types/address'
import { Input } from 'Components/Atoms'
import { TPhone } from 'API/Types/phone'
import { PhoneInput } from 'Components/Molecules'
import CompanySingleSelect from 'Components/Organisms/CompanySingleSelect'
import { TCompanySearch } from 'API/Types/Company/companySearchGet'
import { Guid } from 'Utils/constants'
import { useEffect, useState } from 'react'
import IndustrySelect from 'Components/Organisms/IndustrySingleSelect'
import { TIndustry } from 'API/Types/industries'
import { TCompanyRegisterRequest } from 'API/Types/Company/companyRegister'
import { routes } from 'Routes/routes'
import {
  TCompanyState,
  TJobInitState
} from 'Store/Slices/CompanyRegistration/Types/companyRegistrationState'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { setCompany } from 'Store/Slices/CompanyRegistration/companyRegistrationReducer'
import { registerCompany } from 'API/Calls/companies'
import { useMutation, useQueryClient } from 'react-query'
import { setContactPerson } from 'Store/Slices/ContactPerson/contactPersonReducer'
import { useSetRecoilState } from 'recoil'
import snackbarState from 'Components/Molecules/Snackbar/snackbarState'
import { AlertType } from 'Components/Molecules/Snackbar'
import { JobQueryKeys } from 'API/Calls/jobs'

const validationSchema = yup.object({
  company: yup
    .object({
      id: yup.string().oneOf([Guid.Empty])
    })
    .required(),
  address: yup.object({
    addressLine: yup.string().required(),
    postalCode: yup.string().required(),
    city: yup.string().required()
  }),
  firstName: yup.string().required(),
  lastName: yup.string().required()
})

export type TState = {
  company: TCompanySearch
  address: TAddress
  industries?: TIndustry[]
  firstName: string
  lastName: string
  position?: TPosition
  phone?: TPhone
}

export const Step2 = () => {
  const defaultValues = useSelector<RootState, TCompanyState | undefined>(
    (state) => state.companyRegistration.company
  )

  const job = useSelector<RootState, TJobInitState>(
    (state) => state.companyRegistration.job!
  )

  const isStep1Prepared = useSelector<RootState, boolean>(
    (state) => state.companyRegistration.isStep1Prepared!
  )

  const contactId = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.id!
  )

  const [notFoundCompany, setNotFoundCompany] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
    formState: { errors }
  } = useForm<TState>({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const setSnackbar = useSetRecoilState(snackbarState)

  const publishNotification = (errorCode: string) => {
    const errorMessage = t(`Error.${errorCode}`)
    const generalMessage = t('company.registration.step1.failedJobCreation')

    if (errorMessage) {
      setSnackbar({
        open: true,
        message: `${generalMessage} ${errorMessage}`,
        severity: AlertType.error
      })
    }
  }

  const { isLoading, mutate } = useMutation(
    (request: TCompanyRegisterRequest) =>
      registerCompany(request).then((result) => {
        queryClient.removeQueries(JobQueryKeys.jobs)
        if (result) {
          const person = result.data.company.contactPersons?.find(
            (x) => x.id === contactId
          )
          if (person) dispatch(setContactPerson(person))

          if (result.data.job) {
            navigate(routes.company.jobs.create.step3(result.data.job.id))
          } else {
            if (result.data.errorCode) {
              publishNotification(result.data.errorCode)
            }

            navigate(routes.company.root)
          }
        }
      })
  )

  const submitForm = async (data: TState) => mutate({
    name: data.company.name,
    registrationNumber: data.company.registrationNumber,
    address: {
      ...data.company.address || {
        addressLine: ''
      },
      city: data.address.city,
      postalCode: data.address.postalCode
    },
    industries: data.industries,
    person: {
      firstName: data.firstName,
      lastName: data.lastName,
      position: data.position,
      phone: data.phone
    },
    job: {
      position: job.position!,
      workTypes: job.workTypes,
      startDate: job.startDate,
      endDate: job.endDate,
      isUrgent: job.isUrgent
    }
  })
    
  const company = watch('company')

  useEffect(() => {
    setNotFoundCompany(false)

    if (company?.address?.addressLine) {
      setValue(
        'address',
        {
          addressLine: company.address.addressLine,
          postalCode: company.address.postalCode,
          city: company.address.city
        },
        { shouldValidate: true }
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [company])

  const handleEnteredCompanyName = (name: string) => {
    setNotFoundCompany(!!name && !company)
  }

  const handleBackButtonClick = () => {
    dispatch(
      setCompany({
        company: getValues().company,
        address: getValues().address,
        industries: getValues().industries,
        firstName: getValues().firstName,
        lastName: getValues().lastName,
        position: getValues().position,
        phone: getValues().phone
      })
    )
    navigate(routes.company.registration.step1)
  }

  const companyExists =
    !notFoundCompany && company && company?.id !== Guid.Empty

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Step
        titleKey="company.registration.step2.title"
        onNextClick={handleSubmit(submitForm)}
        onBackClick={handleBackButtonClick}
        isLoading={isLoading}
        disabledNext={!isStep1Prepared}
      >
        {!isStep1Prepared && (
          <Notification className="mb-7" type="error">
            {t('company.registration.step2.missingStep1')}
          </Notification>
        )}
        <p className="mb-2 font-semibold">
          {t('company.registration.step2.company')}
        </p>
        <Controller
          name="company"
          control={control}
          render={({ field }) => (
            <CompanySingleSelect
              selectedItem={field.value || null}
              onCompanySelect={field.onChange}
              onBlur={handleEnteredCompanyName}
              isError={!!errors.company}
              label=""
            />
          )}
        />
        {companyExists && (
          <Notification className="mb-7" type="info" disabled>
            {t('company.registration.step2.companyExists')}
          </Notification>
        )}
        {notFoundCompany && (
          <Notification className="mb-7" type="warning" disabled>
            {t('company.registration.step2.companyNotFound')}
          </Notification>
        )}
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <>
              <p className="mb-2 font-semibold">
                {t('company.registration.step2.address')}
              </p>
              <AddressSingleSelect
                selectedValue={field.value?.addressLine ?? ''}
                isError={!!errors.address?.addressLine}
                onItemSelect={field.onChange}
              />

              <p className="mb-2 font-semibold">
                {t('company.registration.step2.postalCodeAndCity')}
              </p>
              <div className="flex flex-row gap-4">
                <Input
                  value={field.value?.postalCode ?? ''}
                  isError={!!errors.address?.postalCode}
                  onChange={(event) => {
                    const state = field.value
                    if (state == undefined) {
                      return
                    }
                    state.postalCode = event.target.value
                    field.onChange(state)
                  }}
                />
                <Input
                  containerClassName="flex-grow"
                  isError={!!errors.address?.city}
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
            </>
          )}
        />
        <p className="mb-2 font-semibold">
          {t('company.registration.step2.firstName')}
        </p>
        <Input {...register('firstName')} isError={!!errors.firstName} />
        <p className="mb-2 font-semibold">
          {t('company.registration.step2.lastName')}
        </p>
        <Input {...register('lastName')} isError={!!errors.lastName} />
        <p className="mb-2 font-semibold">
          {t('company.registration.step2.industry')}
        </p>
        <Controller
          name="industries"
          control={control}
          render={({ field }) => (
            <IndustrySelect
              className="mb-6"
              selectedItems={field.value}
              onItemsSelect={field.onChange}
              isError={!!errors.industries}
            />
          )}
        />
        <p className="mb-2 font-semibold">
          {t('company.registration.step2.position')}
        </p>
        <Controller
          name="position"
          control={control}
          render={({ field }) => (
            <PositionSingleSelect
              className="mb-6"
              selectedItem={field.value || null}
              onItemSelect={field.onChange}
              isError={!!errors.position}
              label=""
            />
          )}
        />
        <p className="mb-2 font-semibold">
          {t('company.registration.step2.phoneNumber')}
        </p>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <div className="mb-6">
              <PhoneInput
                isError={!!errors.phone}
                onChange={(code, value) => {
                  if (!code || !value) {
                    return
                  }

                  field.onChange({
                    countryCode: code,
                    number: value,
                    phoneNumber: code + value
                  })
                }}
                labelHidden
                isRequired={false}
              />
            </div>
          )}
        />
        {/* TODO: stack settings and form menu
       <SettingsOnlyBottomMenu settingsPath={routes.company.settings} /> 
       */}
      </Step>
    </form>
  )
}
