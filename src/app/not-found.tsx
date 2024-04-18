import Link from 'next/link'
import Image from 'next/image'
import notFound from '@/assets/images/404.png'

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
