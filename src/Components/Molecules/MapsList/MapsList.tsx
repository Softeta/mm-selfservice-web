import { Map } from 'Components/Atoms/Map'

export type TMap = {
  name: string
  value: string
}

interface IProps {
  maps: TMap[]
  title?: string
}

export const MapsList = ({ maps, title }: IProps) => (
  <div className="grid gap-3 py-5">
    {title && <p className="text-base font-bold">{title}</p>}
    {maps.map((map, index) => (
      <Map key={index} keyName={map.name} value={map.value} />
    ))}
  </div>
)
