import {
  RequirementFullfillment,
  TRequirement
} from 'Components/Atoms/RequirementFullfillment/RequirementFullfillment'

interface IProps {
  title: string
  description: string
  subtitle?: string
  requirements: TRequirement[]
}

export const RequirementsList: React.FC<IProps> = ({
  title,
  description,
  subtitle,
  requirements
}) => {
  return (
    <div className="grid">
      <p className="text-md font-bold">{title}</p>
      {subtitle && <p className="text-base">{subtitle}</p>}
      <p className="my-4">{description}</p>
      <div className="grid gap-3">
        {requirements.map((requirement, index) => (
          <RequirementFullfillment
            key={index}
            label={requirement.label}
            fullfilled={requirement.fullfilled}
            isLoading={requirement.isLoading}
            onClick={requirement.onClick}
          />
        ))}
      </div>
    </div>
  )
}
