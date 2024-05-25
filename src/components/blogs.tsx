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
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
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
          className="flex flex-col md:flex-row items-center md:space-x-4 my-4"
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
          <div className="md:w-2/3 w-full mt-4 md:mt-0">
            <p className="text-sm text-[#333333]">
              {blog.author && blog.author.name} -{' '}
              {new Date(blog.updatedAt).toLocaleDateString()}
            </p>
            <Link
              href={`/blog/${blog.slug}`}
              className="hover:underline transition-all duration-300 ease-in-out"
            >
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
            </Link>
            <p className="mb-4">{blog.shortDesc}</p>
            <div className="flex flex-wrap items-center gap-2">
              {blog.tags.map((tag) => (
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
        <ul className="flex gap-2">
          {Array.from({
            length: Math.ceil(blogs.length / postsPerPage),
          }).map((_, index) => (
            <li key={index}>
              <button
                type="button"
                title="Ir para a página"
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg border-2 border-[#333333] ${
                  currentPage === index + 1 ? 'bg-[#333333] text-white' : ''
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
