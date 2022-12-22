interface IProps {
  label?: string
  children: React.ReactNode | React.ReactNode[]
}

export const InfoContainer: React.FC<IProps> = ({ label, children }) => {
  return (
    <div className="grid gap-6 rounded-md bg-smart-white p-6">
      <div className="text-md font-bold text-mine-shaft">{label}</div>
      <div className="whitespace-pre-wrap">{children}</div>
    </div>
  )
}
