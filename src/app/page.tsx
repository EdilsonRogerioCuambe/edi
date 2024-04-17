import ContactForm from '@/components/contact.form'
import Hero from '@/components/hero'
import LatestNews from '@/components/latest.news'

export default function Page() {
  return (
    <main className="pt-20">
      <Hero />
      <LatestNews />
      <ContactForm />
    </main>
  )
}
