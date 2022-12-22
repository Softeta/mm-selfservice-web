import { BlueSide } from './BlueSide'
import { ReactNode } from 'react'
import { PrevNextMenu } from 'Components/Molecules/PrevNextMenu'

interface IProps {
  titleKey: string
  children: ReactNode
  onBackClick?: () => void
  onNextClick: () => void
  isLoading?: boolean
  disabledNext?: boolean
}

export const Step = ({
  titleKey,
  children,
  onBackClick,
  onNextClick,
  isLoading,
  disabledNext
}: IProps) => {
  return (
    <div className="flex h-content-with-header flex-col overflow-y-scroll bg-spring-wood md:grid md:grid-cols-2 md:overflow-y-hidden">
      <BlueSide titleKey={titleKey} className="flex" />
      <div className="grid md:overflow-scroll">
        <div className="w-full py-8 px-4 md:py-10 md:px-8 lg:px-12 xl:py-12 xl:px-24">
          {children}
        </div>
        <PrevNextMenu
          isLoading={isLoading}
          isSubmitBtnDisabled={disabledNext}
          className="fixed inset-x-auto w-full md:w-1/2"
          onBackBtnClick={onBackClick}
          onSubmitBtnClick={onNextClick}
          fullWidth
        />
      </div>
    </div>
  )
}
