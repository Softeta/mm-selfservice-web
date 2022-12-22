import { Input, Tag as TagComponent } from 'Components/Atoms'
import React, { useMemo, useState } from 'react'
import { ReactComponent as ClearIcon } from 'Assets/Icons/clear.svg'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'
import { Tag } from 'API/Types/tags'
import { CircularProgress } from '@mui/material'

interface IProps {
  tags: Tag[]
  selectedTags: Tag[]
  recommendedTags?: Tag[]
  setSelectedTags: (tags: Tag[]) => void
  onCreateTag?: (tags: Tag[]) => void
  className?: string
  selectedTagsLabel: string
  recommendedTagsLabel?: string
  isMultiselect?: boolean
  isError?: boolean
  isLoading?: boolean
  setSearchTag?: (searchTag: string) => void
}

const TAG_HIDE_THRESHOLD = 2

const tagExists = (tags: Tag[], tag: Tag) =>
  !!tags.find((t) => t.code.toLowerCase().includes(tag.code.toLowerCase()))

export const TagSelect: React.FC<IProps> = ({
  tags,
  selectedTags,
  recommendedTags,
  setSelectedTags,
  onCreateTag,
  className,
  selectedTagsLabel,
  recommendedTagsLabel,
  isError,
  isLoading = false,
  setSearchTag
}) => {
  const { t } = useTranslation()
  const [isTagsOpen, setIsTagsOpen] = useState(false)
  const [showAllSelectedTags, setShowAllSelectedTags] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const hasMore = selectedTags.length > TAG_HIDE_THRESHOLD
  const hasSelectedTags = selectedTags.length > 0
  const notSelectedTags = tags.filter((tag) => !tagExists(selectedTags, tag))

  const visibleSelectedTags = showAllSelectedTags
    ? selectedTags
    : selectedTags.slice(0, TAG_HIDE_THRESHOLD)

  const newTag =
    notSelectedTags.length === 0 &&
    onCreateTag &&
    !tagExists(tags, { code: searchValue })
      ? { code: searchValue }
      : null

  let toggleSelectedTagsLabel

  if (showAllSelectedTags) {
    toggleSelectedTagsLabel = t('tagSelect.showLess')
  } else {
    toggleSelectedTagsLabel = t('tagSelect.showMore', {
      count: selectedTags.length - visibleSelectedTags.length
    })
  }

  const recommendedTagList = useMemo(() => {
    if (!recommendedTags) return []

    const filtered = recommendedTags.filter(
      (skill) => !selectedTags.some((tag) => skill.id === tag.id)
    )
    return filtered
  }, [recommendedTags, selectedTags])

  const handleSearchValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setSearchTag && setSearchTag(e.target.value)
  }

  const handleSearchValueChangeonKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAppendTag({ code: searchValue })
      setSearchValue('')
    }
  }

  const handleOpenTags = () => {
    setIsTagsOpen(true)
  }

  const handleCloseTags = () => {
    setIsTagsOpen(false)
    setShowAllSelectedTags(false)
  }

  const handleAddTag = (tag: Tag) => {
    setSelectedTags([...selectedTags, tag])
  }

  const handleAppendTag = (tag: Tag) => {
    if (!onCreateTag) {
      return
    }

    if (onCreateTag && !tagExists(tags, { code: searchValue })) {
      onCreateTag([...tags, tag])
    }

    if (!tagExists(selectedTags, tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const handleRemoveTag = (tag: Tag) => {
    setSelectedTags(selectedTags.filter((t) => t.code !== tag.code))
  }

  const handleClearTags = (e:React.MouseEvent) => {
    setSearchValue('');
    e.preventDefault();
  }

  const clearButtonUI = (
    <button
      className="absolute right-2 flex w-6 items-center"
      onClick={(e) => handleClearTags(e)}
    >
      <ClearIcon />
    </button>
  );

  let tagsUI

  if (isTagsOpen) {
    tagsUI = (
      <div
        className="w-full rounded-md bg-white p-5"
        onMouseDown={(e) => e.preventDefault()}
      >
        {isLoading && <CircularProgress size={20} /> }
        <div className="flex flex-wrap">
          {newTag && (
            <TagComponent
              label={newTag.code}
              className="mr-2 mb-3 border-black font-bold text-black"
              onClick={() => handleAppendTag(newTag)}
            />
          )}
          {notSelectedTags.map((tag) => (
            <TagComponent
              key={tag.code}
              label={tag.label || tag.code}
              className="mr-2 mb-3"
              onClick={() => handleAddTag(tag)}
            />
          ))}
        </div>

        <div className="text-base font-semibold">{recommendedTagsLabel}</div>
        <div className="mb-3 flex flex-wrap">
          {recommendedTagList.map((tag) => (
            <TagComponent
              key={tag.code}
              label={tag.label || tag.code}
              className="mt-3 mr-2"
              onClick={() => handleAddTag(tag)}
            />
          ))}
        </div>

        <div className="text-base font-semibold">{selectedTagsLabel}</div>
        <div className="flex flex-wrap">
          {visibleSelectedTags.map((tag) => (
            <TagComponent
              key={tag.code}
              label={tag.label || tag.code}
              type="selected"
              className="mt-3 mr-2"
              onClick={() => handleRemoveTag(tag)}
            />
          ))}
        </div>
        {hasMore && (
          <button
            className="mt-3 flex text-base font-semibold text-spanish-gray"
            onClick={(e) => {
              e.preventDefault()
              setShowAllSelectedTags(!showAllSelectedTags)
            }}
          >
            {toggleSelectedTagsLabel}
          </button>
        )}
      </div>
    )
  } else if (hasSelectedTags) {
    tagsUI = (
      <div className="flex flex-wrap">
        {selectedTags.map((tag) => (
          <TagComponent
            key={tag.code}
            label={tag.label || tag.code}
            type="selected"
            className="mt-2 mr-2"
            onClick={() => handleRemoveTag(tag)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className={clsx(className, 'relative')}>
      <Input
        RightElement={searchValue ? clearButtonUI : undefined}
        className="pr-8"
        containerClassName="mb-1"
        value={searchValue}
        onChange={handleSearchValueChange}
        onFocus={handleOpenTags}
        onBlur={handleCloseTags}
        isError={isError}
        onKeyDown={handleSearchValueChangeonKeyDown}
      />
      {tagsUI}
    </div>
  )
}
