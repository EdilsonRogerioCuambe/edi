import Image from 'next/image'
import prisma from '@/db/prisma'
import Markdown from '@/components/markdown'
import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import { Eye } from 'lucide-react'
import ShareLink from '@/components/share.link'

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
    include: {
      author: {
        select: { name: true, image: true },
      },
    },
  })

  if (!project) {
    redirect('/404')
  }

  await prisma.project.update({
    where: {
      slug: params.slug,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  })

  return (
    <>
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="mt-8">
            <div className="w-full relative h-full rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                layout="responsive"
                width={1200}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between my-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-200">
                  {project.author && project.author.image && (
                    <Image
                      src={project.author.image}
                      alt={project.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="text-[#333333]">
                  <p className="text-md">{project.author?.name}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">
                      {new Date(project.updatedAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm flex items-center gap-x-2">
                      <Eye size={16} />
                      {project.views}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ShareLink
                  url={`https://edilson.site/blog/${project.slug}`}
                  title={project.title}
                  description={project.shortDesc}
                />
              </div>
            </div>
            <Markdown content={project.description} />
          </div>
        </div>
      </main>
    </>
  )
}
