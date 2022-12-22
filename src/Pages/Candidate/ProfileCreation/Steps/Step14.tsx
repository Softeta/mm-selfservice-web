import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { EducationList } from 'Components/Organisms/EducationList'

export const Step14 = () => {
  const navigate = useNavigate()

  return (
    <div className="pt-16">
      <EducationList
        saveEducationPath="/myprofile/profile-creation/step-12"
        saveCoursePath="/myprofile/profile-creation/step-13"
      />
      <PrevNextMenu
        onBackBtnClick={() => navigate('/myprofile/profile-creation/step-11')}
        onSubmitBtnClick={() => navigate('/myprofile/profile-creation/step-15')}
        bottomPositionClassName="bottom-settings-only-menu"
      />
    </div>
  )
}
