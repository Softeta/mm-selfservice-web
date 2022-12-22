import { useCandidateTests } from 'API/Calls/candidatesTests'
import { TCandidate } from 'API/Types/Candidate/candidateGet'
import WorkingHoursType from 'API/Types/Enums/workingHoursType'
import WorkTypes from 'API/Types/Enums/workType'
import { RequirementsList } from 'Components/Molecules/RequirementsList'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'Store/Slices/rootReducer'

export const CandidateProfileRequirements: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const candidate = useSelector<RootState, TCandidate | undefined>(
    (state) => state.candidateProfile.candidate
  )

  const { data: tests, isLoading } = useCandidateTests(candidate?.id || '')

  const hasContactInfo = !!(
    candidate?.firstName &&
    candidate?.lastName &&
    candidate?.phone &&
    candidate?.address
  )

  const hasExperience =
    (candidate?.candidateWorkExperiences || []).length > 0 ||
    (candidate?.candidateEducations || []).length > 0

  const hasCompetencies =
    (candidate?.industries || []).length > 0 ||
    (candidate?.skills || []).length > 0 ||
    (candidate?.hobbies || []).length > 0

  const hasTerms =
    !!candidate?.workingHourTypes &&
    (candidate?.workingHourTypes?.includes(WorkingHoursType.PartTime) ===
      false ||
      !!candidate?.weeklyWorkHours) &&
    !!candidate.startDate &&
    !!candidate.formats &&
    (candidate?.workTypes?.includes(WorkTypes.Permanent) ===
      false ||
      !!candidate?.permanent?.monthlySalary) &&
    (!candidate?.freelance || !!candidate?.freelance?.hourlySalary)

  const hasTests = !!(
    tests?.data.logicalAssessment && tests?.data.personalityAssessment
  )

  return (
    <RequirementsList
      title={t('candidate.dashboard.profileFullfillment.header')}
      description={t('candidate.dashboard.profileFullfillment.description')}
      requirements={[
        {
          label: t('candidate.dashboard.profileFullfillment.contactInfo'),
          fullfilled: hasContactInfo,
          onClick: () =>
            navigate('/myprofile/profile/about-you/edit-contact-information')
        },
        {
          label: t('candidate.dashboard.profileFullfillment.experience'),
          fullfilled: hasExperience,
          onClick: () => navigate('/myprofile/profile/experience')
        },
        {
          label: t('candidate.dashboard.profileFullfillment.competencies'),
          fullfilled: hasCompetencies,
          onClick: () => navigate('/myprofile/profile/qualifications')
        },
        {
          label: t('candidate.dashboard.profileFullfillment.terms'),
          fullfilled: hasTerms,
          onClick: () => navigate('/myprofile/profile/terms')
        },
        {
          label: t('candidate.dashboard.profileFullfillment.tests'),
          fullfilled: hasTests,
          onClick: () => navigate('/myprofile/tests'),
          isLoading
        }
      ]}
    />
  )
}
