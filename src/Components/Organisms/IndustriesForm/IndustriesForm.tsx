import { useTranslation } from 'react-i18next'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import IndustrySelect from 'Components/Organisms/IndustrySingleSelect'
import { TIndustry } from 'API/Types/industries'
import { updateCompetencies } from 'Store/Slices/CandidateProfile/candidateProfileReducer'

type IProps = {
  headerLabel: string
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  industries: TIndustry[]
}

export const IndustriesForm = ({
  headerLabel,
  onFormPostSubmit,
  controlsBuilder
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    industries: state.candidateProfile.candidate!.industries
  }))
  const dispatch = useDispatch()

  const { handleSubmit, watch, control } = useForm({
    mode: 'onChange',
    defaultValues
  })

  const industries = watch('industries')

  const onFormSubmit = () => {
    dispatch(updateCompetencies({ industries }))
    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">{headerLabel}</h1>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.industries.selectTitle')}
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
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </form>
  )
}
