import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { EducationForm } from 'Components/Organisms/EducationForm'

export const Step12 = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <EducationForm
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-14')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-11')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
