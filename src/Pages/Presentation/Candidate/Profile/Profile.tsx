import WorkingHoursType from 'API/Types/Enums/workingHoursType'
import { Button } from 'Components/Atoms'
import { InfoContainer } from 'Components/Atoms/Info/InfoContainer'
import { InfoTable } from 'Components/Molecules/InfoTable'
import { SkillsList } from 'Components/Molecules/SkillsList'
import CandidateJobContext from 'Contexts/CandidateJob/CandidateJobContext'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { addressToCityCountry } from 'Utils/address'

export const Profile = () => {
  const { t } = useTranslation()
  const jobCandidate = useContext(CandidateJobContext)!
  const candidate = jobCandidate.candidate
  const hasLinkedIn = !!candidate.linkedInUrl
  const hasCv = !!candidate.curriculumVitae?.uri
  const permanentSet =
    !!candidate.currency && !!candidate.permanent?.monthlySalary
  const freelanceSet = !!candidate.currency && !!candidate.freelance
  return (
    <>
      <div className="grid gap-2">
        <p className="text-lg font-bold">{candidate.fullName}</p>
        <p className="text-md">{candidate.currentPosition?.code}</p>
      </div>
      {(hasLinkedIn || hasCv) && <div className="h-4"></div>}
      <div className="flex gap-4">
        {hasLinkedIn && (
          <Button
            text={t('candidate.profile.linkedInUrl')}
            onClick={() =>
              window.open(
                candidate.linkedInUrl,
                '_blank',
                'noopener,noreferrer'
              )
            }
            sizeClassName="h-12 w-48"
          />
        )}
        {hasCv && (
          <Button
            text={t('candidate.profile.downloadCV')}
            variant="custom"
            onClick={() =>
              window.open(
                candidate.curriculumVitae?.uri,
                '_blank',
                'noopener,noreferrer'
              )
            }
            className="border-2 border-cathedral bg-spring-wood text-cathedral"
            sizeClassName="h-12 w-48"
          />
        )}
      </div>
      <div className="h-4"></div>
      <div className="grid w-full gap-4 md:flex">
        <div className="md:flex-1">
          <InfoTable
            items={[
              {
                label: t('candidate.profile.age'),
                value:
                  candidate?.birthDate &&
                  new Date(Date.parse(candidate.birthDate)).getAge().toString()
              },
              {
                label: t('candidate.profile.address'),
                value: addressToCityCountry(candidate.address)
              },
              {
                label: t('candidate.profile.language'),
                value: candidate.languages?.map((l) => l.name).join(', ')
              }
            ]}
          />
        </div>
        <div className="md:flex-1">
          <InfoTable
            items={[
              {
                label: t('candidate.profile.workType'),
                value: candidate?.workTypes
                  ?.map((w) => t(`classificator.workType.${w}`))
                  .join(' / ')
              },
              {
                label: t('candidate.profile.workFormat'),
                value: candidate?.formats
                  ?.map((w) =>
                    t(`candidate.createProfile.workLoad.${w.toLowerCase()}`)
                  )
                  .join(' / ')
              },
              {
                label: t('candidate.profile.startDate'),
                value: candidate.startDate?.split('T')[0]
              }
            ]}
          />
        </div>
      </div>
      {permanentSet && <div className="h-4"></div>}
      {permanentSet && (
        <InfoTable
          label={t('candidate.profile.permanent')}
          items={[
            {
              label: t('candidate.profile.minPayMonthPermanent'),
              value: candidate.permanent?.monthlySalary
                ? t(`salary.month.${candidate.currency?.toLowerCase()}`, {
                  salary: candidate.permanent?.monthlySalary
                })
                : undefined
            },
            {
              label: t('candidate.profile.workingHoursType'),
              value: candidate.workingHourTypes
                ?.filter((w) => w != WorkingHoursType.ProjectEmployment)
                ?.map((w) =>
                  t(`candidate.createProfile.workLoad.${w.toLowerCase()}`)
                )
                .join(' / ')
            },
            {
              label: t('candidate.profile.hoursPerWeek'),
              value: candidate.weeklyWorkHours?.toString()
            }
          ]}
        />
      )}
      {freelanceSet && <div className="h-4"></div>}
      {freelanceSet && (
        <InfoTable
          label={t('candidate.profile.freelance')}
          items={[
            {
              label: t('candidate.profile.minPayMonthFreelance'),
              value: candidate.freelance?.monthlySalary
                ? t(`salary.month.${candidate.currency?.toLowerCase()}`, {
                  salary: candidate.freelance?.monthlySalary
                })
                : undefined
            },
            {
              label: t('candidate.profile.minSalaryPerHour'),
              value: candidate.freelance?.hourlySalary
                ? t(`salary.hour.${candidate.currency?.toLowerCase()}`, {
                  salary: candidate.freelance?.hourlySalary
                })
                : undefined
            },
            {
              label: t('candidate.profile.hoursPerWeek'),
              value: candidate.weeklyWorkHours?.toString()
            },
            {
              label: t('candidate.profile.workingHoursType'),
              value: candidate.workingHourTypes
                ?.map((w) =>
                  t(`candidate.createProfile.workLoad.${w.toLowerCase()}`)
                )
                .join(' / ')
            }
          ]}
        />
      )}
      {candidate.skills && candidate.skills.length > 0 &&
        <>
          <div className="h-4"></div>
          <InfoContainer label={t('candidate.profile.skills')}>
            <SkillsList skills={candidate.skills.map((s) => s.code)} />
          </InfoContainer>
        </>
      }
      {candidate.industries && candidate.industries.length > 0 &&
        <>
          <div className="h-4"></div>
          <InfoContainer label={t('candidate.profile.industries')}>
            <SkillsList
              skills={candidate.industries.map((i) => i.code)}
              showUnset
            />
          </InfoContainer>
        </>
      }
      {candidate.languages && candidate.languages.length > 0 &&
        <>
          <div className="h-4"></div>
          <InfoContainer label={t('candidate.profile.languages')}>
            <SkillsList
              skills={candidate.languages.map((l) => l.name)}
              showUnset
            />
          </InfoContainer>
        </>
      }
      {candidate.bio &&
        <>
          <div className="h-4"></div>
          <InfoContainer label={t('candidate.profile.biography')}>
            {<p>{candidate.bio}</p>}
          </InfoContainer>
        </>
      }
      {candidate.hobbies && candidate.hobbies.length > 0 &&
        <>
          <div className="h-4"></div>
          <InfoContainer label={t('candidate.profile.hobbies')}>
            <SkillsList skills={candidate.hobbies.map((h) => h.code)} />
          </InfoContainer>
        </>
      }
    </>
  )
}
