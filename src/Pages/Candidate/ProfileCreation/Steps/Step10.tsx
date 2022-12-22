import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { ExperienceForm } from 'Components/Organisms/ExperienceForm'

export const Step10 = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <ExperienceForm
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-9')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-9')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
