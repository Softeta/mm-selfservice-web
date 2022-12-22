import { useTranslation } from 'react-i18next'
import { Controller, useForm } from 'react-hook-form'
import { Step } from 'Components/Molecules/CompanyStep'
import { useNavigate, useParams } from 'react-router-dom'
import { routes } from 'Routes/routes'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { TLanguage } from 'API/Types/languages'
import { TSkill } from 'API/Types/skills'
import { TIndustry } from 'API/Types/industries'
import SeniorityLevels from 'API/Types/Enums/seniorityLevels'
import { SkillsSelect } from 'Components/Organisms/SkillsSelect'
import LanguagesSelect from 'Components/Organisms/LanguagesSelect'
import IndustrySelect from 'Components/Organisms/IndustrySingleSelect'
import { RangeSlider } from 'Components/Atoms/RangeSlider'
import { setCoreInformationStep5 } from 'Store/Slices/CreateJob/createJobReducer'
import WorkTypes from 'API/Types/Enums/workType'
import { TPosition } from 'API/Types/position'

type TDefaultValues = {
  skills?: TSkill[]
  languages?: TLanguage[]
  seniorities?: SeniorityLevels[]
  industries?: TIndustry[]
}

export const Step5 = () => {
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    skills: state.createJob.job?.skills,
    languages: state.createJob.job?.languages,
    seniorities: state.createJob.job?.seniorities.length ? 
      state.createJob.job?.seniorities :
      Object.keys(SeniorityLevels).map(x => x as SeniorityLevels),
    industries: state.createJob.job?.industries
  }))

  const workTypes = useSelector<RootState, WorkTypes[]>(
    (state) => state.createJob.job?.workTypes || []
  )

  const jobPosition = useSelector<RootState, TPosition | undefined>(
    (state) => state.createJob.job?.position
  )

  const { t } = useTranslation()

  const allSeniorities = Object.keys(SeniorityLevels).map((s) => ({
    value: s,
    title: t(`company.job.create.seniority.${s.toLowerCase()}`)
  }))

  const navigate = useNavigate()
  const params = useParams()
  const { jobId } = params
  const dispatch = useDispatch()

  const { handleSubmit, watch, control } = useForm<TDefaultValues>({
    mode: 'onChange',
    defaultValues: defaultValues
  })

  // TODO: get jobPosition

  const skills = watch('skills')
  const languages = watch('languages')
  const seniorities = watch('seniorities')
  const industries = watch('industries')

  const mappedSeniorities =
    seniorities?.length === 0
      ? allSeniorities
      : seniorities?.map((s) => ({
          value: s,
          title: t(`company.job.create.seniority.${s.toLowerCase()}`)
        })) || allSeniorities

  const submitForm = async () => {
    dispatch(
      setCoreInformationStep5({
        skills,
        languages,
        industries,
        seniorities
      })
    )

    if (
      workTypes.includes(WorkTypes.Permanent) &&
      workTypes.includes(WorkTypes.Freelance)
    ) {
      navigate(routes.company.jobs.create.step6FreelanceAndPermanent(jobId!))
    } else if (workTypes.includes(WorkTypes.Permanent)) {
      navigate(routes.company.jobs.create.step6Permanent(jobId!))
    } else if (workTypes.includes(WorkTypes.Freelance)) {
      navigate(routes.company.jobs.create.step6Freelance(jobId!))
    }
  }

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Step
        titleKey="company.job.create.candidateRequirementsStep.header"
        onNextClick={handleSubmit(submitForm)}
        onBackClick={() => navigate(routes.company.jobs.create.step4(jobId!))}
      >
        <p className="mb-2 font-semibold">
          {t('company.job.create.candidateRequirementsStep.skills')}
        </p>
        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <div className="mb-6">
              <SkillsSelect
                jobPosition={jobPosition}
                selectedTags={skills}
                onTagsSelect={field.onChange}
              />
            </div>
          )}
        />
        <p className="mb-2 font-semibold">
          {t('company.job.create.candidateRequirementsStep.languages')}
        </p>
        <Controller
          name="languages"
          control={control}
          render={({ field }) => (
            <div className="mb-6">
              <LanguagesSelect
                selectedItems={languages}
                onItemsSelect={field.onChange}
              />
            </div>
          )}
        />
        <p className="mb-2 font-semibold">
          {t('company.job.create.candidateRequirementsStep.seniorities')}
        </p>
        <Controller
          name="seniorities"
          control={control}
          render={({ field }) => (
            <div className="mb-6">
              <RangeSlider
                values={allSeniorities}
                selectedValues={mappedSeniorities}
                onSelectionChanged={(values) =>
                  field.onChange(values.map((v) => v.value as SeniorityLevels))
                }
              />
            </div>
          )}
        />
        <div className="h-4"></div>
        <p className="mb-2 font-semibold">
          {t('company.job.create.candidateRequirementsStep.industries')}
        </p>
        <Controller
          name="industries"
          control={control}
          render={({ field }) => (
            <div className="mb-6">
              <IndustrySelect
                selectedItems={industries}
                onItemsSelect={field.onChange}
              />
            </div>
          )}
        />
      </Step>
    </form>
  )
}
