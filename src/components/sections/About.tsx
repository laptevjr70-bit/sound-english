'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MessageCircle, Users, Gamepad2, TrendingUp, ChevronDown } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Photo } from '@/components/shared/Photo'
import { ABOUT } from '@/lib/content'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ReactNode> = {
  MessageCircle: <MessageCircle className="w-6 h-6" />,
  Users: <Users className="w-6 h-6" />,
  Gamepad2: <Gamepad2 className="w-6 h-6" />,
  TrendingUp: <TrendingUp className="w-6 h-6" />,
}

export function About() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

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
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', once: true },
      }
    )
  }, { scope: cardsRef })

  return (
    <Section id="about" variant="sky">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-14 md:mb-16">
        <div>
          <SectionHeading eyebrow={ABOUT.eyebrow} h2={ABOUT.h2} align="left" />
          <p className="text-[var(--muted)] text-lg leading-relaxed">{ABOUT.body}</p>
        </div>

        {/* Реальное фото: ученики за столом */}
        <div className="relative">
          <Photo
            src="/photos/about.jpg"
            alt="Ученики Sound English за работой на занятии"
            aspect="aspect-[4/3]"
            sizes="(max-width: 1024px) 90vw, 45vw"
          />
          {/* Decorative badge */}
          <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-center gap-2" aria-hidden="true">
            <span className="text-2xl">🇬🇧</span>
            <div>
              <p className="text-xs font-semibold text-[var(--brand-navy)]">Sound English</p>
              <p className="text-xs text-[var(--muted)]">Воронеж</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advantage cards — кликабельные, раскрываются */}
      <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {ABOUT.advantages.map((adv, i) => {
          const isOpen = openIndex === i
          return (
            <motion.button
              key={adv.title}
              data-card
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22 }}
              className={cn(
                'text-left bg-white rounded-2xl p-6 border w-full cursor-pointer transition-colors duration-200',
                isOpen
                  ? 'border-[var(--brand-navy)] ring-2 ring-[var(--brand-navy)]/30'
                  : 'border-[var(--border)] hover:border-[var(--brand-blue)] hover:bg-[var(--brand-sky)]/50'
              )}
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-start justify-between gap-2 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--brand-sky)] flex items-center justify-center text-[var(--brand-navy)] shrink-0">
                  {iconMap[adv.icon]}
                </div>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-[var(--muted)] shrink-0 transition-transform duration-300 mt-1',
                    isOpen && 'rotate-180'
                  )}
                  aria-hidden="true"
                />
              </div>
              <h3
                className="font-semibold text-[var(--ink)] mb-2"
                style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.1rem' }}
              >
                {adv.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">{adv.body}</p>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-[var(--ink)] leading-relaxed mt-4 pt-4 border-t border-[var(--border)]">
                      {adv.detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )
        })}
      </div>
    </Section>
  )
}
