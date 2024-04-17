import Image from 'next/image'

import { getProjectBySlug } from '@/db/db'
import Markdown from '@/components/markdown'

export default async function Page({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)
  return (
    <main className="pt-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mt-8">
          <div className="w-full relative h-[300px] md:h-[500px]">
            <Image
              src={project.project.imageUrl.url}
              alt={project.project.name}
              fill
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <h1 className="md:text-3xl text-xl my-3 font-bold text-[#333333]">
            {project.project.name}
          </h1>
          <Markdown content={project.project.content} />
        </div>
      </div>
    </main>
  )
}
