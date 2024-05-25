'use client'

import React from 'react'
import Select, { MultiValue } from 'react-select'
import { Tag } from '@prisma/client'

interface TagSelectorProps {
  tags: Tag[]
  selectedTags: Tag[]
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

interface OptionType {
  value: Tag
  label: string
}

export default function TagSelector({
  tags,
  selectedTags,
  setSelectedTags,
}: TagSelectorProps) {
  const handleChange = (selectedOptions: MultiValue<OptionType>) => {
    const newSelectedTags = selectedOptions
      ? selectedOptions.map((option) => option.value)
      : []
    setSelectedTags(newSelectedTags)
  }

  const options = tags.map((tag) => ({
    value: tag,
    label: tag.name,
  }))

  return (
    <Select
      isMulti
      value={selectedTags.map((tag) => ({ value: tag, label: tag.name }))}
      onChange={handleChange}
      options={options}
      className="my-4"
      placeholder="Selecione as tags..."
    />
  )
}
