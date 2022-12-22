import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { Input } from 'Components/Atoms/Input'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { PhoneInput } from 'Components/Molecules'
import AddressSingleSelect from 'Components/Organisms/AddressSingleSelect'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { TPhone } from 'API/Types/phone'
import { TAddress } from 'API/Types/address'
import { updateCoreInformationStep4 } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { RegularExpressions } from 'Variables/regularExpressions'

type IProps = {
  headerLabel?: string
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  firstName?: string
  lastName?: string
  phone?: TPhone
  address?: TAddress
}

const validationSchema = yup.object({
  // Match anything without white spaces at the beginning and at the end
  firstName: yup.string().required().matches(RegularExpressions.nameValue),
  lastName: yup.string().required().matches(RegularExpressions.nameValue)
})

export const ContactForm = ({
  onFormPostSubmit,
  controlsBuilder,
  headerLabel
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => {
    const candidate = state.candidateProfile.candidate!
    return {
      firstName: candidate.firstName,
      lastName: candidate.lastName,
      phone: candidate.phone,
      address: candidate.address
    }
  })
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const firstName = watch('firstName')
  const lastName = watch('lastName')
  const phone = watch('phone')
  const address = watch('address')

  const onFormSubmit = () => {
    dispatch(
      updateCoreInformationStep4({
        firstName: firstName!,
        lastName: lastName!,
        phone: phone || defaultValues.phone,
        address: address || defaultValues.address
      })
    )

    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">
        {headerLabel || t('candidate.createProfile.contactInfo')}
      </h1>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.contactInfo.firstName')}
      </p>
      <Input {...register('firstName')} isError={!!errors.firstName} />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.contactInfo.lastName')}
      </p>
      <Input {...register('lastName')} isError={!!errors.lastName} />
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.contactInfo.phoneNumber')}
      </p>
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <div className="mb-6">
            <PhoneInput
              value={field.value}
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
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </form>
  )
}
