import prisma from '@/db/prisma'
import { DataBlogTable } from './_components/blog.data.table'
import { blogColumns } from './_components/blog.columns'
import { DataTagTable } from './_components/tag.data.table'
import { tagColumns } from './_components/tag.columns'

export default async function Page() {
  const posts = await prisma.post.findMany()
  const tags = await prisma.tag.findMany()

  return (
    <div>
      <DataTagTable columns={tagColumns} data={tags} />
      <DataBlogTable columns={blogColumns} data={posts} />
    </div>
  )
}
