import { GradeCircle } from 'Components/Atoms/GradeCircle'

export type TGradeScore = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

interface IProps {
  grade?: TGradeScore
}

const grades = Object.freeze([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

export const GradeScore: React.FC<IProps> = ({ grade }) => {
  return (
    <div className="flex gap-2">
      {grades.map((g, index) => (
        <GradeCircle key={index} grade={g.toString()} isActive={g === grade} />
      ))}
    </div>
  )
}
