interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

export const CompanyPageContainer = ({ children }: IProps) => {
  return (
    <div className="grid w-full justify-items-center">
      <div className="grid w-full max-w-[var(--max-desktop-width)] justify-items-center">
        {children}
      </div>
    </div>
  )
}
