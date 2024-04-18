import type { Metadata } from 'next'
import ContactForm from '@/components/contact.form'
import Hero from '@/components/hero'
import LatestNews from '@/components/latest.news'

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

export default function Page() {
  return (
    <main>
      <Hero />
      <LatestNews />
      <ContactForm />
    </main>
  )
}
