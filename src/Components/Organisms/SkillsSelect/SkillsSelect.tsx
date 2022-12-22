import { TagSelect } from 'Components/Molecules/TagSelect'
import { useMutation } from 'react-query'
import { useSkills, addSkill, useRecommendedSkills } from 'API/Calls/skills'
import { useState, useEffect } from 'react'
import { Tag } from 'API/Types/tags'
import { useTranslation } from 'react-i18next'
import { TPosition } from 'API/Types/position'
import { useDebounce } from 'Hooks/useDebounce'

interface IProps {
  selectedTags?: Tag[]
  onTagsSelect: (tags: Tag[]) => void
  isError?: boolean
  className?: string
  jobPosition?: TPosition
}

export const SkillsSelect = ({
  selectedTags,
  onTagsSelect,
  isError,
  className,
  jobPosition
}: IProps) => {
  const { t } = useTranslation()
  const [searchTag, setSearchTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { data: skills, refetch } = useSkills(searchTag)
  const recommendedSkills = useRecommendedSkills(jobPosition?.code)
  const debouncedSearchValue = useDebounce(searchTag);
  
  useEffect(() => {
    if (debouncedSearchValue.length > 1) {
      refetch();
    }
  }, [debouncedSearchValue])

  useEffect(() => {
    setIsLoading(false)
  }, [skills])  

  const mutation = useMutation((skill: string) => addSkill(skill))

  const handleNewSkill = (skill: Tag[]) => {
    mutation.mutate(skill[0].code)
    refetch()
  }
  const handleSetSearchTag = (searchTag: string) => {
    if (searchTag.length > 1) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
    setSearchTag(searchTag)
  }
  return (
    <TagSelect
      isLoading={isLoading}
      className={className}
      tags={skills?.data.data || []}
      recommendedTags={recommendedSkills.data?.data?.data || []}
      selectedTags={selectedTags || []}
      setSelectedTags={onTagsSelect}
      selectedTagsLabel={t('skillsSelect.selectedSkills')}
      recommendedTagsLabel={t('skillsSelect.recommendedSkills')}
      onCreateTag={handleNewSkill}
      setSearchTag={handleSetSearchTag}
      isError={isError}
    />
  )
}
