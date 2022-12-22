interface IProps {
  header: string
  secondHeader?: string
}

export const HeaderBox: React.FC<IProps> = ({ header, secondHeader }) => (
  <div className="mb-5">
    <p className="pb-1 text-lg font-bold">{header}</p>
    <p className="text-md font-bold">{secondHeader}</p>
  </div>
)
