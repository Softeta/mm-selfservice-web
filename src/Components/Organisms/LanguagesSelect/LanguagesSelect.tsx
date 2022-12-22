import { useLanguages, useRecommendedLanguages } from 'API/Calls/languages'
import { TLanguage } from 'API/Types/languages'
import { TagSelect } from 'Components/Molecules'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toLanguages, toTags } from './helpers'

interface IProps {
  selectedItems?: TLanguage[]
  onItemsSelect: (industry: TLanguage[]) => void
  className?: string
  label?: string
  isError?: boolean
}

const LanguagesSelect = ({
  onItemsSelect,
  selectedItems = [],
  className = '',
  isError = false
}: IProps) => {
  const { t } = useTranslation()
  const [searchTag, setSearchTag] = useState('')

  const { data: languages, refetch } = useLanguages(searchTag)
  const recommendedLanguages = useRecommendedLanguages()

  const tagList = useMemo(() => {
    const languageList: TLanguage[] | undefined =
      searchTag?.length > 0
        ? languages?.data?.data
        : recommendedLanguages?.data?.data

    if (!languageList) return []

    const filtered = languageList.filter(
      (language) => !selectedItems.some((tag) => language.id === tag.id)
    )

    return toTags(filtered)
  }, [searchTag, languages?.data, recommendedLanguages?.data, selectedItems])

  useEffect(() => {
    if (searchTag.trim().length < 1) {
      return
    }

    refetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTag])

  return (
    <TagSelect
      className={className}
      tags={tagList}
      selectedTags={toTags(selectedItems || [])}
      setSelectedTags={(tags) => onItemsSelect(toLanguages(tags))}
      selectedTagsLabel={t('languages.selectedLanguages')}
      setSearchTag={setSearchTag}
      isError={isError}
    />
  )
}

export default LanguagesSelect
