'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ImageUploader from './image.uploader'
import TagLoader from './tag.loader'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Tag } from '@prisma/client'
import Editor from './editor'
import TagSelector from './tag.selector'

export default function PostForm() {
  const router = useRouter()
  const { data: session } = useSession()
  const [tags, setTags] = useState<Tag[]>([])
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [content, setContent] = useState('')

  const handleContentChange = (value: string) => {
    setContent(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const postData = {
        title,
        content,
        shortDesc,
        image: uploadedImageUrl,
        email: session?.user?.email,
        tags: tags.map((tag) => tag.id),
      }
      await axios.post('/api/admin/blogs', postData)
      toast.success('Post criado com sucesso')
      router.push('/admin/posts')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao criar post')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TagLoader setTags={setTags} />
      <ImageUploader
        setUploadedImageUrl={setUploadedImageUrl}
        initialImageUrl={null}
      />
      <textarea
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="placeholder:text-4xl h-auto md:placeholder:text-6xl placeholder:font-extrabold font-extrabold placeholder:text-[#333333] text-[#333333] w-full text-4xl md:text-6xl rounded my-4 focus:outline-none overflow-hidden resize-none border-none"
      />
      <textarea
        placeholder="Descrição curta"
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
        rows={5}
        className="placeholder:text-base md:placeholder:text-lg border-2 border-[#333333] placeholder:font-semibold font-semibold placeholder:text-[#333333] text-[#333333] w-full text-base md:text-lg rounded my-4 focus:outline-none overflow-hidden resize-none p-2"
      />
      <TagSelector tags={tags} selectedTags={tags} setSelectedTags={setTags} />
      <Editor value={content} onChange={handleContentChange} />
      <button
        type="submit"
        className="bg-[#333333] text-white rounded px-4 py-2 w-full sm:w-auto"
      >
        Criar post
      </button>
    </form>
  )
}
