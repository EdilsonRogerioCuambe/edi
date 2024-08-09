import Image from 'next/image'
import Link from 'next/link'
import prisma from '@/db/prisma'

export default async function LatestNews() {
  const blogs = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: {
      tags: true,
      author: {
        select: { name: true },
      },
    },
  })

  return (
    <section>
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-[#333333] dark:text-[#f5f5f5] text-start mb-4">
          Últimas Notícias
        </h2>
        {blogs.slice(0, 4).map((news) => (
          <div
            key={news.id}
            className={`flex flex-col ${
              news.image ? 'md:flex-row' : 'md:flex-col'
            } items-center md:space-x-4 my-4`}
          >
            {news.image && (
              <div className="md:w-1/3 w-full">
                <Image
                  src={news.image}
                  alt={news.title}
                  width={400}
                  height={300}
                  className="rounded-lg w-full object-cover"
                />
              </div>
            )}
            <div
              className={`${
                news.image ? 'md:w-2/3' : 'md:w-full'
              } w-full text-start`}
            >
              <p className="text-sm my-1 text-[#333333] dark:text-[#f5f5f5]">
                {news.author && news.author.name} -{' '}
                {new Date(news.createdAt).toLocaleDateString()}
              </p>
              <Link
                href={`/blog/${news.slug}`}
                className="text-[#333333] dark:text-[#f5f5f5] font-bold hover:underline cursor-pointer transition-all ease-in-out duration-300"
              >
                <h3 className="text-xl font-bold mb-2">{news.title}</h3>
              </Link>
              <p className="mb-4 dark:text-[#f5f5f5]">
                {news.shortDesc.slice(0, 175)}...
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {news.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-sm text-[#333333] dark:text-[#f5f5f5] border-2 px-2 py-1 rounded-lg border-[#333333] dark:border-[#f5f5f5]"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
