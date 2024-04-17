import Image from 'next/image'
import { getBlogBySlug } from '@/db/db'
import Markdown from '@/components/markdown'

export default async function Page({ params }: { params: { slug: string } }) {
  const blog = await getBlogBySlug(params.slug)

  return (
    <main className="pt-20">
      <div className="mx-auto max-w-5xl px-4">
        <div className="mt-8">
          <div className="w-full relative h-[300px] md:h-[400px]">
            <Image
              src={blog.blog.imageUrl.url}
              alt={blog.blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <h1 className="md:text-3xl text-xl my-3 font-bold text-[#333333]">
            {blog.blog.title}
          </h1>
          <Markdown content={blog.blog.content} />
        </div>
      </div>
    </main>
  )
}
