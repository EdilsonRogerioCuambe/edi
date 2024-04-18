'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type AuthorData = {
  id: string
  name: string
  avatar: {
    url: string
  }
  description: string
}

type BlogData = {
  id: string
  title: string
  content: string
  description: string
  slug: string
  imageUrl: {
    url: string
  }
  tags: string[]
  category: string
  author: AuthorData
  updatedAt: string
  publishedAt: string
}

type BlogsProps = {
  blogs: BlogData[]
}

export default function Blogs({ blogs }: BlogsProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(4)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogs.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <div>
      {currentPosts
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
        .map((blogs) => (
          <div
            key={blogs.id}
            className="flex flex-col md:flex-row items-center md:space-x-4 my-4"
          >
            <div className="md:w-1/3 w-full">
              <Image
                src={blogs.imageUrl.url}
                alt={blogs.title}
                width={400}
                height={300}
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="md:w-2/3 w-full mt-4 md:mt-0">
              <p className="text-sm text-[#333333]">
                {blogs.category} •{' '}
                {new Date(blogs.publishedAt).toLocaleDateString()}
              </p>
              <Link
                href={`/blog/${blogs.slug}`}
                className="hover:underline transition-all duration-300 ease-in-out"
              >
                <h3 className="text-xl font-bold mb-2">{blogs.title}</h3>
              </Link>
              <p className="mb-4">{blogs.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                {blogs.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm text-[#333333] border-2 px-2 py-1 rounded-lg border-[#333333]"
                  >
                    {tag}
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
