interface IProps {
  field: string
  value?: string
}

export const CardLine = ({ field, value }: IProps) => {
  return (
    <div className="flex justify-between text-base">
      <span className="mb-4 font-semibold">{field}</span>
      {value && <span>{value}</span>}
    </div>
  )
}
