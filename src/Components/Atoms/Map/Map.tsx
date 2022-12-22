interface IProps {
  keyName: string
  value: string
}

export const Map: React.FC<IProps> = ({ keyName, value }) => (
  <div className="flex items-center justify-between">
    <p className="text-base font-bold">{keyName}</p>
    <p className="text-base">{value}</p>
  </div>
)
