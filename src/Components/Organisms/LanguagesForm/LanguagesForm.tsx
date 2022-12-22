import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import LanguagesSelect from 'Components/Organisms/LanguagesSelect'
import { TLanguage } from 'API/Types/languages'
import { updateCompetencies } from 'Store/Slices/CandidateProfile/candidateProfileReducer'

type IProps = {
  headerLabel: string
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  languages: TLanguage[]
}

export const LanguagesForm = ({
  controlsBuilder,
  headerLabel,
  onFormPostSubmit
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    languages: state.candidateProfile.candidate?.languages || []
  }))
  const dispatch = useDispatch()

  const { handleSubmit, watch, control } = useForm({
    mode: 'onChange',
    defaultValues
  })

  const languages = watch('languages')

  const onFormSubmit = () => {
    dispatch(updateCompetencies({ languages }))
    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">{headerLabel}</h1>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.languages.selectTitle')}
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
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </form>
  )
}
