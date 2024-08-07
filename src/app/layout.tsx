import type { Metadata } from 'next'
import { Fira_Code as FiraCode } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import Script from 'next/script'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import GoogleAnalytics from '@/components/google.analytics'
import CookieBanner from '@/components/cookie.banner'
import Providers from '@/lib/providers'

const firacode = FiraCode({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    template: '%s | Codando & Inovando',
    default: 'Edilson | Codando & Inovando',
  },
  description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  creator: 'Edilson Rogério Cuambe',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://edilson.site',
    siteName: 'Edilson | Codando & Inovando',
    title: 'Edilson | Codando & Inovando',
    description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  },
  verification: {
    other: {
      'msvalidate.01': '47154EC18AD3A9B201850033086355EA',
    },
    google: '-BOO4u6icrUaS5mTJ7ovWgjnLmQ1GyrJKzmB7g_1TAk',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GOOGLE_ANALYTICS = process.env.GOOGLE_MEASUREMENT_ID

  if (!GOOGLE_ANALYTICS) {
    throw new Error('Missing GOOGLE_MEASERUMENT_ID')
  }

  return (
    <Providers>
      <html lang="pt">
        <head>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2130226174964724"
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        </head>
        <body
          className={`${firacode.className} text-[#333333] g-[#f5f5f5] dark:bg-zinc-800 dark:text-[#f5f5f5]`}
        >
          <GoogleAnalytics GOOGLE_MEASUREMENT_ID={GOOGLE_ANALYTICS} />
          <Navbar />
          <Toaster position="top-center" />
          {children}
          <Footer />
          <CookieBanner />
        </body>
      </html>
    </Providers>
  )
}
