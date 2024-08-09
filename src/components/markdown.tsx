'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { toast } from 'react-hot-toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { agate } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { Copy, CheckCheck } from 'lucide-react'

interface MarkdownProps {
  content: string
}

export default function Markdown({ content }: MarkdownProps) {
  const [copied, setCopied] = useState(false)
  return (
    <article className="prose prose-pre:p-2 prose-pre:bg-[#333333] dark:prose-pre:bg-[#333333] prose-code:bg-[#333333] prose-code:rounded prose-code:p-1 prose-code:text-[#f5f5f5] dark:prose-code:text-[#f5f5f5] prose-ol:text-[#333333] dark:prose-ol:text-[#f5f5f5] prose-ul:text-[#333333] dark:prose-ul:text-[#f5f5f5] prose-strong:text-[#333333] dark:prose-strong:text-[#f5f5f5] prose-strong:font-semibold prose-headings:text-[#333333] dark:prose-headings:text-[#f5f5f5] max-w-none prose-p:text-[#333333] dark:prose-p:text-[#f5f5f5]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          code({ node, inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '')

            return !inline && match ? (
              <div className="relative">
                <CopyToClipboard
                  text={String(children).replace(/\n$/, '')}
                  onCopy={() => {
                    setCopied(true)
                    toast.success('Copiado para a área de transferência', {
                      icon: '📋',
                    })
                    setTimeout(() => {
                      setCopied(false)
                    }, 2000)
                  }}
                >
                  <button
                    type="button"
                    title="Copiar"
                    className="absolute top-0 right-0 bg-[#121214] dark:bg-zinc-800 items-center rounded-lg p-2"
                    aria-label="Copy"
                  >
                    {copied ? (
                      <CheckCheck size={20} className="text-green-400" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                </CopyToClipboard>
                <SyntaxHighlighter
                  PreTag="div"
                  style={agate}
                  showLineNumbers
                  language={match[1]}
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
          img({ node, ...props }: any) {
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                {...props}
                className="w-full h-full object-cover rounded-lg"
                alt={props.alt}
              />
            )
          },
        }}
        className="first-letter:text-4xl"
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
