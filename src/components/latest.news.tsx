import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/db/prisma'

import { MoveRight } from 'lucide-react'

export default async function LatestNews() {
  const blogs = await prisma.post.findMany({
    orderBy: { published: 'desc' },
    include: {
      tags: true,
      author: {
        select: { name: true },
      },
    },
  })
  return (
    <section className="">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#333333] text-start mb-4">
          Últimas Notícias
        </h2>
        {blogs.map((news) => (
          <div
            key={news.id}
            className="flex flex-col md:flex-row items-center md:space-x-4 my-4"
          >
            <div className="md:w-1/3 w-full">
              {news.image && (
                <Image
                  src={news.image}
                  alt={news.title}
                  width={400}
                  height={300}
                  className="rounded-lg w-full object-cover"
                />
              )}
            </div>
            <div className="md:w-2/3 w-full mt-4 md:mt-0">
              <p className="text-sm text-[#333333]">
                {news.author && news.author.name} -{' '}
                {new Date(news.createdAt).toLocaleDateString()}
              </p>
              <Link
                href={`/blog/${news.slug}`}
                className="text-[#333333] font-bold hover:underline cursor-pointer transition-all ease-in-out duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{news.title}</h3>
              </Link>
              <p className="mb-4">{news.shortDesc}</p>
              <div className="flex flex-wrap items-center gap-2">
                {news.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-sm text-[#333333] border-2 px-2 py-1 rounded-lg border-[#333333]"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center mt-8">
          <Link
            href="/blog"
            className="text-[#333333] font-bold flex items-center cursor-pointer hover:underline transition-all ease-in-out duration-300"
          >
            Ver mais notícias
            <MoveRight
              size={24}
              className="ml-2 hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  )
}
