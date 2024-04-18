import Markdown from '@/components/markdown'
import { getAuthorByEmail } from '@/db/db'
import { Metadata, ResolvingMetadata } from 'next'

export const dynamicParams = false

export async function generateMetadata(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const author = await getAuthorByEmail()

  if (!author) {
    return {}
  }

  return {
    metadataBase: new URL('https://edilsoncuambe.tech'),
    title: {
      template: '%s | Tecnologia em Foco com Edilson Cuambe',
      default: author.author.name,
    },
    description: author.author.description,
    creator: author.author.name,
    publisher: author.author.name,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `https://edilsoncuambe.site/about`,
      images: author.author.avatar.url,
      siteName: 'Edilson | Codando & Inovando',
      title: author.author.name,
      description: author.author.description,
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
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
