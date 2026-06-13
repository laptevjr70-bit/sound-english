import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import {
  MarqueeSection,
  Stats,
  About,
  Advantages,
  Programs,
  Process,
  Summer,
  Testimonials,
  Faq,
  Contact,
} from '@/components/layout/DynamicSections'

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
