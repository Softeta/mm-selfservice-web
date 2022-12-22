import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { TSkill } from 'API/Types/skills'
import { SkillsSelect } from 'Components/Organisms/SkillsSelect'
import { updateCompetencies } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { TPosition } from 'API/Types/position'

type IProps = {
  headerLabel: string
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  skills: TSkill[]
}

export const SkillsForm = ({
  headerLabel,
  onFormPostSubmit,
  controlsBuilder
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    skills: state.candidateProfile.candidate!.skills
  }))
  const currentPosition = useSelector<RootState, TPosition | undefined>(
    (state) => state.candidateProfile.candidate?.currentPosition
  )

  const dispatch = useDispatch()

  const { handleSubmit, watch, control } = useForm({
    mode: 'onChange',
    defaultValues
  })

  const skills = watch('skills')

  const onFormSubmit = () => {
    dispatch(updateCompetencies({ skills }))
    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">{headerLabel}</h1>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.skills.selectTitle')}
      </p>
      <Controller
        name="skills"
        control={control}
        render={({ field }) => (
          <div className="mb-6">
            <SkillsSelect
              jobPosition={currentPosition}
              selectedTags={skills}
              onTagsSelect={field.onChange}
            />
          </div>
        )}
      />
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </form>
  )
}
