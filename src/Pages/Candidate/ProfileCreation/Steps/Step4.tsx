import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { ContactForm } from 'Forms/Candidate/ContactForm'

export const Step4 = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <ContactForm
        onFormPostSubmit={() => navigate('/myprofile/profile-creation/step-5')}
        controlsBuilder={(submitHandler) => (
          <PrevNextMenu
            onBackBtnClick={() =>
              navigate('/myprofile/profile-creation/step-3')
            }
            onSubmitBtnClick={submitHandler}
            bottomPositionClassName="bottom-settings-only-menu"
          />
        )}
      />
    </div>
  )
}
