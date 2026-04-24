import Hero from '@/components/Hero'
import PersonaSection from '@/components/PersonaSection'
import Footer from '@/components/Footer'
import { personas } from '@/data/personas'

export default function Page() {
  return (
    <main>
      <Hero />
      {personas.map((persona, i) => (
        <PersonaSection key={persona.id} persona={persona} alt={i % 2 !== 0} />
      ))}
      <Footer />
    </main>
  )
}
