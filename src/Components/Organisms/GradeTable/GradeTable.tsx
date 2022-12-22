import {
  GradeScore,
  TGradeScore
} from 'Components/Molecules/GradeScore/GradeScore'

type TGradeLabel = {
  indicator: string
  title: string
}

type TGrade = {
  label: TGradeLabel
  grade?: TGradeScore
}

interface IProps {
  header: TGradeLabel
  grades: TGrade[]
}

export const GradeTable: React.FC<IProps> = ({ header, grades }) => (
  <div className="grid gap-2">
    <table className="table-auto">
      <thead>
        <tr>
          <th className="w-10 text-left text-base font-bold">
            {header.indicator}
          </th>
          <th colSpan={2} className="text-left text-base font-bold">
            {header.title}
          </th>
        </tr>
      </thead>
      <tbody>
        {grades.map((g, index) => (
          <tr key={index} className="h-9">
            <td className="w-10 text-left text-base font-bold">
              {g.label.indicator}
            </td>
            <td className="pr-4 text-left text-base">{g.label.title}</td>
            {g.grade &&
              <td>
                <div className="grid justify-end">
                  <GradeScore grade={g.grade} />
                </div>
              </td>
            }
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)
