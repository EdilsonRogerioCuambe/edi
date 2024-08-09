'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, GitPullRequestArrow, Search, Sun, Moon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import SignInButton from './sign.in.button'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import type { Post } from '@prisma/client'
import { motion } from 'framer-motion'
import { PulseLoader } from 'react-spinners'
import { useTheme } from '@/lib/theme.context'

export default function Navbar() {
  const [blur, setBlur] = useState(false)
  const [open, setOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Post[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

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

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchQuery.trim() === '') return

    setIsLoading(true)
    setIsModalOpen(true)
    try {
      const res = await axios.get(
        `/api/search?query=${encodeURIComponent(searchQuery)}`,
      )
      setSearchResults(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSearchResults([])
  }

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-10 transition-all duration-300 ease-in-out h-20 ${
        blur
          ? 'bg-white/90 shadow-md backdrop-blur-md dark:bg-zinc-800/90'
          : 'bg-white/90 dark:bg-zinc-800/90'
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
          {/* Menu para dispositivos grandes */}
          <div className="md:flex md:space-x-4 md:items-center md:justify-center hidden">
            <Link
              href="/"
              className={`p-2 ${pathname === '/' ? 'border-b-2 border-[#333333] dark:border-[#f5f5f5]' : ''}`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`p-2 ${pathname === '/blog' ? 'border-b-2 border-[#333333] dark:border-[#f5f5f5]' : ''}`}
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className={`p-2 ${pathname === '/projects' ? 'border-b-2 border-[#333333] dark:border-[#f5f5f5]' : ''}`}
            >
              Projetos
            </Link>
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar blogs"
                className="p-2 border rounded w-48"
              />
              <Button
                type="submit"
                className="p-2 ml-2 border-none text-[#333333] dark:text-[#f5f5f5] bg-white dark:bg-zinc-800 rounded transition-all duration-300 ease-in-out hover:bg-[#333333] dark:hover:bg-[#f5f5f5] hover:text-[#f5f5f5] dark:hover:text-[#333333]"
              >
                <Search size={20} />
              </Button>
            </form>
            <button
              onClick={toggleTheme}
              className="p-2 ml-4 border-none text-[#333333] dark:text-[#f5f5f5] bg-white dark:bg-zinc-800 rounded transition-all duration-300 ease-in-out hover:bg-[#333333] dark:hover:bg-[#f5f5f5] hover:text-[#f5f5f5] dark:hover:text-[#333333]"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            <SignInButton />
          </div>
          {/* Botão de abrir menu em dispositivos pequenos */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              title="Menu"
              onClick={() => setOpen(!open)}
              className="p-2"
            >
              {open ? (
                <X size={24} className="text-[#333333] dark:text-[#f5f5f5]" />
              ) : (
                <Menu
                  size={24}
                  className="text-[#333333] dark:text-[#f5f5f5]"
                />
              )}
            </button>
          </div>
        </div>
        {/* Menu dropdown para dispositivos pequenos */}
        {open && (
          <div className="md:hidden flex flex-col space-y-2 mt-2">
            <Link
              href="/"
              className={`p-2 ${pathname === '/' ? 'border-l-4 border-[#333333] dark:border-[#f5f5f5]' : ''}`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`p-2 ${pathname === '/blog' ? 'border-l-4 border-[#333333] dark:border-[#f5f5f5]' : ''}`}
              onClick={() => setOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/projects"
              className={`p-2 ${pathname === '/projects' ? 'border-l-4 border-[#333333] dark:border-[#f5f5f5]' : ''}`}
              onClick={() => setOpen(false)}
            >
              Projetos
            </Link>
            <form onSubmit={handleSearch} className="flex items-center p-2">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Pesquisar blogs"
                className="p-2 border rounded w-full"
              />
              <Button
                type="submit"
                className="p-2 ml-2 border-none text-[#333333] dark:text-[#f5f5f5] bg-white dark:bg-zinc-800 rounded transition-all duration-300 ease-in-out hover:bg-[#333333] dark:hover:bg-[#f5f5f5] hover:text-[#f5f5f5] dark:hover:text-[#333333]"
              >
                <Search size={20} />
              </Button>
            </form>
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 ml-4 border-none text-[#333333] dark:text-[#f5f5f5] bg-white dark:bg-zinc-800 rounded transition-all duration-300 ease-in-out hover:bg-[#333333] dark:hover:bg-[#f5f5f5] hover:text-[#f5f5f5] dark:hover:text-[#333333]"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
            <SignInButton />
          </div>
        )}
      </div>
      {isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed inset-0 z-20 flex items-center justify-center bg-zinc-950 bg-opacity-50"
        >
          <div className="bg-white dark:bg-zinc-800 rounded-lg p-6 w-11/12 md:w-1/2 lg:w-1/3 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Resultados da Pesquisa</h2>
              <Button
                onClick={closeModal}
                className="text-red-500 hover:text-red-600 bg-white dark:bg-zinc-800 hover:bg-red-100 dark:hover:bg-red-900 p-2 rounded-full transition-all duration-300 ease-in-out"
              >
                <X size={24} className="text-red-500" />
              </Button>
            </div>
            {isLoading ? (
              <div className="flex justify-center items-center h-48">
                <PulseLoader size={50} color="#333333" />
              </div>
            ) : searchResults.length > 0 ? (
              <ul>
                {searchResults.map((blog) => (
                  <li
                    key={blog.id}
                    className="my-2 p-2 bg-[#f5f5f5] dark:bg-zinc-700 rounded-lg"
                  >
                    <Link
                      href={`/blog/${blog.slug}`}
                      className="text-[#333333] dark:text-[#f5f5f5] hover:underline"
                      onClick={closeModal}
                    >
                      {blog.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#333333] dark:text-[#f5f5f5]">
                Nenhum resultado encontrado
              </p>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
