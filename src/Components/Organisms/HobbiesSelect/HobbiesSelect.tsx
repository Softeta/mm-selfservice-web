import { useHobbies } from 'API/Calls/hobbies'
import { Tag } from 'API/Types/tags'
import { TagSelect } from 'Components/Molecules'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

interface IProps {
  selectedItems?: Tag[]
  onItemsSelect: (industry: Tag[]) => void
  className?: string
  label?: string
  isError?: boolean
}

const HobbiesSelect = ({
  selectedItems,
  onItemsSelect,
  className = '',
  isError = false
}: IProps) => {
  const { t } = useTranslation()
  const [searchTag, setSearchTag] = useState('')

  const { data: hobbies, refetch } = useHobbies(searchTag)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTag])

  return (
    <TagSelect
      className={className}
      tags={hobbies?.data.data || []}
      selectedTags={selectedItems || []}
      setSelectedTags={onItemsSelect}
      selectedTagsLabel={t('hobbies.selectedHobbies')}
      setSearchTag={setSearchTag}
      isError={isError}
    />
  )
}

export default HobbiesSelect
