import { InfoContainer } from 'Components/Atoms/Info/InfoContainer'
import { InfoRecord } from 'Components/Atoms/Info/InfoRecord'

type TItem = {
  label: string
  value?: string
  visible?: boolean
}

interface IProps {
  label?: string
  items: TItem[]
}

export const InfoTable: React.FC<IProps> = ({ label, items }) => {
  return (
    <InfoContainer label={label}>
      <div className="grid gap-4">
        {items.map((item, index) => (
          <InfoRecord
            key={index}
            label={item.label}
            value={item.value}
            visible={item.visible}
          />
        ))}
      </div>
    </InfoContainer>
  )
}
