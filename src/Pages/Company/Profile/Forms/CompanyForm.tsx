import { yupResolver } from '@hookform/resolvers/yup'
import { updateCompany } from 'API/Calls/companies'
import { Button, Input } from 'Components/Atoms'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import * as yup from 'yup'
import { TAddress } from 'API/Types/address'
import { TIndustry } from 'API/Types/industries'
import AddressSingleSelect from 'Components/Organisms/AddressSingleSelect'
import IndustrySelect from 'Components/Organisms/IndustrySingleSelect'
import { useMutation } from 'react-query'
import { TCompanyUpdateRequest } from 'API/Types/Company/companyUpdate'
import { TCompany } from 'API/Types/Company/companyGet'

interface IProps {
  company: TCompany
}

const validationSchema = yup.object({
  address: yup.object({
    addressLine: yup.string().required(),
    postalCode: yup.string().required(),
    city: yup.string().required()
  })
})

export type TForm = {
  address?: TAddress
  industries?: TIndustry[]
  websiteUrl?: string
  linkedInUrl?: string
  glassdoorUrl?: string
}

export const CompanyForm = ({ company }: IProps) => {
  const { t } = useTranslation()

  const { isLoading, mutate } = useMutation((request: TCompanyUpdateRequest) =>
    updateCompany(company.id, request)
  )

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<TForm>({
    mode: 'onChange',
    defaultValues: {
      address: company.address,
      industries: company.industries,
      websiteUrl: company.websiteUrl,
      linkedInUrl: company.linkedInUrl,
      glassdoorUrl: company.glassdoorUrl
    },
    resolver: yupResolver(validationSchema)
  })

  const submitForm = async (data: TForm) =>
    mutate({
      address: data.address,
      industries: data.industries,
      websiteUrl: data.websiteUrl,
      linkedInUrl: data.linkedInUrl,
      glassdoorUrl: data.glassdoorUrl,
      logo: { hasChanged: false }
    })

  return (
    <>
      <form onSubmit={handleSubmit(submitForm)}>
        <p className="mb-2 font-semibold">{t('company.profile.name')}</p>
        <Input value={company.name} disabled />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <>
              <p className="mb-2 font-semibold">
                {t('company.profile.address')}
              </p>
              <AddressSingleSelect
                selectedValue={field.value?.addressLine ?? ''}
                isError={!!errors.address?.addressLine}
                onItemSelect={field.onChange}
              />

              <p className="mb-2 font-semibold">
                {t('company.profile.postalCodeAndCity')}
              </p>
              <div className="flex flex-row gap-4 ">
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
          {t('company.profile.registrationNumber')}
        </p>
        <Input value={company.registrationNumber} disabled />

        <p className="mb-2 font-semibold">{t('company.profile.industry')}</p>
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

        <p className="mb-2 font-semibold">{t('company.profile.websiteUrl')}</p>
        <Input {...register('websiteUrl')} isError={!!errors.websiteUrl} />

        <p className="mb-2 font-semibold">{t('company.profile.linkedInUrl')}</p>
        <Input {...register('linkedInUrl')} isError={!!errors.linkedInUrl} />

        <p className="mb-2 font-semibold">
          {t('company.profile.glassdoorUrl')}
        </p>
        <Input {...register('glassdoorUrl')} isError={!!errors.glassdoorUrl} />

        <Button
          extraClassName="mx-auto mt-14"
          isLoading={isLoading}
          type="submit"
          text={t('company.profile.save')}
          disabled={isLoading}
          onClick={handleSubmit(submitForm)}
        />
      </form>
    </>
  )
}
