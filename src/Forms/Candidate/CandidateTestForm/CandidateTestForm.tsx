import { useSelector } from 'react-redux'
import { RootState } from 'Store/Slices/rootReducer'
import {
  createLogicalTest,
  createPersonalityTest,
  useCandidateTests
} from 'API/Calls/candidatesTests'
import { useMutation } from 'react-query'
import { Button } from 'Components/Atoms'
import { useNavigate } from 'react-router-dom'
import { Notification } from 'Components/Molecules/Notification'
import useInterval from 'Hooks/useInterval'
import { Trans, useTranslation } from 'react-i18next'
import { TalogyAssesssmentStatus } from 'API/Types/Candidate/candidateTestsGet'

export const CandidateTestForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const containsRedirectUrl = window.document.referrer.includes(
    import.meta.env.VITE_FRONTOFFICE_CUBIKS_HOST
  )
  const candidateId = useSelector<RootState, string>(
    (state) => state.candidateProfile.candidate!.id!
  )

  const { data, refetch } = useCandidateTests(candidateId)
  const { mutateAsync: mutateLogicalTest, isLoading: lgiIsLoading } =
    useMutation(async () => await createLogicalTest(candidateId))
  const { mutateAsync: mutatePersonalityTest, isLoading: papiIsLoading } =
    useMutation(async () => await createPersonalityTest(candidateId))

  const handleCreateLogicalTest = async () => {
    const response = await mutateLogicalTest()
    handleOpenTest(response.data.logicalAssessment!.url!)
  }

  const handleCreatePersonalityTest = async () => {
    const response = await mutatePersonalityTest()
    handleOpenTest(response.data.personalityAssessment!.url!)
  }

  const handleOpenTest = (testUrl: string) => {
    window.open(testUrl, '_self')
  }

  const handleOpenResults = () => {
    navigate('/myprofile/tests/results')
  }

  const logicalAssessment = data?.data.logicalAssessment
  const personalityAssessment = data?.data.personalityAssessment

  useInterval(
    () => {
      refetch()
    },
    (logicalAssessment?.scores && personalityAssessment?.scores) ||
      !containsRedirectUrl
      ? null
      : 1000 * 60 * 5
  )

  return (
    <>
      {!containsRedirectUrl &&
        ((logicalAssessment?.status === TalogyAssesssmentStatus.Completed && !logicalAssessment?.scores) ||  
         (personalityAssessment?.status === TalogyAssesssmentStatus.Completed && !personalityAssessment?.scores)) && (
          <Notification type={'info'}>
            {t('candidate.tests.results.calculationInProgress')}
          </Notification>
        )}
      <div className="grid justify-items-center rounded-lg border-2 border-spanish-gray p-8">
        <span className="my-[-2.65rem] h-fit w-fit bg-spring-wood px-3 text-center font-bold text-spanish-gray">
          {t('candidate.tests.attention.header')}
        </span>
        <div className="grid w-full gap-1">
          <Trans
            i18nKey="candidate.tests.attention.text"
            components={[<span key={0} />]}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <p className="text-lg font-bold">
          {t('candidate.tests.logical.title')}
        </p>
        <Trans
          i18nKey="candidate.tests.logical.description"
          components={[<span key={0} />]}
        />
        {!logicalAssessment && (
          <Button
            isLoading={lgiIsLoading}
            disabled={lgiIsLoading}
            type="button"
            text={t('candidate.tests.logical.startAction')}
            onClick={handleCreateLogicalTest}
          />
        )}
        {logicalAssessment &&
          logicalAssessment.url &&
          !logicalAssessment.scores && (
            <Button
              key={logicalAssessment.packageInstanceId}
              type="button"
              text={t('candidate.tests.logical.continueAction')}
              onClick={() => handleOpenTest(logicalAssessment.url!)}
            />
          )}
        {logicalAssessment &&
          logicalAssessment.url &&
          logicalAssessment.scores && (
            <Button
              key={logicalAssessment.packageInstanceId}
              type="button"
              text={t('candidate.tests.resultsAction')}
              onClick={() => handleOpenResults()}
            />
          )}
      </div>
      <div className="grid gap-2">
        <p className="text-lg font-bold">
          {t('candidate.tests.personality.title')}
        </p>
        <Trans
          i18nKey="candidate.tests.personality.description"
          components={[<span key={0} />]}
        />
        {personalityAssessment &&
          personalityAssessment.url &&
          !personalityAssessment.scores && (
            <Button
              key={personalityAssessment.packageInstanceId}
              type="button"
              text={t('candidate.tests.personality.continueAction')}
              onClick={() => handleOpenTest(personalityAssessment.url!)}
            />
          )}
        {!personalityAssessment && (
          <Button
            isLoading={papiIsLoading}
            disabled={papiIsLoading}
            type="button"
            text={t('candidate.tests.personality.startAction')}
            onClick={handleCreatePersonalityTest}
          />
        )}
        {personalityAssessment &&
          personalityAssessment.url &&
          personalityAssessment.scores && (
            <Button
              key={personalityAssessment.packageInstanceId}
              type="button"
              text={t('candidate.tests.resultsAction')}
              onClick={() => handleOpenResults()}
            />
          )}
      </div>
    </>
  )
}
