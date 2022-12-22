import { CircularProgress } from '@mui/material'
import { TCandidateTestsResponse } from 'API/Types/Candidate/candidateTestsGet'
import { Button } from 'Components/Atoms'
import { Chart } from 'Components/Atoms/Chart'
import { InfoContainer } from 'Components/Atoms/Info/InfoContainer'
import { PapiWheel } from 'Components/Atoms/PapiWheel'
import { TGradeScore } from 'Components/Molecules/GradeScore/GradeScore'
import { useTranslation } from 'react-i18next'
import { PapiGradeTable } from 'Templates/PapiGradeTable'

type TProps = {
  data?: TCandidateTestsResponse
  isLoading: boolean
  isBackOfficeUser?: boolean
}

type TGradeScoreType = TGradeScore | undefined

export const CandidateTestResults = ({
  data,
  isLoading,
  isBackOfficeUser
}: TProps) => {
  const { t } = useTranslation()
  const papiScores = data?.data.personalityAssessment?.scores
  const logicalScores = data?.data.logicalAssessment?.scores

  return (
    <>
      {isLoading && <CircularProgress />}
      {!isLoading && (
        <div className="grid gap-4">
          <InfoContainer>
            <div className="flex flex-wrap justify-center gap-2 pb-4">
              {isBackOfficeUser && data?.data.papiDynamicWheel?.url && (
                <Button
                  text={t('tests.papi.fetchHtml')}
                  variant="custom"
                  className="border-2 border-cathedral bg-spring-wood text-cathedral"
                  onClick={() =>
                    window.open(
                      data?.data.papiDynamicWheel?.url,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                />
              )}
              {data?.data.papiGeneralFeedback?.url && (
                <Button
                  text={t('tests.papi.fetchPdf')}
                  variant="custom"
                  className="border-2 border-cathedral bg-spring-wood text-cathedral"
                  onClick={() =>
                    window.open(
                      data?.data.papiGeneralFeedback?.url,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                />
              )}
              {data?.data.lgiGeneralFeedback?.url && (
                <Button
                  text={t('tests.lgi.fetchPdf')}
                  variant="custom"
                  className="border-2 border-cathedral bg-spring-wood text-cathedral"
                  onClick={() =>
                    window.open(
                      data?.data.lgiGeneralFeedback?.url,
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                />
              )}
            </div>
            {data?.data.papiDynamicWheel?.url && (
              <PapiWheel htmlUrl={data?.data.papiDynamicWheel?.url} />
            )}
          </InfoContainer>
          {papiScores && (
            <PapiGradeTable
              grades={{
                a1: papiScores?.a1 as TGradeScoreType,
                a2: papiScores?.a2 as TGradeScoreType,
                w1: papiScores?.w1 as TGradeScoreType,
                w2: papiScores?.w2 as TGradeScoreType,
                r1: papiScores?.r1 as TGradeScoreType,
                r2: papiScores?.r2 as TGradeScoreType,
                s1: papiScores?.s1 as TGradeScoreType,
                s2: papiScores?.s2 as TGradeScoreType,
                y1: papiScores?.y1 as TGradeScoreType,
                y2: papiScores?.y2 as TGradeScoreType,
                sd: papiScores?.sd as TGradeScoreType,
                aq: papiScores?.aq as TGradeScoreType
              }}
            />
          )}
          {logicalScores && (
            <>
              <InfoContainer
                label={t('tests.cognitiveCapacity.overall.header')}
              >
                <div className="grid gap-16">
                  {t('tests.report.overall')}
                  <div className="grid justify-items-center">
                    <div className="grid grid-cols-2 gap-20 md:grid-cols-3">
                      <Chart
                        label={t('tests.cognitiveCapacity.overall.speed')}
                        progressPercentage={logicalScores?.speed}
                      />
                      <Chart
                        label={t('tests.cognitiveCapacity.overall.overall')}
                        progressPercentage={logicalScores?.total}
                      />
                      <Chart
                        label={t('tests.cognitiveCapacity.overall.accuracy')}
                        progressPercentage={logicalScores?.accuracy}
                      />
                    </div>
                  </div>
                </div>
              </InfoContainer>
              <InfoContainer
                label={t('tests.cognitiveCapacity.elaborated.header')}
              >
                <div className="grid gap-16">
                  {t('tests.report.elaborated')}
                  <div className="grid justify-items-center">
                    <div className="grid grid-cols-2 gap-20 md:grid-cols-3">
                      <Chart
                        label={t('tests.cognitiveCapacity.elaborated.verbal')}
                        progressPercentage={logicalScores?.verbal}
                      />
                      <Chart
                        label={t(
                          'tests.cognitiveCapacity.elaborated.numerical'
                        )}
                        progressPercentage={logicalScores?.numerical}
                      />
                      <Chart
                        label={t('tests.cognitiveCapacity.elaborated.abstract')}
                        progressPercentage={logicalScores?.abstract}
                      />
                    </div>
                  </div>
                </div>
              </InfoContainer>
            </>
          )}
        </div>
      )}
    </>
  )
}
