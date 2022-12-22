interface IProps {
  label: string
  onClick?: () => void
}

export const TextButton: React.FC<IProps> = ({ label, onClick }) => {
  return (
    <div
      className="cursor-pointer font-bold text-blue-ribbon"
      onClick={onClick}
    >
      {label}
    </div>
  )
}
