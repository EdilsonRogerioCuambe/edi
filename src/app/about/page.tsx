import Markdown from '@/components/markdown'
import { getAuthorByEmail } from '@/db/db'
import type { Metadata } from 'next'

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

export default async function Page() {
  const author = await getAuthorByEmail()

  return (
    <>
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-4xl font-bold text-[#333333]">
            {author?.author?.name}
          </h3>
          <div className="mt-8">
            <Markdown content={author?.author?.description} />
          </div>
        </div>
      </main>
    </>
  )
}
