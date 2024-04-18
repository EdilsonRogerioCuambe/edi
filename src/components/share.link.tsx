'use client'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import {
  Facebook,
  Linkedin,
  Twitter,
  Copy,
  CopyCheck,
  Share2,
  CircleX,
} from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'

interface ShareLinkProps {
  url: string
  title: string
  description: string
}

export default function ShareLink({ url, title, description }: ShareLinkProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleCopy = () => {
    setIsCopied(true)
    navigator.clipboard.writeText(url)
    toast.success('Link copiado com sucesso!', {
      icon: <CopyCheck size={24} />,
    })
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  return (
    <>
      <button
        title="Compartilhar"
        type="button"
        className="flex items-center justify-center w-12 h-12 text-[#f5f5f5] bg-[#333333] rounded-lg"
        onClick={handleOpen}
      >
        <Share2 size={24} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#333333] bg-opacity-50">
          <div className="relative w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
            <button
              type="button"
              className="absolute top-2 right-2"
              onClick={handleClose}
              aria-label="Close"
            >
              <CircleX size={24} />
            </button>
            <h2 className="text-lg font-semibold my-2">{title}</h2>
            <p className="text-sm text-gray-600">{description}</p>
            <div className="flex items-center justify-center mt-4 space-x-4">
              <button
                title="Compartilhar via Facebook"
                type="button"
                className="flex items-center justify-center w-12 h-12 bg-[#333333] rounded-lg"
                onClick={() =>
                  window.open(
                    `https://www.facebook.com/sharer/sharer.php?u=${url}`,
                    '_blank',
                  )
                }
              >
                <Facebook size={24} className="text-[#f5f5f5]" />
              </button>
              <button
                title="Compartilhar via LinkedIn"
                type="button"
                className="flex items-center justify-center w-12 h-12 bg-[#333333] rounded-lg"
                onClick={() =>
                  window.open(
                    `https://www.linkedin.com/shareArticle?url=${url}`,
                    '_blank',
                  )
                }
              >
                <Linkedin size={24} className="text-[#f5f5f5]" />
              </button>
              <button
                title="Compartilhar via Twitter"
                type="button"
                className="flex items-center justify-center w-12 h-12 bg-[#333333] rounded-lg"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
                    '_blank',
                  )
                }
              >
                <Twitter size={24} className="text-[#f5f5f5]" />
              </button>
              <button
                title="Compartilhar via WhatsApp"
                type="button"
                className="flex items-center justify-center w-12 h-12 bg-[#333333] rounded-lg"
                onClick={() =>
                  window.open(
                    `https://api.whatsapp.com/send?text=${title}%0A${url}`,
                    '_blank',
                  )
                }
              >
                <FaWhatsapp size={24} className="text-[#f5f5f5]" />
              </button>
              <button
                title="Copiar link"
                type="button"
                className="flex items-center justify-center w-12 h-12 bg-[#333333] rounded-lg"
                onClick={handleCopy}
              >
                {isCopied ? (
                  <CopyCheck size={24} className="text-[#f5f5f5]" />
                ) : (
                  <Copy size={24} className="text-[#f5f5f5]" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
