import Image from 'next/image'
import { getBlogBySlug } from '@/db/db'
import Markdown from '@/components/markdown'
import { Metadata, ResolvingMetadata } from 'next'
import ShareLink from '@/components/share.link'

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
            {/** imagem, nome do autor, data de publicação e botão de compartilhar */}
            <div className="flex items-center justify-between my-4">
              <div className="flex items-center space-x-4">
                <div className="relative w-10 h-10 overflow-hidden rounded-full bg-gray-200">
                  {blog.blog.author.avatar && (
                    <Image
                      src={blog.blog.author.avatar.url}
                      alt={blog.blog.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="text-[#333333]">
                  <p className="text-md">{blog.blog.author.name}</p>
                  <p className="text-sm">
                    {new Date(blog.blog.publishedAt).toLocaleDateString(
                      'pt-BR',
                      {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      },
                    )}
                  </p>
                </div>
              </div>
              <ShareLink
                url={`https://edilsoncuambe.tech/blog/${blog.blog.slug}`}
                title={blog.blog.title}
                description={blog.blog.description}
              />
            </div>
            <Markdown content={blog.blog.content} />
          </div>
        </div>
      </main>
    </>
  )
}
