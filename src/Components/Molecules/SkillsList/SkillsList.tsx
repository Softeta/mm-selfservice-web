import { SkillCard } from 'Components/Atoms/SkillCard'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

const NUM_SKILLS = 4

export interface IProps {
  skills: string[]
  showUnset?: boolean
}

const SkillsListComponent = ({
  skills,
  showUnset = false,
  ...rest
}: IProps) => {
  const { t } = useTranslation()
  const [showMore, setShowMore] = useState(false)

  return (
    <>
      {skills.length > 0 && (
        <ul className="flex list-none flex-wrap gap-2" {...rest}>
          {!showMore && _mapSkills(skills.slice(0, NUM_SKILLS))}
          {showMore && _mapSkills(skills)}
          {skills.length > NUM_SKILLS && (
            <div className="ml-2 grid content-center">
              <span
                className="cursor-pointer font-poppins text-base font-semibold text-blue-ribbon"
                onClick={() => setShowMore(!showMore)}
              >
                {!showMore &&
                  t('tagSelect.showMore', {
                    count: skills.length - NUM_SKILLS
                  })}
                {showMore && t('tagSelect.showLess')}
              </span>
            </div>
          )}
        </ul>
      )}
    </>
  )
}

export const SkillsList = SkillsListComponent

const _mapSkills = (skills: string[]) =>
  skills.map((skill, index) => <SkillCard key={index} title={skill} />)
