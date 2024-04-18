import Image from 'next/image'
import { getBlogBySlug } from '@/db/db'
import Markdown from '@/components/markdown'
import { Metadata, ResolvingMetadata } from 'next'

export const dynamicParams = false

export async function generateMetadata(
  params: { params: { slug: string } },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const blog = await getBlogBySlug(params.params.slug)

  if (!blog) {
    return {}
  }

  return {
    metadataBase: new URL('https://edilsoncuambe.tech'),
    title: {
      template: '%s | Tecnologia em Foco com Edilson Cuambe',
      default: blog.blog.title,
    },
    description: blog.blog.description,
    creator: blog.blog.author.name,
    publisher: blog.blog.author.name,
    category: blog.blog.category,
    keywords: blog.blog.tags,
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: `https://edilsoncuambe.site/blog/${blog.blog.slug}`,
      images: blog.blog.imageUrl.url,
      siteName: 'Edilson | Codando & Inovando',
      title: blog.blog.title,
      description: blog.blog.description,
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

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)

  return (
    <>
      <main className="pt-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mt-8">
            <div className="w-full relative h-full rounded-lg overflow-hidden">
              {blog.blog.imageUrl && (
                <Image
                  src={blog.blog.imageUrl.url}
                  alt={blog.blog.title}
                  layout="responsive"
                  width={1200}
                  height={600}
                />
              )}
            </div>
            <h1 className="md:text-3xl text-2xl my-3 font-bold text-[#333333]">
              {blog.blog.title}
            </h1>
            <Markdown content={blog.blog.content} />
          </div>
        </div>
      </main>
    </>
  )
}
