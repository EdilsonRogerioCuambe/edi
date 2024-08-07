'use client'
import { Post } from '@prisma/client'
import {
  Image as LucidImageIcon,
  ArrowUpDown,
  Pencil,
  Trash,
} from 'lucide-react'
import Image from 'next/image'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'

export const blogColumns: ColumnDef<Post>[] = [
  {
    accessorKey: 'image',
    header: 'Imagem',
    cell: ({ row }) => {
      const { image, title } = row.original

      return (
        <div className="flex items-center space-x-2">
          <div className="relative">
            {image ? (
              <Image
                src={image}
                alt={title}
                width={40}
                height={40}
                className="rounded-md"
              />
            ) : (
              <LucidImageIcon className="w-10 h-10 rounded-md text-[#333333] dark:text-[#f5f5f5]" />
            )}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-[#333333] dark:text-[#f5f5f5]"
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => (
      <span className="text-[#333333] dark:text-[#f5f5f5]">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="text-[#333333] dark:text-[#f5f5f5]"
        >
          Publicado em
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { createdAt } = row.original

      return (
        <span className="text-[#333333] dark:text-[#f5f5f5]">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      )
    },
  },
  {
    accessorKey: 'published',
    header: 'Status',
    cell: ({ row }) => {
      const { published } = row.original

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            published ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}
        >
          {published ? 'Publicado' : 'Rascunho'}
        </span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row }) => {
      const { slug } = row.original

      const handleDelete = async () => {
        try {
          await axios.delete(`/api/admin/blog/${slug}`)
          toast.success('Post deletado com sucesso')
          window.location.reload()
        } catch (error) {
          console.error(error)
          toast.error('Erro ao deletar post')
        }
      }

      return (
        <div className="flex items-center space-x-2">
          <Link href={`/admin/blog/${slug}`}>
            <Pencil className="w-5 h-5 text-[#333333] dark:text-[#f5f5f5]" />
          </Link>
          <Button
            variant="ghost"
            title="Deletar"
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 hover:border-2 hover:border-red-400 transition-all duration-300 rounded-full"
          >
            <Trash className="w-5 h-5" />
          </Button>
        </div>
      )
    },
  },
]
