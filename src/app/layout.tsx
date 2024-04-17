import type { Metadata } from 'next'
import { Source_Code_Pro as SourceCode } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

const code = SourceCode({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Edi | Blog',
  description: 'Tech blog por Edi.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${code.className} bg-[##F5F5F5] text-[#333333]`}>
        <Navbar />
        <Toaster position="top-center" />
        {children}
        <Footer />
      </body>
    </html>
  )
}
