import PostForm from '@/components/post.form'
import prisma from '@/db/prisma'

export default async function Page() {
  const tags = await prisma.tag.findMany()
  return (
    <div>
      <PostForm tags={tags} />
    </div>
  )
}
