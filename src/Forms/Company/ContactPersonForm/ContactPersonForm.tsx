import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { TPhone } from 'API/Types/phone'
import { RegularExpressions } from 'Variables/regularExpressions'
import { TContactPerson } from 'API/Types/Company/contactPerson'
import { TPosition } from 'API/Types/position'
import ContactPersonRole from 'API/Types/Enums/contactPersonRole'
import { Button, Input } from 'Components/Atoms'
import { useEffect, useState } from 'react'
import PositionSingleSelect from 'Components/Organisms/PositionSingleSelect'
import { PhoneInput } from 'Components/Molecules'
import Checkbox from 'Components/Atoms/Checkbox'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { useMutation } from 'react-query'
import {
  createContactPerson,
  rejectContactPerson,
  updateContactPerson
} from 'API/Calls/contactPersons'
import { CircularProgress } from '@mui/material'
import { TCompanyContactPersonCreateRequest } from 'API/Types/Company/companyContactPerson'
import { routes } from 'Routes/routes'
import clsx from 'clsx'

type IProps = {
  companyId: string
  person?: TContactPerson
  onUpdated: () => void
}

type TDefaultValues = {
  firstName?: string | null
  lastName?: string | null
  position?: TPosition | null
  email?: string | null
  phone?: TPhone | null
  isAdmin?: boolean
}

const validationSchema = yup.object({
  // Match anything without white spaces at the beginning and at the end
  firstName: yup.string().required().matches(RegularExpressions.nameValue),
  lastName: yup.string().required().matches(RegularExpressions.nameValue),
  email: yup.string().required().email(),
  position: yup.object().required()
})

const getDefaultValues = (person?: TContactPerson): TDefaultValues => ({
  firstName: person?.firstName || null,
  lastName: person?.lastName || null,
  position: person?.position,
  email: person?.email || null,
  phone: person?.phone || null,
  isAdmin: person?.role === ContactPersonRole.Admin
})

export const ContactPersonForm = ({ companyId, person, onUpdated }: IProps) => {
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const navigate = useNavigate()
  const defaultValues = getDefaultValues(person)
  const currentUserContactId = useSelector<RootState, string | undefined>(
    (state) => state.contactPerson.contactPerson?.id
  )

  const saveContactPerson = useMutation(
    (request: TCompanyContactPersonCreateRequest) => {
      if (person) {
        return updateContactPerson(companyId, person.id, {
          ...request,
          picture: { hasChanged: false }
        })
      }

      return createContactPerson(companyId, request)
    }
  )

  const cancelContactPersonHandler = () => {
    setLoading(true)
    cancelContactPerson.mutate(
      { companyId, personId: person!.id },
      { onSuccess: onUpdated, onSettled: () => setLoading(false) }
    )
  }

  const cancelContactPerson = useMutation(
    (request: { companyId: string; personId: string }) => {
      return rejectContactPerson(request.companyId, request.personId)
    }
  )

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  useEffect(() => {
    const newDefaultValues = getDefaultValues(person)
    reset(newDefaultValues)
  }, [person, reset])

  const firstName = watch('firstName')
  const lastName = watch('lastName')
  const position = watch('position')
  const email = watch('email')
  const phone = watch('phone')
  const isAdmin = watch('isAdmin')

  const onFormSubmit = () => {
    setLoading(true)
    saveContactPerson.mutate(
      {
        firstName: firstName!,
        lastName: lastName!,
        position: position!,
        email: email!,
        phone: phone == null ? undefined : phone,
        role: isAdmin ? ContactPersonRole.Admin : ContactPersonRole.User
      },
      { onSuccess: onUpdated, onSettled: () => setLoading(false) }
    )
  }

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <h1 className="mb-10 text-lg font-bold">
          {!person && t('contactPersons.form.addHeader')}
          {!!person && t('contactPersons.form.editHeader')}
        </h1>
        {loading && <CircularProgress />}
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          <div>
            <p className="mb-2 font-semibold">
              {t('contactPersons.form.firstName')}
            </p>
            <Input {...register('firstName')} isError={!!errors.firstName} />
          </div>
          <div>
            <p className="mb-2 font-semibold">
              {t('contactPersons.form.lastName')}
            </p>
            <Input {...register('lastName')} isError={!!errors.lastName} />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          <div>
            <p className="mb-2 font-semibold">
              {t('contactPersons.form.position')}
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
          </div>
          <div>
            <p className="mb-2 font-semibold">
              {t('contactPersons.form.email')}
            </p>
            <Input
              {...register('email')}
              isError={!!errors.email}
              disabled={!!person?.id}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
          <div>
            <p className="mb-2 font-semibold">
              {t('contactPersons.form.phone')}
            </p>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <div>
                  <PhoneInput
                    isError={!!errors.phone}
                    value={field.value === null ? undefined : field.value}
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
          </div>
          <div>
            <p className="mb-2 font-semibold">
              {t('contactPersons.form.adminRights')}
            </p>
            <Checkbox
              className={clsx("mt-4 text-md", {
                "pointer-events-none opacity-50 accent-[gray]": currentUserContactId === person?.id
              })}
              checked={isAdmin}
              label={t('contactPersons.form.adminRightsCheckbox')}
              {...register('isAdmin')}
            />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button text={t('contactPersons.form.save')} disabled={loading} />
          <Button
            text={t('contactPersons.form.delete')}
            variant="secondary"
            onClick={(e) => {
              e.preventDefault()
              cancelContactPersonHandler()
            }}
            disabled={currentUserContactId === person?.id || !person}
          />
          <Button
            text={t('contactPersons.form.close')}
            variant="secondary"
            onClick={(e) => {
              e.preventDefault()
              navigate(routes.company.contacts.base)
            }}
            disabled={loading}
          />
        </div>
      </form>
    </div>
  )
}
