import type { Metadata } from 'next'
import Blogs from '@/components/blogs'
import prisma from '@/db/prisma'

export const metadata: Metadata = {
  title: {
    template: '%s | Codando & Inovando',
    default: 'Edilson | Codando & Inovando',
  },
  description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  creator: 'Edilson Rogério Cuambe',
  robots: { index: true, follow: true },
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
    },
    google: '-BOO4u6icrUaS5mTJ7ovWgjnLmQ1GyrJKzmB7g_1TAk',
  },
}

export default async function Page() {
  const blogs = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      tags: true,
      author: true,
    },
  })

  return (
    <>
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4">
          <Blogs blogs={blogs} />
        </div>
      </main>
    </>
  )
}
