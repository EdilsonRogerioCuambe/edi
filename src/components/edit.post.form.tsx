'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ImageUploader from '@/components/image.uploader'
import TagLoader from '@/components/tag.loader'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Post, Tag } from '@prisma/client'
import Editor from '@/components/editor'
import TagSelector from '@/components/tag.selector'

interface EditPostFormProps {
  post: Post & { tags: Tag[] }
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [tags, setTags] = useState<Tag[]>([])
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    post.image || null,
  )
  const [title, setTitle] = useState(post.title)
  const [shortDesc, setShortDesc] = useState(post.shortDesc)
  const [content, setContent] = useState(post.content)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [title])

  const handleContentChange = (value: string) => {
    setContent(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const updatedPost = {
        title,
        content,
        shortDesc,
        image: uploadedImageUrl,
        tags: tags.map((tag) => tag.id),
        authorId: session?.user?.id,
      }
      await axios.patch(`/api/admin/blog/${post.slug}`, updatedPost)
      toast.success('Post atualizado com sucesso')
      router.push('/admin')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar post')
    }
  }

  useEffect(() => {
    setTags(post.tags)
  }, [post.tags])

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <TagLoader setTags={setTags} />
      <ImageUploader
        setUploadedImageUrl={setUploadedImageUrl}
        initialImageUrl={uploadedImageUrl}
      />
      <textarea
        placeholder="Título"
        value={title}
        ref={textareaRef}
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
        Atualizar post
      </button>
    </form>
  )
}
