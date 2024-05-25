import Markdown from '@/components/markdown'
import type { Metadata } from 'next'
import prisma from '@/db/prisma'

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
    other: {
      'msvalidate.01': '47154EC18AD3A9B201850033086355EA',
      'google-site-verification': '-BOO4u6icrUaS5mTJ7ovWgjnLmQ1GyrJKzmB7g_1TAk',
    },
  },
}

export default async function Page() {
  const author = await prisma.user.findUnique({
    where: {
      email: process.env.NEXT_PUBLIC_EMAIL,
    },
  })

  return (
    <>
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-[#333333]">{author?.name}</h3>
          <div className="mt-8">
            <Markdown content={author?.description as string} />
          </div>
        </div>
      </main>
    </>
  )
}
