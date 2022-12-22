import WorkFormats from '../Enums/workFormats'
import WorkingHoursType from '../Enums/workingHoursType'

export type TCandidateWorkTermsRequest = {
  workingHoursTypes?: WorkingHoursType[]
  weeklyWorkHours?: number
  startDate?: string
  formats?: WorkFormats[]
}
