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

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome muito curto' }).max(255),
})

export default function Page() {
  const router = useRouter()
  const { id } = useParams()
  const [tag, setTag] = useState<Tag | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: tag?.name || '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  useEffect(() => {
    const fetchTag = async () => {
      try {
        const response = await axios.get(`/api/admin/tag/${id}`)
        setTag(response.data)
        form.reset({ name: response.data.name })
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

  return (
    <div className="flex items-center justify-center">
      <div className="border-2 border-[#333333] rounded-lg p-8 w-full max-w-md">
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
                      className="rounded"
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
                className="rounded bg-[#222222] hover:bg-[#333333] hover:text-white transition-all duration-300"
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Salvar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
