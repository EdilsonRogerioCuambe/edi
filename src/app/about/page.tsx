import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { RoughNotation } from 'react-rough-notation'
import { getAuthorByEmail } from '@/db/db'

export default async function Page() {
  const author = await getAuthorByEmail()

  return (
    <main className="pt-20">
      <div className="max-w-5xl mx-auto px-4">
        <RoughNotation type="underline" color="#ff6347">
          <h3 className="text-4xl font-bold text-[#333333]">
            {author?.author?.name}
          </h3>
        </RoughNotation>
        <div className="mt-8">
          <article className="prose prose-invert md:prose-lg text-[#333333] prose-strong:text-[#333333] prose-blockquote:text-[#333333] prose-code:text-[#333333] prose-headings:text-[#333333] prose-h3:text-[#333333] prose-th:text-[#333333] prose-tr:text-[#333333]">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '')

                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={dracula}
                      PreTag="div"
                      language={match[1]}
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {author?.author?.description}
            </Markdown>
          </article>
        </div>
      </div>
    </main>
  )
}
