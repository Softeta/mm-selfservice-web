import CreateJobProvider from 'Contexts/CreateJob/CreateJobProvider'
import CreateJobRoutes from 'Routes/Company/CreateJobRoutes'

export const CreateJob = () => {
  return (
    <CreateJobProvider>
      <CreateJobRoutes />
    </CreateJobProvider>
  )
}
