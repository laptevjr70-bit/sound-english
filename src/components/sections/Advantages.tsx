'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Calendar, Heart, BookOpen, Shield, MapPin, Sparkles } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ADVANTAGES } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ReactNode> = {
  Calendar: <Calendar className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />,
  BookOpen: <BookOpen className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  MapPin: <MapPin className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
}

export function Advantages() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('[data-adv]'),
      { opacity: 0, y: 28 },
      {
        opacity: 1, y: 0,
        stagger: 0.08,
        duration: 0.55,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: ref })

  return (
    <Section id="advantages" variant="white">
      <SectionHeading
        eyebrow="Почему Sound English"
        h2="То, что важно родителям"
      />
      <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ADVANTAGES.map((adv) => (
          <div
            key={adv.title}
            data-adv
            className="group flex gap-4 p-6 rounded-2xl border border-[--border] bg-white hover:-translate-y-1 transition-all duration-250"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="w-12 h-12 shrink-0 rounded-xl bg-[--brand-sky] flex items-center justify-center text-[--brand-navy] group-hover:bg-[--brand-navy] group-hover:text-white transition-colors duration-250">
              {iconMap[adv.icon]}
            </div>
            <div>
              <h3
                className="font-semibold text-[--ink] mb-1"
                style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.1rem' }}
              >
                {adv.title}
              </h3>
              <p className="text-sm text-[--muted] leading-relaxed">{adv.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
