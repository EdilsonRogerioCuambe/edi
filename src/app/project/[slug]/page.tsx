import Image from 'next/image'

import { getProjectBySlug } from '@/db/db'
import Markdown from '@/components/markdown'
import { Metadata, ResolvingMetadata } from 'next'

export const dynamicParams = false

export async function generateMetadata(
  params: { params: { slug: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const project = await getProjectBySlug(params.params.slug)

  if (!project) {
    return {}
  }

  return {
    metadataBase: new URL('https://edilsoncuambe.tech'),
    title: {
      template: '%s | Tecnologia em Foco com Edilson Cuambe',
      default: project.project.name,
    },
    description: project.project.description,
    creator: 'Edilson Rogério Cuambe',
    publisher: 'Edilson Rogério Cuambe',
    keywords: project.project.langs,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `https://edilsoncuambe.site/project/${project.project.slug}`,
      images: project.project.imageUrl.url,
      siteName: 'Edilson | Codando & Inovando',
      title: project.project.name,
      description: project.project.description,
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
    verification: {
      other: {
        'msvalidate.01': '47154EC18AD3A9B201850033086355EA',
        'google-site-verification':
          '-BOO4u6icrUaS5mTJ7ovWgjnLmQ1GyrJKzmB7g_1TAk',
      },
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  return (
    <>
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mt-8">
            <div className="w-full relative h-[300px] md:h-[500px]">
              <Image
                src={project.project.imageUrl.url}
                alt={project.project.name}
                fill
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <h1 className="md:text-3xl text-xl my-3 font-bold text-[#333333]">
              {project.project.name}
            </h1>
            <Markdown content={project.project.content} />
          </div>
        </div>
      </main>
    </>
  )
}
