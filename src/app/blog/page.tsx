'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'
import image5 from '@/assets/images/image5.jpg'
import image6 from '@/assets/images/image6.jpg'

const newsData = [
  {
    id: 1,
    title: 'TypeScript Supera JavaScript em Popularidade entre Desenvolvedores',
    imageUrl: image1,
    description:
      'Uma pesquisa recente mostra que o TypeScript agora é mais popular que o JavaScript entre desenvolvedores que trabalham em grandes projetos devido à sua robustez em tipos.',
    category: 'Linguagens de Programação',
    tags: ['TypeScript', 'JavaScript', 'Desenvolvimento Web'],
    publishedAt: '2024-02-15T10:00:00.000Z',
  },
  {
    id: 2,
    title: 'React 18 é Anunciado com Recursos de Suspense e Transições',
    imageUrl: image2,
    description:
      'O React 18 foi anunciado oficialmente com recursos de suspense e transições que prometem melhorar a experiência do usuário em aplicações web.',
    category: 'React',
    tags: ['React', 'JavaScript', 'Desenvolvimento Web'],
    publishedAt: '2024-02-14T10:00:00.000Z',
  },
  {
    id: 3,
    title: 'Next.js 12 é Lançado com Suporte a Middleware e API Routes',
    imageUrl: image3,
    description:
      'O Next.js 12 foi lançado com suporte a middleware e API routes, permitindo que desenvolvedores criem APIs RESTful de forma mais fácil e rápida.',
    category: 'Next.js',
    tags: ['Next.js', 'React', 'JavaScript', 'Desenvolvimento Web'],
    publishedAt: '2024-02-13T10:00:00.000Z',
  },
  {
    id: 4,
    title: 'Vue.js 4 é Anunciado com Suporte a Suspense e Transições',
    imageUrl: image4,
    description:
      'O Vue.js 4 foi anunciado oficialmente com suporte a suspense e transições que prometem melhorar a experiência do usuário em aplicações web.',
    category: 'Vue.js',
    tags: ['Vue.js', 'JavaScript', 'Desenvolvimento Web'],
    publishedAt: '2024-02-12T10:00:00.000Z',
  },
  {
    id: 5,
    title: 'Angular 13 é Lançado com Suporte a Middleware e API Routes',
    imageUrl: image5,
    description:
      'O Angular 13 foi lançado com suporte a middleware e API routes, permitindo que desenvolvedores criem APIs RESTful de forma mais fácil e rápida.',
    category: 'Angular',
    tags: ['Angular', 'JavaScript', 'Desenvolvimento Web'],
    publishedAt: '2024-02-11T10:00:00.000Z',
  },
  {
    id: 6,
    title: 'Svelte 3 é Anunciado com Suporte a Suspense e Transições',
    imageUrl: image6,
    description:
      'O Svelte 3 foi anunciado oficialmente com suporte a suspense e transições que prometem melhorar a experiência do usuário em aplicações web.',
    category: 'Svelte',
    tags: ['Svelte', 'JavaScript', 'Desenvolvimento Web'],
    publishedAt: '2024-02-10T10:00:00.000Z',
  },
]

export default function Page() {
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(4)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = newsData.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  return (
    <main className="pt-20">
      <div className="max-w-5xl mx-auto px-4">
        {currentPosts.map((news) => (
          <div
            key={news.id}
            className="flex flex-col md:flex-row items-center md:space-x-4 my-4"
          >
            <div className="md:w-1/3 w-full">
              <Image
                src={news.imageUrl}
                alt={news.title}
                width={400}
                height={300}
                className="rounded-lg w-full object-cover"
              />
            </div>
            <div className="md:w-2/3 w-full mt-4 md:mt-0">
              <p className="text-sm text-[#333333]">
                {news.category} •{' '}
                {new Date(news.publishedAt).toLocaleDateString()}
              </p>
              <Link
                href={`/blog/${news.id}`}
                className="hover:underline transition-all duration-300 ease-in-out"
              >
                <h3 className="text-xl font-bold mb-2">{news.title}</h3>
              </Link>
              <p className="mb-4">{news.description}</p>
              <div className="flex flex-wrap items-center gap-2">
                {news.tags.map((tag) => (
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
              length: Math.ceil(newsData.length / postsPerPage),
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
    </main>
  )
}
