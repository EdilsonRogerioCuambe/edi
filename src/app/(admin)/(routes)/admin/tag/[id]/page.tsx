'use client'

import axios from 'axios'
import { useRouter, useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
  FormItem,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Tag } from '@prisma/client'
import { ClipLoader } from 'react-spinners'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome muito curto' }).max(255),
  published: z.boolean(),
})

export default function Page() {
  const router = useRouter()
  const { id } = useParams()
  const [tag, setTag] = useState<Tag | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tag?.name || '',
      published: tag?.published || false,
    },
  })

  const { isSubmitting, isValid } = form.formState

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await axios.get(`/api/admin/tag/${id}`)
        setTag(response.data)
        form.reset({
          name: response.data.name,
          published: response.data.published,
        })
      } catch (error) {
        console.error(error)
        toast.error('Erro ao carregar tag')
      }
    }
    if (id) {
      fetchTag()
    }
  }, [id, form])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/admin/tag/${id}`, values)
      toast.success('Tag atualizada com sucesso')
      router.push('/admin')
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar tag')
    }
  }

  const handlePublishToggle = async (published: boolean) => {
    try {
      await axios.patch(`/api/admin/tag/${id}`, { published })
      setTag((prev) => (prev ? { ...prev, published } : prev))
      toast.success(
        `Tag ${published ? 'publicada' : 'despublicada'} com sucesso`,
      )
    } catch (error) {
      console.error(error)
      toast.error('Erro ao atualizar o estado da tag')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-2 border-zinc-800 dark:border-[#f5f5f5] rounded-lg p-8 w-full max-w-md bg-white dark:bg-zinc-800 text-zinc-800 dark:text-[#f5f5f5]">
        <div className="flex justify-end mb-4">
          {tag?.published ? (
            <Button
              className="mr-2 bg-yellow-500 text-white hover:bg-yellow-600"
              onClick={() => handlePublishToggle(false)}
            >
              Arquivar
            </Button>
          ) : (
            <Button
              className="mr-2 bg-green-500 text-white hover:bg-green-600"
              onClick={() => handlePublishToggle(true)}
            >
              Publicar
            </Button>
          )}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ex: JavaScript"
                      className="rounded bg-transparent"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.name?.message}
                  </FormMessage>
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2 mt-2">
              <Button
                className="rounded bg-zinc-800 dark:bg-[#f5f5f5] text-white dark:text-zinc-800 hover:bg-zinc-800 dark:hover:bg-[#e0e0e0] transition-all duration-300"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                {isSubmitting ? (
                  <ClipLoader
                    color={isSubmitting ? '#fff' : '#333333'}
                    loading={isSubmitting}
                    size={25}
                  />
                ) : (
                  'Salvar'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
