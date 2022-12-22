import { TFileResponse } from 'API/Types/fileResponse'
import { CandidateProfileHeader } from 'Components/Atoms/CandidateProfileHeader'
import { ProfilePageContainer } from 'Components/Atoms/ProfilePageContainer'
import { List } from 'Components/Molecules/List/List'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'Store/Slices/rootReducer'

type TCandidateHeaderData = {
  picture?: TFileResponse
  name?: string
  position?: string
}

export const Profile = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const candidate = useSelector<RootState, TCandidateHeaderData>((state) => {
    const data = state.candidateProfile.candidate

    return {
      picture: data?.picture,
      name: data?.fullName,
      position: data?.currentPosition?.code
    }
  })

  const profileMenuActions = [
    {
      key: 1,
      value: t('candidate.profile.aboutYou.header'),
      subtitle: t('candidate.profile.aboutYou.description'),
      onClick: () => navigate('/myprofile/profile/about-you')
    },
    {
      key: 2,
      value: t('candidate.profile.experience.header'),
      subtitle: t('candidate.profile.experience.description'),
      onClick: () => navigate('/myprofile/profile/experience')
    },
    {
      key: 3,
      value: t('candidate.profile.terms.header'),
      subtitle: t('candidate.profile.terms.description'),
      onClick: () => navigate('/myprofile/profile/terms')
    },
    {
      key: 4,
      value: t('candidate.profile.qualifications.header'),
      subtitle: t('candidate.profile.qualifications.description'),
      onClick: () => navigate('/myprofile/profile/qualifications')
    },
    {
      key: 5,
      value: t('candidate.profile.tests.header'),
      subtitle: t('candidate.profile.tests.description'),
      onClick: () => navigate('/myprofile/tests')
    }
  ]

  return (
    <ProfilePageContainer>
      <div className="grid w-full gap-8">
        <CandidateProfileHeader
          name={candidate.name || ''}
          position={candidate.position}
          photoUrl={candidate.picture?.uri}
          onEditPhoto={() => navigate('/myprofile/profile/edit-picture')}
        />
        <div className="mt-6">
          <List items={profileMenuActions} />
        </div>
      </div>
    </ProfilePageContainer>
  )
}
