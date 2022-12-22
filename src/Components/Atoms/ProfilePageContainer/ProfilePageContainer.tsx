interface IProps {
  children: React.ReactNode | React.ReactNode[]
}

export const ProfilePageContainer = ({ children }: IProps) => {
  return (
    <div className="h-screen overflow-y-auto bg-spring-wood md:h-[calc(100vh_-_theme(spacing.scroll-bar-correction))]">
      <div className="grid w-full justify-items-center px-6">
        <div className="grid w-full justify-items-center lg:w-content-container">
          {children}
        </div>
      </div>
    </div>
  )
}
