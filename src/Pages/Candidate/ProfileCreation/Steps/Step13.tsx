import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { CourseForm } from 'Components/Organisms/CourseForm'

export const Step13 = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <CourseForm
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
