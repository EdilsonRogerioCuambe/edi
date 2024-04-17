import { Heading, Html, Text } from '@react-email/components'

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export default function EmailTemplate({
  name,
  email,
  message,
}: EmailTemplateProps) {
  return (
    <Html>
      <Heading>Nova Mensagem de {name}</Heading>
      <Text>{email}</Text>
      <Text>{message}</Text>
    </Html>
  )
}
