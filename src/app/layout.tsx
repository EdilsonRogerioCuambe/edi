import type { Metadata } from 'next'
import { Source_Code_Pro as SourceCode } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import GoogleAnalytics from '@/components/google.analytics'

const code = SourceCode({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | Codando & Inovando',
    default: 'Edilson | Codando & Inovando',
  },
  description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  creator: 'Edilson Rogério Cuambe',
  robots: { index: false, follow: false },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://edilson.site',
    siteName: 'Edilson | Codando & Inovando',
    title: 'Edilson | Codando & Inovando',
    description: 'Junte-se a mim na jornada para dominar as habilidades de TI.',
  },
  verification: {
    google: '-BOO4u6icrUaS5mTJ7ovWgjnLmQ1GyrJKzmB7g_1TAk',
    other: {
      'msvalidate.01': '47154EC18AD3A9B201850033086355EA',
    },
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
    <html lang="pt">
      <GoogleAnalytics GOOGLE_MEASUREMENT_ID={GOOGLE_ANALYTICS} />
      <body className={`${code.className} bg-[##F5F5F5] text-[#333333]`}>
        <Navbar />
        <Toaster position="top-center" />
        {children}
        <Footer />
      </body>
    </html>
  )
}
