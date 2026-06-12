'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Users, Gamepad2, TrendingUp } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ABOUT } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
}

export function About() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!cardsRef.current) return
    gsap.fromTo(
      cardsRef.current.querySelectorAll('[data-card]'),
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: cardsRef })

  return (
    <Section id="about" variant="sky">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
        <div>
          <SectionHeading
            eyebrow={ABOUT.eyebrow}
            h2={ABOUT.h2}
            align="left"
          />
          <p className="text-[--muted] text-lg leading-relaxed">{ABOUT.body}</p>
        </div>

        {/* Photo / illustration */}
        <div className="relative">
          {/* TODO: замените на реальное фото из /public/photos/about.jpg (~800×600) */}
          <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-white to-[--brand-sky] border border-[--border] shadow-lg flex items-center justify-center">
            <div className="text-center text-[--muted] p-8">
              <div className="text-5xl mb-3" aria-hidden="true">🏫</div>
              <p className="text-sm font-medium">Фото: атмосфера класса / студии</p>
              <p className="text-xs mt-1 opacity-60">Рекомендуемый размер: 800×600px</p>
            </div>
          </div>
          {/* Decorative badge */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2" aria-hidden="true">
            <span className="text-2xl">🇬🇧</span>
            <div>
              <p className="text-xs font-semibold text-[--brand-navy]">Sound English</p>
              <p className="text-xs text-[--muted]">Воронеж</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advantage cards */}
      <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ABOUT.advantages.map((adv) => (
          <div
            key={adv.title}
            data-card
            className="bg-white rounded-2xl p-6 border border-[--border] hover:-translate-y-1 transition-transform duration-250"
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            <div className="w-12 h-12 rounded-xl bg-[--brand-sky] flex items-center justify-center text-[--brand-navy] mb-4">
              {iconMap[adv.icon]}
            </div>
            <h3 className="font-semibold text-[--ink] mb-2" style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.1rem' }}>
              {adv.title}
            </h3>
            <p className="text-sm text-[--muted] leading-relaxed">{adv.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}
