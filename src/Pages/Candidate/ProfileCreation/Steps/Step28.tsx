import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { PictureForm } from 'Forms/Candidate/PictureForm'

export const Step28 = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <PictureForm
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-29')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-27')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
