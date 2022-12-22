import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'
import { ExperienceList } from 'Components/Organisms/ExperienceList'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const ExperienceListPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <ProfilePageContainer>
      <div className="grid w-full pt-16">
        <ExperienceList saveExperiencePath="/myprofile/profile/experience/career" />
        <PrevNextMenu
          onBackBtnClick={() => navigate('/myprofile/profile/experience')}
          onSubmitBtnClick={() => navigate('/myprofile/profile/experience')}
          continueButtonLabel={t('candidate.settings.save')}
        />
      </div>
    </ProfilePageContainer>
  )
}
