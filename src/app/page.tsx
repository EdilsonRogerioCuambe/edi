import type { Metadata } from 'next'
import Hero from '@/components/hero'
import LatestNews from '@/components/latest.news'
import TechStack from '@/components/tech.stack'

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

export default function Page() {
  return (
    <main>
      <Hero />
      <LatestNews />
      <TechStack />
    </main>
  )
}
