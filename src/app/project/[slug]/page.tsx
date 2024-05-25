import Image from 'next/image'
import prisma from '@/db/prisma'
import Markdown from '@/components/markdown'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'

export const dynamicParams = false

export async function generateMetadata(
  params: { params: { slug: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params.params
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
  })

  if (!project) {
    return {}
  }

  return {
    metadataBase: new URL('https://edilsoncuambe.tech'),
    title: {
      template: '%s | Tecnologia em Foco com Edilson Cuambe',
      default: project.title,
    },
    description: project.description,
    creator: 'Edilson Rogério Cuambe',
    publisher: 'Edilson Rogério Cuambe',
    keywords: project.languages,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `https://edilsoncuambe.site/project/${project.slug}`,
      images: project.image,
      siteName: 'Edilson | Codando & Inovando',
      title: project.title,
      description: project.description,
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
  const project = await prisma.project.findUnique({
    where: {
      slug: params.slug,
    },
  })

  if (!project) {
    redirect('/404')
  }

  return (
    <>
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mt-8">
            <div className="w-full relative h-[300px] md:h-[500px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <h1 className="md:text-3xl text-xl my-3 font-bold text-[#333333]">
              {project.title}
            </h1>
            <Markdown content={project.description} />
          </div>
        </div>
      </main>
    </>
  )
}
