import type { Metadata } from 'next'
import Markdown from '@/components/markdown'

export const metadata: Metadata = {
  title: {
    template: '%s | Codando & Inovando',
    default: 'Edilson | Codando & Inovando',
  },
  description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  creator: 'Edilson Rogério Cuambe',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://edilson.site',
    siteName: 'Edilson | Codando & Inovando',
    title: 'Edilson | Codando & Inovando',
    description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  },
  verification: {
    google: '-BOO4u6icrUaS5mTJ7ovWgjnLmQ1GyrJKzmB7g_1TAk',
    other: {
      'msvalidate.01': '47154EC18AD3A9B201850033086355EA',
    },
  },
}

const content = `
**Política de Privacidade**

Última atualização: 18 de abril de 2024

Este documento descreve como Edilson Rogério Cuambe coleta, usa e compartilha informações pessoais dos usuários ("você") do nosso site https://edilson.site. Ao acessar ou usar o nosso blog, você concorda com os termos desta política de privacidade.

**1. Informações que Coletamos**

Podemos coletar informações pessoais sobre você de várias maneiras quando você usa nosso blog, incluindo:

- **Informações que você nos fornece diretamente:** Coletamos informações pessoais que você nos fornece, como seu nome, email e qualquer outro contato ou informações pessoais que você escolher fornecer nos comentários, formulários de contato ou inscrições para newsletters.
- **Informações de uso e navegação:** Ao acessar nosso blog, automaticamente coletamos certas informações sobre sua visita, incluindo o seu endereço IP, o navegador que você usa, datas e horários de acesso, páginas visualizadas e as ações realizadas no blog.

**2. Uso das Informações**

Utilizamos suas informações pessoais para:
- Operar, manter e melhorar nosso site;
- Responder aos seus comentários ou perguntas e fornecer atendimento ao usuário;
- Comunicar-nos com você sobre promoções, próximos eventos e outras notícias sobre produtos e serviços oferecidos por nós e nossos parceiros selecionados;
- Enviar informações incluindo confirmações, faturas, avisos técnicos, atualizações, alertas de segurança, e mensagens de suporte e administrativas.

**3. Compartilhamento de Informações**

Nós não compartilhamos suas informações pessoais com terceiros exceto conforme descrito nesta política de privacidade. Podemos compartilhar informações pessoais com:
- Fornecedores, consultores e outros prestadores de serviços que precisam acessar tais informações para realizar trabalhos em nosso nome;
- Para cumprir leis aplicáveis, solicitações legais e processos judiciais, e/ou para proteger e defender nossos direitos e propriedade.

**4. Segurança das Informações**

Tomamos medidas razoáveis para proteger suas informações pessoais contra perda, roubo, uso indevido, acesso não autorizado, divulgação, alteração e destruição. No entanto, nenhum sistema de segurança é impenetrável e não podemos garantir a segurança de nossas bases de dados.

**5. Alterações na Política de Privacidade**

Podemos alterar esta política de privacidade de tempos em tempos. Se fizermos mudanças, alteraremos a data de "última atualização" no topo desta política e, em alguns casos, poderemos fornecer um aviso mais proeminente (incluindo, para certos serviços, notificação por e-mail de alterações da política de privacidade).

**6. Contate-nos**

Se você tiver alguma dúvida sobre esta política de privacidade, entre em contato conosco em: edilson@aluno.unilab.edu.br.

**7. Consentimento**

Ao usar nosso blog, você concorda com a nossa política de privacidade.
`

export default function Page() {
  return (
    <div className="max-w-5xl px-4 mx-auto pt-20 text-[#333333]">
      <Markdown content={content} />
    </div>
  )
}
