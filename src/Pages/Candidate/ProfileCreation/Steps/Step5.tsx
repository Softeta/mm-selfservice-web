import { useTranslation } from 'react-i18next'
import { Input } from 'Components/Atoms/Input'
import { useForm } from 'react-hook-form'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import { useNavigate } from 'react-router-dom'
import { CoreInformationStatus } from 'API/Types/Enums/coreInformationStatus'
import { useEffect, useState } from 'react'
import { completeCoreInformation } from 'Store/Slices/CandidateProfile/candidateProfileReducer'
import ReactPlayer from 'react-player'

type TDefaultValues = {
  linkedInUrl?: string
  coreInformationStatus?: CoreInformationStatus
}

const validationSchema = yup.object({
  linkedInUrl: yup
    .string()
    .matches(/^((https?:\/\/)?([a-z]+\.)?linkedin\.com\/in\/.+)?$/i, {
      excludeEmptyString: true
    })
    .nullable(true)
    .transform((_, val) => (val === Number(val) ? val : null))
})

export const Step5 = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const defaultValues = useSelector<RootState, TDefaultValues>((state) => ({
    linkedInUrl: state.candidateProfile.candidate?.linkedInUrl
  }))
  const coreInformationStatus = useSelector<
    RootState,
    CoreInformationStatus | undefined
  >((state) => state.candidateProfile.coreInformationStatus)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(validationSchema)
  })

  const candidateLinkedInURL = watch('linkedInUrl')

  useEffect(() => {
    if (coreInformationStatus === CoreInformationStatus.Completing) {
      setIsLoading(true)
    }

    if (coreInformationStatus === CoreInformationStatus.Completed) {
      navigate('/myprofile/profile-creation/step-6')
    }

    if (coreInformationStatus === CoreInformationStatus.Error) {
      setIsLoading(false)
    }
  }, [coreInformationStatus])

  const onFormSubmit = async () => {
    dispatch(completeCoreInformation({ linkedInUrl: candidateLinkedInURL }))
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="pt-16">
        <h1 className="mb-20 text-center text-lg">
          {t('candidate.createProfile.downloadFromLinkedIn')}
        </h1>
        <p className="mb-2 font-semibold">
          {t('candidate.createProfile.linkToYourProfile')}
        </p>
        <Input {...register('linkedInUrl')} isError={!!errors.linkedInUrl} />
      </div>
      <div className="mt-20 grid place-content-center">
        <ReactPlayer
          url={import.meta.env.VITE_FRONTOFFICE_RESOURCE_LINKEDIN_URL}
          width="100%"
          height="auto"
          playing={true}
          loop={true}
        />
      </div>
      <PrevNextMenu
        isSubmitBtnDisabled={isLoading}
        isBackBtnDisabled={isLoading}
        onBackBtnClick={() => navigate('/myprofile/profile-creation/step-4')}
        onSubmitBtnClick={handleSubmit(onFormSubmit)}
        bottomPositionClassName="bottom-settings-only-menu"
      />
    </form>
  )
}
