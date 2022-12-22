import { useTranslation } from 'react-i18next'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { useNavigate } from 'react-router-dom'
import { EducationList } from 'Components/Organisms/EducationList'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'

export const EducationListPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        <EducationList
          saveEducationPath="/myprofile/profile/experience/education/save-education"
          saveCoursePath="/myprofile/profile/experience/education/save-course"
        />
        <PrevNextMenu
          onBackBtnClick={() => navigate('/myprofile/profile/experience')}
          onSubmitBtnClick={() => navigate('/myprofile/profile/experience')}
          continueButtonLabel={t('candidate.settings.save')}
        />
      </div>
    </ProfilePageContainer>
  )
}
