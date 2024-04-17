'use client'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { toast } from 'react-hot-toast'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { arta } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { Copy, CheckCheck } from 'lucide-react'

interface MarkdownProps {
  content: string
}

export default function Markdown({ content }: MarkdownProps) {
  const [copied, setCopied] = useState(false)
  return (
    <article className="prose prose-pre:p-0 prose-ol:text-[#333333] prose-ul:text-[#333333] prose-headings:text-[#333333] max-w-none prose-p:text-[#333333]">
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
                    className="absolute top-2 right-2 bg-[#333333] rounded-lg p-2"
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
                  style={arta}
                  PreTag="div"
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
        }}
        className="first-letter:text-4xl"
      >
        {content}
      </ReactMarkdown>
    </article>
  )
}
