import prisma from '@/db/prisma'
import { DataBlogTable } from './_components/blog.data.table'
import { blogColumns } from './_components/blog.columns'
import { DataTagTable } from './_components/tag.data.table'
import { tagColumns } from './_components/tag.columns'
import { DataProjectTable } from './_components/project.data.table'
import { projectColumns } from './_components/project.columns'

export default async function Page() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
  })
  const tags = await prisma.tag.findMany({
    orderBy: { name: 'asc' },
  })
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <DataTagTable columns={tagColumns} data={tags} />
      <DataBlogTable columns={blogColumns} data={posts} />
      <DataProjectTable columns={projectColumns} data={projects} />
    </div>
  )
}
