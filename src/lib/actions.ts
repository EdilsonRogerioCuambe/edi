'use server'
import { Resend } from 'resend'
import EmailTemplate from '@/components/email.template'

interface State {
  error: string | null
  success: boolean
}

export const sendEmail = async (prevState: State, formData: FormData) => {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: email,
      to: 'edilson@aluno.unilab.edu.br',
      subject: 'Form Submission',
      react: EmailTemplate({ name, email, message }),
    })
    return {
      error: null,
      success: true,
    }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      }
    }
  }
}
