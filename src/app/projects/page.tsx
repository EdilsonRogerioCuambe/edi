import { getAllProjects } from '@/db/db'
import { Github } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page() {
  const projects = await getAllProjects()

  return (
    <main className="pt-20 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {projects.projects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-lg shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="relative h-[200px]">
              <Image
                src={project.imageUrl.url}
                alt={project.name}
                fill
                className="rounded-t-lg w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <Link
                href={`/project/${project.slug}`}
                className="text-xl font-semibold hover:underline"
              >
                <h3 className="text-lg font-semibold">{project.name}</h3>
              </Link>
              <p className="text-gray-600">{project.description}</p>
              <div className="flex justify-between items-center mt-4">
                {project.link && (
                  <Link
                    href={project.link}
                    className="text-blue-400 hover:underline"
                  >
                    <Github size={24} />
                  </Link>
                )}
                {project.langs.map((lang) => (
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
