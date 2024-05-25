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
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <main className="pt-20 max-w-5xl px-4 mx-auto">
      {projects.map((project) => (
        <div
          key={project.id}
          className="flex flex-col md:flex-row items-center md:space-x-4 my-4"
        >
          <div className="md:w-1/3 w-full">
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                width={400}
                height={300}
                className="rounded-lg w-full object-cover"
              />
            )}
          </div>
          <div className="md:w-2/3 w-full mt-4 md:mt-0">
            <p className="text-sm text-[#333333]">
              {project.author && project.author.name} -{' '}
              {new Date(project.createdAt).toLocaleDateString()}
            </p>
            <Link
              href={`/project/${project.slug}`}
              className="text-[#333333] font-bold hover:underline cursor-pointer transition-all ease-in-out duration-300"
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            </Link>
            <p className="mb-4">{project.shortDesc.slice(0, 175)}...</p>
            <div className="flex flex-wrap items-center gap-2">
              {project.languages.map((tag) => (
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
    </main>
  )
}
