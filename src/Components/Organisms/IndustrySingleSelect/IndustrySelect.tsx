import { useIndustries } from 'API/Calls/industries'
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

const IndustrySelect = ({
  selectedItems,
  onItemsSelect,
  className = '',
  isError = false
}: IProps) => {
  const { t } = useTranslation()
  const [searchTag, setSearchTag] = useState('')

  const { data: industries, refetch } = useIndustries(searchTag)

  useEffect(() => {
    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTag])

  return (
    <TagSelect
      className={className}
      tags={industries?.data.data || []}
      selectedTags={selectedItems || []}
      setSelectedTags={onItemsSelect}
      selectedTagsLabel={t('industries.selectedIndustries')}
      setSearchTag={setSearchTag}
      isError={isError}
    />
  )
}

export default IndustrySelect
