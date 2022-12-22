import { SkillsList } from 'Components/Molecules/SkillsList'

interface IProps {
  title: string
  tags: string[]
}

export const TagsList = ({ title, tags }: IProps) => (
  <div className="grid gap-3 py-5">
    <p className="text-base font-bold">{title}</p>
    <SkillsList skills={tags} />
  </div>
)
