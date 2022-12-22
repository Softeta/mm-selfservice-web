interface IProps {
  title: string
  subtitle?: string
}

export const TitleBox: React.FC<IProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-mine-shaft/80 p-6 font-poppins">
      <p className="h-6 text-[1rem] font-bold text-white">{title}</p>
      <p className="h-6 text-sm text-white">{subtitle}</p>
    </div>
  )
}
