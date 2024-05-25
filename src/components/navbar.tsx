'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, GitPullRequestArrow } from 'lucide-react'
import { usePathname } from 'next/navigation'
import SignInButton from './sign.in.button'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [blur, setBlur] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const handleBlur = () => {
    const offset = window.scrollY
    if (offset > 6) {
      setBlur(true)
    } else {
      setBlur(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleBlur)
    return () => {
      window.removeEventListener('scroll', handleBlur)
    }
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-10 transition-all duration-300 ease-in-out h-20 ${
        blur ? 'bg-white/90 shadow-md backdrop-blur-md' : 'bg-white/90'
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 relative">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl flex items-center uppercase font-semibold font-mono"
            >
              <span className="mr-2">
                <GitPullRequestArrow size={20} />
              </span>
              EDILSON
            </Link>
          </div>
          <div className="md:flex md:space-x-4 md:items-center md:justify-center hidden">
            <Link
              href="/"
              className={`p-2 ${pathname === '/' ? 'border-b-2 border-[#333333]' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`p-2 ${pathname === '/blog' ? 'border-b-2 border-[#333333]' : ''}`}
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className={`p-2 ${pathname === '/projects' ? 'border-b-2 border-[#333333]' : ''}`}
            >
              Projetos
            </Link>
            <Link
              href="/about"
              className={`p-2 ${pathname === '/about' ? 'border-b-2 border-[#333333]' : ''}`}
            >
              Sobre
            </Link>
            <SignInButton />
          </div>
          <div className="md:hidden">
            <button
              type="button"
              title="Menu"
              onClick={() => setOpen(!open)}
              className="p-2"
            >
              <Menu size={24} />
            </button>
          </div>

          <div
            className={cn(
              'fixed inset-0 z-10 bg-white transition-all duration-300 ease-in-out',
              {
                'translate-x-full': !open,
                'translate-x-0': open,
              },
              blur ? 'bg-white' : 'bg-white',
            )}
          >
            <div className="flex justify-between items-center p-4">
              <Link
                href="/"
                className="text-xl flex items-center uppercase font-semibold font-mono"
              >
                <span className="mr-2">
                  <GitPullRequestArrow size={20} />
                </span>
                EDILSON
              </Link>
              <button
                type="button"
                title="Close"
                onClick={() => setOpen(false)}
                className="p-2"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-4 items-center justify-center h-screen bg-white">
              <Link
                href="/"
                className={`p-2 ${pathname === '/' ? 'border-b-2 border-[#333333]' : ''}`}
                onClick={() => setOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/blog"
                className={`p-2 ${pathname === '/blog' ? 'border-b-2 border-[#333333]' : ''}`}
                onClick={() => setOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/projects"
                className={`p-2 ${pathname === '/projects' ? 'border-b-2 border-[#333333]' : ''}`}
                onClick={() => setOpen(false)}
              >
                Projetos
              </Link>
              <Link
                href="/about"
                className={`p-2 ${pathname === '/about' ? 'border-b-2 border-[#333333]' : ''}`}
                onClick={() => setOpen(false)}
              >
                Sobre
              </Link>
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
