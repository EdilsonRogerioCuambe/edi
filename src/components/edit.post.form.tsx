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
import { ClipLoader } from 'react-spinners'
import { useTheme } from '@/lib/theme.context'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { Button } from './ui/button'

interface EditPostFormProps {
  post: Post & { tags: Tag[] }
  tags: Tag[]
}

interface UploadedImage {
  url: string
  title: string
  alt: string
}

export default function EditPostForm({ post, tags }: EditPostFormProps) {
  const animatedComponents = makeAnimated()
  const router = useRouter()
  const { data: session } = useSession()
  const { theme } = useTheme()
  const [selectedTags, setSelectedTags] = useState<
    { id: string; name: string }[]
  >([])
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    post.image || null,
  )
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState(post.title)
  const [shortDesc, setShortDesc] = useState(post.shortDesc)
  const [content, setContent] = useState(post.content)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isPublished, setIsPublished] = useState(post.published)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [title])

  const handleContentChange = (value: string) => {
    setContent(value)
  }

  const handlePublishToggle = async () => {
    try {
      if (!title || !content || !shortDesc || !uploadedImageUrl) {
        toast.error('Preencha todos os campos')
        return
      }
      setLoading(true)
      const updatedPost = {
        title,
        content,
        shortDesc,
        image: uploadedImageUrl,
        tags: selectedTags.map((tag) => tag.id),
        authorId: session?.user?.id,
        published: !isPublished,
      }
      await axios.patch(`/api/admin/blog/${post.slug}`, updatedPost)
      setIsPublished(!isPublished)
      toast.success(
        isPublished
          ? 'Post arquivado com sucesso'
          : 'Post publicado com sucesso',
      )
    } catch (error) {
      console.error(error)
      toast.error('Erro ao alterar status do post')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (!title || !content || !shortDesc || !uploadedImageUrl) {
        toast.error('Preencha todos os campos')
        return
      }
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  const insertTextAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (textarea) {
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const newText =
        textarea.value.substring(0, start) +
        text +
        textarea.value.substring(end)
      setContent(newText)
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }
  }

  const handleImageUpload = async (
    files: File[],
  ): Promise<Pick<UploadedImage, 'url' | 'title' | 'alt'>[]> => {
    const uploadedImages: Pick<UploadedImage, 'url' | 'title' | 'alt'>[] = []

    for (const file of files) {
      const storageRef = ref(storage, `posts/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file)

      const url = await new Promise<string>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            console.log('Upload is ' + progress + '% done')
          },
          (error) => {
            console.error('Upload failed', error)
            reject(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(resolve).catch(reject)
          },
        )
      })

      insertTextAtCursor(`![alt text](${url})`)

      uploadedImages.push({
        url,
        title: file.name,
        alt: file.name,
      })
    }

    return uploadedImages
  }

  useEffect(() => {
    setSelectedTags(post.tags.map((tag) => ({ id: tag.id, name: tag.name })))
  }, [post.tags])

  const tagOptions = tags.map((tag) => ({ id: tag.id, name: tag.name }))

  return (
    <>
      <div className="mb-4 dark:bg-yellow-400 text-zinc-800 rounded-lg p-4 flex justify-between items-center">
        <span>{isPublished ? 'Arquivar' : 'Publicar'} Blog</span>
        <Button
          onClick={handlePublishToggle}
          className={`px-4 py-2 rounded text-white ${
            isPublished ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {isPublished ? 'Arquivar' : 'Publicar'}
        </Button>
      </div>
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
          className="placeholder:text-4xl h-auto md:placeholder:text-6xl placeholder:font-extrabold font-extrabold placeholder:text-[#333333] dark:placeholder:text-[#f5f5f5] text-[#333333] dark:text-[#f5f5f5] w-full text-4xl md:text-6xl rounded my-10 focus:outline-none overflow-hidden resize-none border-none bg-transparent"
        />
        <textarea
          placeholder="Descrição curta"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          maxLength={200}
          rows={10}
          className="placeholder:text-base md:placeholder:text-lg border-2 border-gray-300 dark:border-gray-600 font-semibold placeholder:text-[#333333] dark:placeholder:text-[#f5f5f5] text-[#333333] dark:text-[#f5f5f5] w-full text-base md:text-lg rounded my-4 focus:outline-none overflow-hidden resize-none p-2 bg-transparent"
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
              backgroundColor: theme === 'light' ? '#fff' : '#333333',
              borderColor: theme === 'light' ? '#ccc' : '#555555',
              color: theme === 'light' ? '#333333' : '#f5f5f5',
            }),
            multiValue: (provided) => ({
              ...provided,
              color: theme === 'light' ? '#333333' : '#f5f5f5',
              backgroundColor: theme === 'light' ? '#f5f5f5' : '#555555',
            }),
            multiValueLabel: (provided) => ({
              ...provided,
              color: theme === 'light' ? '#333333' : '#f5f5f5',
              backgroundColor: theme === 'light' ? '#f5f5f5' : '#555555',
            }),
            multiValueRemove: (provided) => ({
              ...provided,
              color: theme === 'light' ? '#333333' : '#f5f5f5',
              backgroundColor: theme === 'light' ? '#f5f5f5' : '#555555',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused
                ? theme === 'light'
                  ? '#eaeaea'
                  : '#444444'
                : theme === 'light'
                  ? '#fff'
                  : '#333333',
              color: theme === 'light' ? '#333333' : '#f5f5f5',
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: '0.375rem',
              backgroundColor: theme === 'light' ? '#fff' : '#333333',
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
          uploadImages={handleImageUpload}
          key="editor"
          onChange={handleContentChange}
          placeholder="Escreva algo..."
          value={content}
        />
        <button
          type="submit"
          className="bg-[#333333] dark:bg-[#f5f5f5] text-white dark:text-[#333333] rounded px-4 py-2 w-full sm:w-auto"
        >
          {loading ? (
            <ClipLoader
              color={theme === 'light' ? '#fff' : '#333333'}
              loading={loading}
              size={25}
            />
          ) : (
            'Atualizar post'
          )}
        </button>
      </form>
    </>
  )
}
