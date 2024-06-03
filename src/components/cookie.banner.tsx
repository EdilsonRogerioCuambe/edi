'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { getLocalStorage, setLocalStorage } from '@/lib/storage.helper'

export default function CookieBanner() {
  const [isCookieAccepted, setIsCookieAccepted] = useState<boolean | null>(null)

  useEffect(() => {
    const cookieAccepted = getLocalStorage('cookie_consent', null)
    setIsCookieAccepted(cookieAccepted)
  }, [])

  useEffect(() => {
    if (isCookieAccepted !== null) {
      const newValue = isCookieAccepted ? 'granted' : 'denied'

      window.gtag('consent', 'update', {
        analytics_storage: newValue,
      })

      setLocalStorage('cookie_consent', isCookieAccepted)

      console.log('Cookie consent updated', isCookieAccepted)
    }
  }, [isCookieAccepted])

  if (isCookieAccepted !== null) {
    return null
  }

  return (
    <div
      className={`my-10 mx-4 md:mx-auto py-4 max-w-max md:max-w-5xl fixed bottom-0 left-0 right-0 flex px-3 md:px-4 justify-between items-center flex-col sm:flex-row gap-4 bg-[#333333] rounded-lg shadow text-[#f5f5f5]`}
    >
      <div className="text-center">
        <Link href="/privacy-policy">
          <p>
            Nos usamos <span className="font-bold text-green-400">cookies</span>{' '}
            em nosso site para melhorar a sua experiência.
          </p>
        </Link>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setIsCookieAccepted(false)}
          title="Negar cookies"
          className="px-5 py-2 text-[#f5f5f5] rounded-md border-2"
        >
          Negar
        </button>
        <button
          type="button"
          onClick={() => setIsCookieAccepted(true)}
          title="Aceitar cookies"
          className="px-5 py-2 text-[#f5f5f5] rounded-md border-2"
        >
          Aceitar cookies 🍪
        </button>
      </div>
    </div>
  )
}
