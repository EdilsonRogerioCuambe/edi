'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ImageUploader from './image.uploader'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Project } from '@prisma/client'
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

interface ProjectFormProps {
  project?: Project
}

export default function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const { data: session } = useSession()
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(
    project?.image || null,
  )
  const [title, setTitle] = useState(project?.title || '')
  const [shortDesc, setShortDesc] = useState(project?.shortDesc || '')
  const [description, setDescription] = useState(project?.description || '')
  const [github, setGithub] = useState(project?.github || '')
  const [demo, setDemo] = useState(project?.demo || '')
  const [languages, setLanguages] = useState<string[]>(project?.languages || [])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [title])

  const handleDescriptionChange = (value: string) => {
    setDescription(value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const projectData = {
        title,
        shortDesc,
        description,
        github,
        demo,
        languages,
        image: uploadedImageUrl,
        email: session?.user?.email,
      }
      if (project) {
        const response = await axios.patch(
          `/api/admin/project/${project.slug}`,
          projectData,
        )
        toast.success('Projeto atualizado com sucesso')
        router.push(`/project/${response.data.slug}`)
      } else {
        const response = await axios.post('/api/admin/projects', projectData)
        router.push(`/project/${response.data.slug}`)
        toast.success('Projeto criado com sucesso')
      }
    } catch (error) {
      console.error(error)
      toast.error(`Erro ao ${project ? 'atualizar' : 'criar'} projeto`)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ImageUploader
        setUploadedImageUrl={setUploadedImageUrl}
        initialImageUrl={uploadedImageUrl}
      />
      <textarea
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={textareaRef}
        className="placeholder:text-6xl h-auto placeholder:font-extrabold font-extrabold placeholder:text-[#333333] text-[#333333] w-full text-6xl rounded my-4 focus:outline-none overflow-hidden resize-none border-none"
      />
      <textarea
        placeholder="Descrição curta"
        value={shortDesc}
        onChange={(e) => setShortDesc(e.target.value)}
        rows={3}
        className="placeholder:text-lg border-2 border-[#333333] font-semibold placeholder:text-[#333333] text-[#333333] w-full text-lg rounded my-4 focus:outline-none overflow-hidden resize-none p-2"
      />
      <input
        placeholder="GitHub URL"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
        className="w-full text-lg rounded my-4 focus:outline-none overflow-hidden resize-none p-2 border-2 border-[#333333] placeholder:font-semibold font-semibold placeholder:text-[#333333] text-[#333333]"
      />
      <input
        placeholder="Demo URL"
        value={demo}
        onChange={(e) => setDemo(e.target.value)}
        className="w-full text-lg rounded my-4 focus:outline-none overflow-hidden resize-none p-2 border-2 border-[#333333] placeholder:font-semibold font-semibold placeholder:text-[#333333] text-[#333333]"
      />
      <input
        placeholder="Linguagens (separadas por vírgula)"
        value={languages.join(', ')}
        onChange={(e) =>
          setLanguages(e.target.value.split(',').map((lang) => lang.trim()))
        }
        className="w-full text-lg rounded my-4 focus:outline-none overflow-hidden resize-none p-2 border-2 border-[#333333] placeholder:font-semibold font-semibold placeholder:text-[#333333] text-[#333333]"
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
        onChange={handleDescriptionChange}
        placeholder="Escreva algo..."
        value={description}
      />
      <button
        type="submit"
        className="bg-[#333333] text-white rounded px-4 py-2"
      >
        {project ? 'Atualizar projeto' : 'Criar projeto'}
      </button>
    </form>
  )
}
