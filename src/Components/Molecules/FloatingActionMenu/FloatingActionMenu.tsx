import { useState } from 'react'
import { CircleButton } from 'Components/Atoms'

type TFloatingAction = {
  label: string
  onClick: () => void
}

type TFloatingActionMenu = {
  actions: TFloatingAction[]
  position?: string
}

export const FloatingActionMenu = ({
  actions,
  position = 'right-4 bottom-32'
}: TFloatingActionMenu) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className={`fixed z-10 grid w-auto ${position}`}>
      {isMenuOpen &&
        actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className="mb-2 h-[50px] w-[174px] rounded-[50px] bg-white text-sm text-spanish-gray"
          >
            {action.label}
          </button>
        ))}
      <div className="flex justify-end">
        <CircleButton
          iconType="add"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          isActive={isMenuOpen}
          variant="primary"
        />
      </div>
    </div>
  )
}
