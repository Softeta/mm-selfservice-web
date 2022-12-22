import { InfoContainer } from 'Components/Atoms/Info/InfoContainer'
import { TGradeScore } from 'Components/Molecules/GradeScore/GradeScore'
import { GradeTable } from 'Components/Organisms/GradeTable'
import { useTranslation } from 'react-i18next'

type TGrades = {
  a1?: TGradeScore
  a2?: TGradeScore
  w1?: TGradeScore
  w2?: TGradeScore
  r1?: TGradeScore
  r2?: TGradeScore
  s1?: TGradeScore
  s2?: TGradeScore
  y1?: TGradeScore
  y2?: TGradeScore
  sd?: TGradeScore
  aq?: TGradeScore
}

interface IProps {
  grades: TGrades
}

export const PapiGradeTable: React.FC<IProps> = ({ grades }) => {
  const { t } = useTranslation()

  return (
    <InfoContainer label={t('papi.header')}>
      <GradeTable
        header={{ indicator: 'A', title: t('papi.grade.a') }}
        grades={[
          {
            label: { indicator: 'A1', title: t('papi.grade.a1') },
            grade: grades.a1
          },
          {
            label: { indicator: 'A2', title: t('papi.grade.a2') },
            grade: grades.a2
          }
        ]}
      />
      <div className="py-6">
        <hr className="border-dashed border-list-separator" />
      </div>
      <GradeTable
        header={{ indicator: 'W', title: t('papi.grade.w') }}
        grades={[
          {
            label: { indicator: 'W1', title: t('papi.grade.w1') },
            grade: grades.w1
          },
          {
            label: { indicator: 'W2', title: t('papi.grade.w2') },
            grade: grades.w2
          }
        ]}
      />
      <div className="py-6">
        <hr className="border-dashed border-list-separator" />
      </div>
      <GradeTable
        header={{ indicator: 'R', title: t('papi.grade.r') }}
        grades={[
          {
            label: { indicator: 'R1', title: t('papi.grade.r1') },
            grade: grades.r1
          },
          {
            label: { indicator: 'R2', title: t('papi.grade.r2') },
            grade: grades.r2
          }
        ]}
      />
      <div className="py-6">
        <hr className="border-dashed border-list-separator" />
      </div>
      <GradeTable
        header={{ indicator: 'S', title: t('papi.grade.s') }}
        grades={[
          {
            label: { indicator: 'S1', title: t('papi.grade.s1') },
            grade: grades.s1
          },
          {
            label: { indicator: 'S2', title: t('papi.grade.s2') },
            grade: grades.s2
          }
        ]}
      />
      <div className="py-6">
        <hr className="border-dashed border-list-separator" />
      </div>
      <GradeTable
        header={{ indicator: 'Y', title: t('papi.grade.y') }}
        grades={[
          {
            label: { indicator: 'Y1', title: t('papi.grade.y1') },
            grade: grades.y1
          },
          {
            label: { indicator: 'Y2', title: t('papi.grade.y2') },
            grade: grades.y2
          },
          {
            label: { indicator: 'SD', title: t('papi.grade.sd') },
            grade: grades.sd
          },
          {
            label: { indicator: 'AQ', title: t('papi.grade.aq') },
            grade: grades.aq
          }
        ]}
      />
    </InfoContainer>
  )
}
