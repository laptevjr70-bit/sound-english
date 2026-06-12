import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { MarqueeSection } from '@/components/sections/MarqueeSection'
import { Stats } from '@/components/sections/Stats'
import { About } from '@/components/sections/About'
import { Advantages } from '@/components/sections/Advantages'
import { Programs } from '@/components/sections/Programs'
import { Process } from '@/components/sections/Process'
import { Summer } from '@/components/sections/Summer'
import { Testimonials } from '@/components/sections/Testimonials'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <MarqueeSection />
        <Stats />
        <About />
        <Advantages />
        <Programs />
        <Process />
        <Summer />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
