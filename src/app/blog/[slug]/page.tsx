import Image from 'next/image'
import prisma from '@/db/prisma'
import Markdown from '@/components/markdown'
import { Metadata, ResolvingMetadata } from 'next'
import ShareLink from '@/components/share.link'
import { redirect } from 'next/navigation'
import { Eye } from 'lucide-react'

export const dynamicParams = false

export async function generateMetadata(
  params: { params: { slug: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = params.params
  const blog = await prisma.post.findFirst({
    where: { slug },
    include: {
      tags: true,
      author: {
        select: { name: true },
      },
    },
  })

  if (!blog) {
    return {}
  }

  return {
    metadataBase: new URL('https://edilsoncuambe.tech'),
    title: {
      template: '%s | Tecnologia em Foco com Edilson Cuambe',
      default: blog.title,
    },
    description: blog.shortDesc,
    creator: blog.author?.name || 'Edilson Cuambe',
    publisher: blog.author?.name,
    category: blog.tags.map((tag) => tag.name).join(',') || 'Tecnologia',
    keywords: blog.tags.map((tag) => tag.name).join(',') || 'Tecnologia',
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `https://edilsoncuambe.site/blog/${blog.slug}`,
      images: blog.image ? [{ url: blog.image }] : [],
      siteName: 'Edilson | Codando & Inovando',
      title: blog.title,
      description: blog.shortDesc,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      other: {
        'msvalidate.01': '47154EC18AD3A9B201850033086355EA',
      },
      google: '-BOO4u6icrUaS5mTJ7ovWgjnLmQ1GyrJKzmB7g_1TAk',
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = await prisma.post.findFirst({
    where: { slug: params.slug },
    include: {
      tags: true,
      author: {
        select: { name: true, image: true },
      },
    },
  })

  if (!blog) {
    redirect('/404')
  }

  await prisma.post.update({
    where: { id: blog.id },
    data: {
      views: {
        increment: 1,
      },
    },
  })

  return (
    <>
      <main className="pt-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mt-8">
            <div className="w-full relative h-full rounded-lg overflow-hidden">
              {blog.image && (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  layout="responsive"
                  width={1200}
                  height={600}
                />
              )}
            </div>
            <div className="flex items-center justify-between my-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-200 dark:bg-zinc-800">
                  {blog.author && blog.author.image && (
                    <Image
                      src={blog.author.image}
                      alt={blog.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="text-[#333333] dark:text-[#f5f5f5]">
                  <p className="text-md">{blog.author?.name}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm">
                      {new Date(blog.updatedAt).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="text-sm flex items-center gap-x-2">
                      <Eye size={16} />
                      {blog.views}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <ShareLink
                  url={`https://edilson.site/blog/${blog.slug}`}
                  title={blog.title}
                  description={blog.shortDesc}
                />
              </div>
            </div>
            <Markdown content={blog.content} />
          </div>
        </div>
      </main>
    </>
  )
}
