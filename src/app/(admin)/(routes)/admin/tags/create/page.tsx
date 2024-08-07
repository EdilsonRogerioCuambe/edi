'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
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
import { ClipLoader } from 'react-spinners'

const formSchema = z.object({
  name: z.string().min(2, { message: 'Nome muito curto' }).max(255),
})

export default function Page() {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  })

  const { isSubmitting, isValid } = form.formState

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post('/api/admin/tags', values)
      toast.success('Tag criada com sucesso')
      router.push('/admin')
    } catch (error) {
      toast.error('Erro ao criar tag')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-2 border-[#333333] dark:border-[#f5f5f5] rounded-lg p-8 w-full max-w-md bg-white dark:bg-zinc-800 text-[#333333] dark:text-[#f5f5f5]">
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
                className="rounded bg-[#222222] dark:bg-[#f5f5f5] text-white dark:text-[#333333] hover:bg-[#333333] dark:hover:bg-[#e0e0e0] transition-all duration-300"
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
