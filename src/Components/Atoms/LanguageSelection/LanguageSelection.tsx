import { useContext, useState } from 'react'
import UserSettingsContext from 'Contexts/UserSettings/UserSettingsContext'
import { IOption } from 'Components/Atoms/Select'
import { ClassificatorsContext } from 'Contexts/Classificators/ClassificatorsContext'
import { ReactComponent as DropdownArrowIcon } from 'Assets/Icons/arrow-down.svg'

export const LanguageSelection = () => {
  const { systemLanguage, setLanguage } = useContext(UserSettingsContext)
  const { languages } = useContext(ClassificatorsContext)
  const [isOpen, setIsOpen] = useState(false)

  const getSelectedLanguage = () =>
    languages.find((x) => x.value === systemLanguage)

  const [selectedLanguage, setSelectedLanguage] = useState(
    getSelectedLanguage()
  )

  const handleLanguageSelect = (option: IOption) => {
    setSelectedLanguage(option)
    setLanguage(option.value)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <div
        className="flex cursor-pointer items-center gap-2 font-bold text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedLanguage?.label}
        <DropdownArrowIcon className="h-4 w-4" />
      </div>
      {isOpen && (
        <ul className="absolute right-0 z-10 max-h-60 w-24 overflow-scroll rounded-md border border-nobel bg-white">
          {languages.map((option, index) => (
            <li
              key={String(index)}
              className="z-20 flex h-12 cursor-pointer items-center justify-start px-4 text-dusty-gray last:rounded-b-lg hover:bg-blue-ribbon hover:text-white"
              onMouseDown={() => handleLanguageSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
