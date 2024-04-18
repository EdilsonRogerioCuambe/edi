import Image from 'next/image'
import { getBlogBySlug } from '@/db/db'
import Markdown from '@/components/markdown'
import { NextSeo } from 'next-seo'

export const dynamicParams = false

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)

  return (
    <>
      <NextSeo
        title={blog.blog.title}
        description={blog.blog.description}
        openGraph={{
          title: blog.blog.title,
          description: blog.blog.description,
          images: [
            {
              url: blog.blog.imageUrl.url,
              width: 1200,
              height: 600,
              alt: blog.blog.title,
            },
          ],
        }}
      />
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
