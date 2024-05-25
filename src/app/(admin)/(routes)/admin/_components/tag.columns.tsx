'use client'
import { Tag } from '@prisma/client'
import { ArrowUpDown, Pencil, Trash } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import axios from 'axios'
import toast from 'react-hot-toast'

import { cn } from '@/lib/utils'

export const tagColumns: ColumnDef<Tag>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Título
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
          className={cn(
            'px-2 py-1 rounded-full text-xs',
            published ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
          )}
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
      const { id } = row.original

      const handleDelete = async () => {
        try {
          await axios.delete(`/api/admin/tag/${id}`)
          toast.success('Tag deletada com sucesso')
          window.location.reload()
        } catch (error) {
          console.error(error)
          toast.error('Erro ao deletar tag')
        }
      }

      return (
        <div className="flex items-center space-x-2">
          <Link href={`/admin/tag/${id}`}>
            <Button
              variant="ghost"
              title="Editar"
              onClick={() => console.log('Edit', id)}
            >
              <Pencil className="w-5 h-5" />
            </Button>
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
