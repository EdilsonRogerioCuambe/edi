import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import prisma from '@/db/prisma'

export const metadata: Metadata = {
  title: {
    template: '%s | Codando & Inovando',
    default: 'Edilson | Codando & Inovando',
  },
  description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  creator: 'Edilson Rogério Cuambe',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://edilson.site',
    siteName: 'Edilson | Codando & Inovando',
    title: 'Edilson | Codando & Inovando',
    description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  },
  verification: {
    other: {
      'msvalidate.01': '47154EC18AD3A9B201850033086355EA',
      'google-site-verification': '-BOO4u6icrUaS5mTJ7ovWgjnLmQ1GyrJKzmB7g_1TAk',
    },
  },
}

export default async function Page() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="pt-20 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative h-[200px]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="rounded-t-lg w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <Link
                href={`/project/${project.slug}`}
                className="text-xl font-semibold hover:underline"
              >
                <h3 className="text-lg font-semibold">{project.title}</h3>
              </Link>
              <div className="flex justify-between items-center mt-4">
                {project.github && (
                  <Link
                    href={project.github}
                    className="text-blue-400 hover:underline"
                  >
                    <Github size={24} />
                  </Link>
                )}
                {project.languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-sm text-gray-600 border-2 px-2 py-1 rounded-lg border-gray-600"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
