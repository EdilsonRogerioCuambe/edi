'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ImageUploader from '@/components/image.uploader'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Editor } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight-ssr'
import math from '@bytemd/plugin-math-ssr'
import 'katex/dist/katex.css'
import 'highlight.js/styles/default.css'
import 'bytemd/dist/index.css'
import { Tag, Post } from '@prisma/client'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

interface EditPostFormProps {
  post: Post & { tags: Tag[] }
  tags: Tag[]
}

export default function EditPostForm({ post, tags }: EditPostFormProps) {
  const animatedComponents = makeAnimated()
  const router = useRouter()
  const { data: session } = useSession()
  const [selectedTags, setSelectedTags] = useState<
    { id: string; name: string }[]
  >([])
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
        tags: selectedTags.map((tag) => tag.id),
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
    setSelectedTags(
      post.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    )
  }, [post.tags])

  const tagOptions = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
  }))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ImageUploader
        setUploadedImageUrl={setUploadedImageUrl}
        initialImageUrl={uploadedImageUrl}
      />
      <textarea
        placeholder="Título"
        value={title}
        ref={textareaRef}
        onChange={(e) => setTitle(e.target.value)}
        className="placeholder:text-4xl h-auto md:placeholder:text-6xl placeholder:font-extrabold font-extrabold placeholder:text-[#333333] text-[#333333] w-full text-4xl md:text-6xl rounded my-10 focus:outline-none overflow-hidden resize-none border-none"
      />
      <textarea
        placeholder="Descrição curta"
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
        maxLength={200}
        rows={10}
        className="placeholder:text-base md:placeholder:text-lg border-2 border-gray-300 font-semibold placeholder:text-[#333333] text-[#333333] w-full text-base md:text-lg rounded my-4 focus:outline-none overflow-hidden resize-none p-2"
      />
      <Select
        isMulti
        options={tagOptions}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id}
        value={selectedTags}
        onChange={(selectOptions) => {
          setSelectedTags(selectOptions as { id: string; name: string }[])
        }}
        closeMenuOnSelect={false}
        components={animatedComponents}
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Selecione categorias..."
        styles={{
          control: (provided) => ({
            ...provided,
            borderRadius: '0.375rem',
            padding: '0.5rem',
            boxShadow: 'none',
          }),
          multiValue: (provided) => ({
            ...provided,
          }),
          multiValueLabel: (provided) => ({
            ...provided,
          }),
          multiValueRemove: (provided) => ({
            ...provided,
          }),
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          option: (provided, state) => ({
            ...provided,
          }),
          menu: (provided) => ({
            ...provided,
          }),
        }}
      />
      <Editor
        plugins={[
          gfm(),
          breaks(),
          frontmatter(),
          gemoji(),
          highlight(),
          math(),
        ]}
        key="editor"
        onChange={handleContentChange}
        placeholder="Escreva algo..."
        value={content}
      />
      <button
        type="submit"
        className="bg-[#333333] text-white rounded px-4 py-2 w-full sm:w-auto"
      >
        Atualizar post
      </button>
    </form>
  )
}
