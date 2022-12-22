import { Separator } from 'Components/Atoms/Separator'
import { HeaderBox } from 'Components/Atoms/HeaderBox'
import { TJob } from 'API/Types/Jobs/jobs'
import { useTranslation } from 'react-i18next'
import { MapsList } from 'Components/Molecules/MapsList'
import { TagsList } from 'Components/Organisms/TagsList'
import { Timeline } from 'Components/Atoms/Timeline'
import SeniorityLevels from 'API/Types/Enums/seniorityLevels'
import { TMap } from 'Components/Molecules/MapsList/MapsList'
import { TJobSalaryBudget } from 'API/Types/Jobs/Common/jobSalaryBudget'
import { format } from 'date-fns'
import DateFormats from 'API/Types/Enums/dateFormats'

interface IProps {
  job: TJob
}

const timelineValues = Object.keys(SeniorityLevels)

export const JobDetailedView: React.FC<IProps> = ({ job }) => {
  const { t } = useTranslation()

  const formatSalaryRange = (salary: TJobSalaryBudget, currency: string) => {
    if (salary.from && salary.to) {
      return `${salary.from} ~ ${salary.to} ${currency}`
    }

    if (salary.from) {
      return `${t('candidate.profile.salaryFrom')} ${salary.from} ${currency}`
    }

    if (salary.to) {
      return `${t('candidate.profile.salaryUpTo')} ${salary.to} ${currency}`
    }

    return ''
  }

  const getJobDetails = (job?: TJob) => {
    const jobDetails: TMap[] = []

    const workingHours: string[] = []
    job?.workingHourTypes?.forEach((type) =>
      workingHours.push(
        t(`candidate.createProfile.workLoad.${type.toLowerCase()}`)
      )
    )

    const workFormats: string[] = []
    job?.formats?.forEach((format) =>
      workFormats.push(
        t(`candidate.createProfile.workLoad.${format.toLowerCase()}`)
      )
    )

    jobDetails.push({
      name: t('jobCard.field.status'),
      value: t(`classificator.jobStage.${job?.stage}`)
    })

    jobDetails.push({
      name: t('candidate.profile.workingHoursType'),
      value: workingHours.join(',') || ''
    })

    jobDetails.push({
      name: t('candidate.createProfile.workLoad.workFormats'),
      value: workFormats.join(',') || ''
    })

    jobDetails.push({
      name: t('candidate.profile.address'),
      value: job?.company.address.city + ', ' + job?.company.address.country
    })

    if (job?.startDate && !job.isUrgent) {
      jobDetails.push({
        name: t('candidate.profile.startDate'),
        value: format(new Date(job?.startDate), DateFormats.Date)
      })
    }

    if (job?.isUrgent) {
      jobDetails.push({
        name: t('candidate.profile.startDate'),
        value: t('company.jobDetails.asap')
      })
    }

    if (job?.endDate) {
      jobDetails.push({
        name: t('company.profileCreation.step1.endDate'),
        value: new Date(job?.endDate).toDateString()
      })
    }

    return jobDetails
  }

  const getJobBudgets = (job?: TJob) => {
    const budgets: TMap[] = []

    if (!job?.currency) {
      return budgets
    }

    if (job.permanent?.monthlyBudget) {
      budgets.push({
        name: t('candidate.profile.minPayMonthPermanent'),
        value: formatSalaryRange(job.permanent?.monthlyBudget, job.currency)
      })
    }

    if (job.freelance?.monthlyBudget) {
      budgets.push({
        name: t('candidate.profile.minPayMonthFreelance'),
        value: formatSalaryRange(job.freelance?.monthlyBudget, job.currency)
      })
    }

    if (job.freelance?.hourlyBudget) {
      budgets.push({
        name: t('candidate.profile.minSalaryPerHour'),
        value: formatSalaryRange(job.freelance?.hourlyBudget, job.currency)
      })
    }

    return budgets
  }

  const jobDetails = getJobDetails(job)
  const jobBudgets = getJobBudgets(job)

  return (
    <div className="w-full">
      <HeaderBox
        header={job.position.code || ''}
        secondHeader={job.company.name}
      ></HeaderBox>

      <Separator />

      <MapsList maps={jobDetails} />

      <Separator />

      <p className="mt-5 text-base font-bold">
        {t('company.job.create.descriptionStep.form.label')}
      </p>
      <p className="my-5 whitespace-pre-wrap text-base">{job.description}</p>

      <Separator />

      <Timeline
        title={t('candidate.profile.experience')}
        allValues={timelineValues}
        selectedValues={job.seniorities}
      />

      <Separator />

      <TagsList
        title={t('candidate.profile.skills')}
        tags={job.skills.map((skill) => skill.code) || []}
      />

      <Separator />

      {jobBudgets.length > 0 && <MapsList maps={jobBudgets} />}

      <Separator />

      <TagsList
        title={t('candidate.profile.languages')}
        tags={job.languages.map((language) => language.name) || []}
      />

      <Separator />

      <TagsList
        title={t('candidate.profile.industries')}
        tags={job.industries.map((industry) => industry.code) || []}
      />
    </div>
  )
}
