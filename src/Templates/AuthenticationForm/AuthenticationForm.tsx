import { LanguageSelection } from 'Components/Atoms/LanguageSelection'

interface IProps {
  children: React.ReactNode
}

export const AuthenticationForm = ({ children }: IProps) => {
  return (
    <div className="relative grid h-screen w-screen place-items-end bg-blue-ribbon md:h-screen md:place-items-center">
      <div className="absolute right-4 top-4">
        <LanguageSelection />
      </div>
      <div className="min-h-[24rem] w-full rounded-t-3xl bg-white py-14 px-11 md:w-[40rem] md:rounded-3xl">
        {children}
      </div>
    </div>
  )
}
