import clsx from 'clsx'
import { Button } from 'Components/Atoms/Button'
import { useTranslation } from 'react-i18next'
import { format } from 'date-fns'
import DateFormats from 'API/Types/Enums/dateFormats'
import { CardLine } from './CardLine'
import getWorkTypes from 'Helpers/getWorkTypes'
import { TJobBrief } from 'API/Types/Jobs/Common/jobBrief'

type IProps = {
  job: TJobBrief
  buttonLabel: string
  onButtonClick?: () => void
  title: string
  variant?: 'active' | 'expired'
}

export const JobCard = ({
  job,
  buttonLabel,
  onButtonClick,
  title,
  variant = 'active'
}: IProps) => {
  const { t } = useTranslation()

  const translatedWorkType = getWorkTypes(job.freelance, job.permanent)
    .map((x) => t(`classificator.workType.${x}`))
    .join('/')

  return (
    <div
      className={clsx(
        'relative flex h-96 w-96 flex-col justify-between rounded-md px-6 pb-5',
        variant === 'active' && 'bg-white',
        variant === 'expired' && 'bg-pearl-bush text-pastel-grey '
      )}
    >
      <p className="mt-12 text-lg font-bold  leading-8">{title}</p>

      <div className="">
        <CardLine
          field={t('jobCard.field.status')}
          value={t(`classificator.jobStage.${job.jobStage}`)}
        />
        <CardLine
          field={t('jobCard.field.workType')}
          value={translatedWorkType}
        />
        <CardLine
          field={t('jobCard.field.owner')}
          value={
            job.owner
              ? `${job.owner?.firstName} ${job.owner?.lastName}`
              : undefined
          }
        />
        <CardLine
          field={t('jobCard.field.mainContact')}
          value={
            job.mainContact
              ? `${job.mainContact?.firstName} ${job.mainContact?.lastName}`
              : undefined
          }
        />
        <CardLine
          field={t('jobCard.field.createdAt')}
          value={format(new Date(job.createdAt), DateFormats.Date)}
        />

        <Button
          text={buttonLabel}
          variant={(variant === 'expired' && 'disabled') || 'primary'}
          onClick={onButtonClick}
          extraClassName={clsx(
            'mt-3 w-full  grow',
            variant === 'expired' && 'bg-pastel-grey'
          )}
        />
      </div>
    </div>
  )
}
