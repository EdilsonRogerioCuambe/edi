import Markdown from '@/components/markdown'
import { getAuthorByEmail } from '@/db/db'

export default async function Page() {
  const author = await getAuthorByEmail()

  return (
    <main className="pt-20">
      <div className="max-w-5xl mx-auto px-4">
        <h3 className="text-4xl font-bold text-[#333333]">
          {author?.author?.name}
        </h3>
        <div className="mt-8">
          <Markdown content={author?.author?.description} />
        </div>
      </div>
    </main>
  )
}
