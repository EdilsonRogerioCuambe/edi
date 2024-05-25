import EditPostForm from '@/components/edit.post.form'
import prisma from '@/db/prisma'
import { redirect } from 'next/navigation'

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params

  const post = await prisma.post.findFirst({
    where: { slug },
    include: {
      tags: true,
    },
  })

  if (!post) {
    redirect('/404')
  }

  return (
    <div>
      <EditPostForm post={post} />
    </div>
  )
}
