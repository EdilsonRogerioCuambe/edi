'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Post, User, Tag } from '@prisma/client'

type BlogsProps = {
  blogs: (Post & {
    tags: Tag[]
    author: User | null
  })[]
}

export default function Blogs({ blogs }: BlogsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(4)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const sortedBlogs = blogs.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = sortedBlogs.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div>
      {currentPosts.map((blog) => (
        <div
          key={blog.id}
          className={`flex flex-col ${
            blog.image ? 'md:flex-row' : 'md:flex-col'
          } items-center md:space-x-4 my-4`}
        >
          <div className="md:w-1/3 w-full">
            {blog.image && (
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={300}
                placeholder="blur"
                blurDataURL={blog.image}
                loading="lazy"
                className="rounded-lg w-full object-cover"
              />
            )}
          </div>
          <div
            className={`${
              blog.image ? 'md:w-2/3' : 'md:w-full'
            } w-full text-start`}
          >
            <p className="text-sm my-1 text-[#333333] dark:text-[#f5f5f5]">
              {blog.author && blog.author.name} -{' '}
              {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
            <Link
              href={`/blog/${blog.slug}`}
              className="hover:underline transition-all duration-300 ease-in-out"
            >
              <h3 className="text-xl font-bold mb-2 text-[#333333] dark:text-[#f5f5f5]">
                {blog.title}
              </h3>
            </Link>
            <p className="mb-4 text-[#333333] dark:text-[#f5f5f5]">
              {blog.shortDesc.slice(0, 175)}...
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {blog.tags.map((tag) => (
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
      <div className="flex justify-center mt-8">
        <ul className="flex gap-2">
          {Array.from({
            length: Math.ceil(blogs.length / postsPerPage),
          }).map((_, index) => (
            <li key={index}>
              <button
                type="button"
                title="Ir para a página"
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg border-2 border-[#333333] dark:border-[#f5f5f5] ${
                  currentPage === index + 1
                    ? 'bg-[#333333] text-white dark:bg-[#f5f5f5] dark:text-[#333333]'
                    : 'text-[#333333] dark:text-[#f5f5f5]'
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
