import { THobby } from 'API/Types/hobbies'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateHobbies } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import { RootState } from 'Store/Slices/rootReducer'
import HobbiesSelect from '../HobbiesSelect'

type IProps = {
  headerLabel: string
  onFormPostSubmit: () => void
  controlsBuilder: (
    submitHandler: () => void
  ) => React.ReactNode | React.ReactNode[]
}

type TDefaultValues = {
  hobbies: THobby[]
}

export const FreeTimeForm = ({
  headerLabel,
  controlsBuilder,
  onFormPostSubmit
}: IProps) => {
  const { t } = useTranslation()
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    hobbies: state.candidateProfile.candidate!.hobbies
  }))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { handleSubmit, watch, control } = useForm({
    mode: 'onChange',
    defaultValues
  })

  const hobbies = watch('hobbies')

  const onFormSubmit = () => {
    dispatch(updateHobbies({ hobbies }))
    onFormPostSubmit()
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <h1 className="mb-20 text-center text-lg">{headerLabel}</h1>
      <p className="mb-2 font-semibold">
        {t('candidate.createProfile.hobbies.selectTitle')}
      </p>
      <Controller
        name="hobbies"
        control={control}
        render={({ field }) => (
          <div className="mb-6">
            <HobbiesSelect
              selectedItems={hobbies}
              onItemsSelect={field.onChange}
            />
          </div>
        )}
      />
      <PrevNextMenu
        onBackBtnClick={() => navigate('/myprofile/profile/about-you')}
        onSubmitBtnClick={handleSubmit(onFormSubmit)}
        continueButtonLabel={t('candidate.settings.save')}
      />
      {controlsBuilder(handleSubmit(onFormSubmit))}
    </form>
  )
}
