interface IProps {
  text: string
}

export const LabelTag: React.FC<IProps> = ({ text }) => {
  return (
    <div className="inline-flex absolute top-0 right-0 place-items-center h-full bg-emerald rounded-r-md">
      <p className="px-0.5 text-2xs text-white">{text}</p>
    </div>
  )
}
