import Blogs from '@/components/blogs'
import { getAllBlogs } from '@/db/db'

export default async function Page() {
  const blogs = await getAllBlogs()
  return (
    <main className="pt-20">
      <div className="max-w-5xl mx-auto px-4">
        <Blogs blogs={blogs.blogs} />
      </div>
    </main>
  )
}
