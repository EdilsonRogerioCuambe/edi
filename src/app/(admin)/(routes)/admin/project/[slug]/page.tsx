import prisma from '@/db/prisma'
import { redirect } from 'next/navigation'
import ProjectForm from '@/components/project.form'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params
  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
  })

  if (!project) {
    return redirect('/404')
  }

  return (
    <div>
      <ProjectForm project={project} />
    </div>
  )
}
