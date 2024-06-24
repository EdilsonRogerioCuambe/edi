import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import notFound from '@/assets/images/404.png'

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

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-20">
      <h1 className="text-4xl font-bold text-center">Página não encontrada</h1>
      <div className="justify-center items-center mt-4">
        <Image
          src={notFound}
          alt="Page Not Found"
          width={400}
          height={400}
          className="mx-auto"
        />
      </div>
      <div className="text-center mt-4">
        <Link href="/" className="text-[#333333]">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
