'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-hot-toast'

import { Button } from '@/components/ui/button'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { sendEmail } from '@/lib/actions'

const formSchema = z.object({
  name: z.string().min(3, {
    message: 'Nome deve ter no mínimo 3 caracteres',
  }),
  email: z.string().email({
    message: 'Email inválido',
  }),
  message: z.string().min(10, {
    message: 'Mensagem deve ter no mínimo 10 caracteres',
  }),
})

export default function ContactForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const { isValid, isSubmitting, isLoading } = form.formState

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('message', values.message)

    const initialState = {
      error: null,
      success: false,
    }

    sendEmail(initialState, formData)
      .then((state) => {
        if (state?.success) {
          toast.success('Mensagem enviada com sucesso')
          form.reset()
        } else {
          toast.error('Erro ao enviar mensagem')
          console.error(state?.error)
        }
      })
      .catch((error) => {
        console.error(error)
        toast.error('Erro ao enviar mensagem')
      })
  }

  return (
    <div className="py-4">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-start items-center mb-8">
          Entre em contato
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 border-2 border-[#333333] p-8 rounded-lg"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu Nome" {...field} />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.name?.message}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu Email" {...field} />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.email?.message}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mensagem</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Sua Mensagem" {...field} />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.message?.message}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!isValid || isSubmitting || isLoading}
            >
              Enviar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
