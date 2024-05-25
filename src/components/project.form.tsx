'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import ImageUploader from './image.uploader'
import axios from 'axios'
import toast from 'react-hot-toast'
import Editor from './editor'
import { Project } from '@prisma/client'

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
        await axios.put(`/api/admin/projects/${project.id}`, projectData)
        toast.success('Projeto atualizado com sucesso')
      } else {
        await axios.post('/api/admin/projects', projectData)
        toast.success('Projeto criado com sucesso')
      }
      router.push('/admin/projects')
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
        className="placeholder:text-6xl placeholder:font-extrabold font-extrabold placeholder:text-[#333333] text-[#333333] w-full text-6xl rounded my-4 focus:outline-none overflow-hidden resize-none border-none"
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
      <Editor value={description} onChange={handleDescriptionChange} />
      <button
        type="submit"
        className="bg-[#333333] text-white rounded px-4 py-2"
      >
        {project ? 'Atualizar projeto' : 'Criar projeto'}
      </button>
    </form>
  )
}
