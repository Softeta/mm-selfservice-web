import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { useDispatch, useSelector } from 'react-redux'
import { setJob } from 'Store/Slices/CompanyRegistration/companyRegistrationReducer'
import { RootState } from 'Store/Slices/rootReducer'
import { TJobInitState } from 'Store/Slices/CompanyRegistration/Types/companyRegistrationState'
import { InitializeJobForm } from 'Forms/Company/InitializeJobForm'
import { TInitJobFormDefaultValues } from 'Forms/Company/InitializeJobForm/InitializeJobForm'
import { useEffect } from 'react'
import { setIsAdditionalJobCreationFlow } from 'Store/Slices/CreateJob/createJobReducer'

const currentDate = new Date()

export const Step1 = () => {
  const defaultValues = useSelector<RootState, TJobInitState>(
    (state) => state.companyRegistration.job!
  )

  const formDefaultValues = {
    ...defaultValues,
    startDate: defaultValues?.startDate ?? currentDate
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setIsAdditionalJobCreationFlow(true))
  }, [dispatch])

  const submitForm = async (data: TInitJobFormDefaultValues) => {
    dispatch(setJob({ ...data }))
    navigate(routes.company.registration.step2)
  }

  return (
    <>
      <InitializeJobForm
        defaultValues={formDefaultValues}
        onFormSubmit={submitForm}
        isLoading={false}
      />
    </>
  )
}
