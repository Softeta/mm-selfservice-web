interface IProps {
  rank: number
}

export const RankBox: React.FC<IProps> = ({ rank }) => {
  return (
    <div className="grid h-8 w-8 items-center justify-center rounded-md bg-blue-ribbon text-[1rem] font-bold text-white">
      {rank}
    </div>
  )
}
