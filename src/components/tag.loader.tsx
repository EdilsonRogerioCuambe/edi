'use client'
import { useEffect, useCallback } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Tag } from '@prisma/client'

interface TagLoaderProps {
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>
}

export default function TagLoader({ setTags }: TagLoaderProps) {
  const getTags = useCallback(async () => {
    try {
      const response = await axios.get('/api/admin/tags')
      setTags(response.data)
    } catch (error) {
      console.error(error)
      toast.error('Erro ao carregar tags')
      return []
    }
  }, [setTags])

  useEffect(() => {
    getTags()
  }, [getTags])

  return null
}
