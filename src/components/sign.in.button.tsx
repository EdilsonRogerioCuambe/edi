'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useSession, signOut, signIn } from 'next-auth/react'
import { Github } from 'lucide-react'
import Link from 'next/link'
import axios from 'axios'
import { User } from '@prisma/client'

export default function SignInButton() {
  const { data: session } = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  const getUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`/api/me?email=${session?.user?.email}`)
      setUser(data)
    } catch (error) {
      console.error(error)
    }
  }, [session?.user?.email])

  useEffect(() => {
    if (session?.user?.email) {
      getUser()
    }
  }, [getUser, session?.user?.email])

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <div className="relative">
      {session && session.user ? (
        <div className="flex gap-4 ml-auto items-center">
          {session.user.image && session.user.name && (
            <div className="relative">
              <Image
                alt={session.user.name}
                className="rounded-full cursor-pointer"
                height={32}
                src={session.user.image}
                width={32}
                onClick={handleDropdownToggle}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-[#333333] border rounded-md shadow-lg">
                  <div className="py-2">
                    <p className="px-4 py-2 text-sm text-[#f5f5f5]">
                      {user?.name}
                    </p>
                    {user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-[#f5f5f5] hover:bg-[#444444]"
                        onClick={handleDropdownToggle}
                      >
                        Admin
                      </Link>
                    )}
                    <button
                      type="button"
                      className="block w-full text-left px-4 py-2 text-[#f5f5f5] hover:bg-[#444444]"
                      onClick={() => {
                        signOut()
                        handleDropdownToggle()
                      }}
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <button
          title="Sign in with GitHub"
          type="button"
          className="bg-[#333333] text-white px-4 py-2 rounded-md flex gap-2 items-center"
          onClick={() => signIn('github')}
        >
          <Github size={24} />
          Sign in
        </button>
      )}
    </div>
  )
}
