import CompanyWorkingHoursType from 'API/Types/Enums/companyWorkingHours'
import { TJob } from 'API/Types/Jobs/jobs'

export type TCreateJobState = {
  isAdditionalJobCreationFlow?: boolean
  pending?: boolean
  job?: TJob
  companyWorkingHours?: CompanyWorkingHoursType[]
}
