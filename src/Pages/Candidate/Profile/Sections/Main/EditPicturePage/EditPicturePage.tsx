import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { PictureForm } from 'Forms/Candidate/PictureForm'
import { useTranslation } from 'react-i18next'

export const EditPicturePage = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div className="pt-16">
      <PictureForm
        onFormPostSubmit={() => navigate('/myprofile/profile')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            continueButtonLabel={t('candidate.settings.save')}
            onBackBtnClick={() => navigate('/myprofile/profile')}
            onSubmitBtnClick={submitHandler}
          />
        )}
      />
    </div>
  )
}
