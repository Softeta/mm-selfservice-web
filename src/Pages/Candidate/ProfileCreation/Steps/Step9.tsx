import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { ExperienceList } from 'Components/Organisms/ExperienceList'

export const Step9 = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <ExperienceList saveExperiencePath="/myprofile/profile-creation/step-10" />
      <PrevNextMenu
        onBackBtnClick={() => navigate('/myprofile/profile-creation/step-8')}
        onSubmitBtnClick={() => navigate('/myprofile/profile-creation/step-11')}
        bottomPositionClassName="bottom-settings-only-menu"
      />
    </div>
  )
}
