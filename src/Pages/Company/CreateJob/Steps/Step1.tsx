import { useNavigate } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { InitializeJobForm } from 'Forms/Company/InitializeJobForm'
import { TInitJobFormDefaultValues } from 'Forms/Company/InitializeJobForm/InitializeJobForm'
import { initalizeJob } from 'API/Calls/jobCoreInformation'
import { useMutation, useQueryClient } from 'react-query'
import { TJobStep1Request } from 'API/Types/Jobs/jobCoreInformation'
import { useEffect } from 'react'
import { setIsAdditionalJobCreationFlow } from 'Store/Slices/CreateJob/createJobReducer'

const currentDate = new Date()

export const Step1 = () => {
  const queryClient = useQueryClient()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setIsAdditionalJobCreationFlow(false))
  }, [dispatch])

  const companyId = useSelector<RootState, string>(
    (state) => state.contactPerson.contactPerson!.companyId
  )

  const navigate = useNavigate()
  const { isLoading, mutate } = useMutation((request: TJobStep1Request) =>
    initalizeJob(request, queryClient).then((result) => {
      if (result) {
        navigate(routes.company.jobs.create.step4(result.data.id))
      }
    })
  )
  const formDefaultValues = {
    startDate: currentDate,
    workTypes: [],
    isUrgent: false
  }

  const submitForm = async (data: TInitJobFormDefaultValues) => {
    mutate({ ...data, companyId, position: data.position! })
  }

  return (
    <InitializeJobForm
      defaultValues={formDefaultValues}
      onFormSubmit={submitForm}
      isLoading={isLoading}
    />
  )
}
