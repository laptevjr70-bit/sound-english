'use client'
import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'motion/react'
import { useLenis } from 'lenis/react'
import { Sun, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Mascot } from '@/components/shared/Mascot'
import { SUMMER } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

const ACTIVITY_CARDS = [
  {
    label: 'Опыты',
    emoji: '🔬',
    color: 'from-purple-500/30 to-purple-700/40',
    hoverBorder: 'border-purple-400/60',
    description: 'Химия, физика и биология в действии. Дети проводят настоящие эксперименты: вулканы, кристаллы, оптические иллюзии.',
  },
  {
    label: 'Кулинария',
    emoji: '🍳',
    color: 'from-orange-500/30 to-orange-700/40',
    hoverBorder: 'border-orange-400/60',
    description: 'Готовим блюда из разных стран. Пицца, суши, десерты — всё по рецептам на английском, с разбором слов.',
  },
  {
    label: 'Прогулки',
    emoji: '🌳',
    color: 'from-green-500/30 to-green-700/40',
    hoverBorder: 'border-green-400/60',
    description: 'Парки, музеи, кинотеатры и кафе города. Каждый выход — маленькое приключение с заданиями на английском.',
  },
  {
    label: 'Английский',
    emoji: '📚',
    color: 'from-blue-500/30 to-blue-700/40',
    hoverBorder: 'border-blue-400/60',
    description: 'Живые диалоги, игры, песни и фильмы. Язык погружается естественно — дети говорят, не замечая, что учатся.',
  },
]

export function Summer() {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('[data-reveal]'),
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
      }
    )
  }, { scope: ref })

  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el && lenis) lenis.scrollTo(el, { offset: -80 })
  }

  return (
    <section
      id="summer"
      className="py-20 md:py-28 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, var(--brand-navy) 0%, #1a4fa8 100%)' }}
      aria-label="Летняя программа НЕЛАГЕРЬ"
    >
      {/* Blobs */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="blob absolute top-[-20%] right-[-10%] w-[500px] h-[500px] opacity-15" style={{ background: 'var(--brand-blue)' }} />
        <div className="blob absolute bottom-[-10%] left-[-5%] w-[350px] h-[350px] opacity-10" style={{ background: '#ffffff' }} />
      </div>

      <div ref={ref} className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div data-reveal className="inline-flex items-center gap-2 bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-[0.08em] rounded-full px-4 py-2 mb-6">
              <Sun className="w-3.5 h-3.5" />
              {SUMMER.eyebrow}
            </div>

            <p data-reveal className="text-white text-xl font-semibold mb-3" style={{ fontFamily: 'var(--font-fredoka)' }}>
              {SUMMER.slogan}
            </p>

            <h2
              data-reveal
              className="text-white mb-4"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                fontWeight: 700,
                fontFamily: 'var(--font-fredoka)',
                lineHeight: 1.1,
              }}
            >
              {SUMMER.h2}
            </h2>

            <p data-reveal className="text-white/85 text-lg mb-8 leading-relaxed">
              {SUMMER.subtitle}
            </p>

            <ul data-reveal className="space-y-3 mb-8">
              {SUMMER.activities.map((act) => (
                <li key={act} className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-base">{act}</span>
                </li>
              ))}
            </ul>

            <div data-reveal className="bg-white/10 rounded-2xl p-4 mb-8 border border-white/20">
              <p className="text-white/85 text-sm">{SUMMER.address}</p>
            </div>

            <div data-reveal>
              <Button
                className="bg-[var(--brand-red)] hover:bg-red-700 text-white font-bold shadow-lg"
                size="lg"
                onClick={scrollToContact}
              >
                {SUMMER.cta}
              </Button>
            </div>
          </div>

          {/* Activity cards with hover expand */}
          <div className="flex flex-col gap-6 items-center" data-reveal>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              {ACTIVITY_CARDS.map((card, i) => {
                const isHovered = hoveredIndex === i
                const isOther = hoveredIndex !== null && !isHovered
                return (
                  <motion.div
                    key={card.label}
                    animate={{
                      scale: isHovered ? 1.05 : isOther ? 0.95 : 1,
                      x: isOther
                        ? (i % 2 === 0 ? -6 : 6)
                        : 0,
                      opacity: isOther ? 0.7 : 1,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    onHoverStart={() => setHoveredIndex(i)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    className={`aspect-square rounded-2xl border bg-gradient-to-br ${card.color} flex flex-col items-center justify-start overflow-hidden cursor-default ${isHovered ? card.hoverBorder : 'border-white/20'}`}
                    style={{ boxShadow: isHovered ? '0 8px 32px rgba(0,0,0,0.35)' : undefined }}
                  >
                    <div className="flex flex-col items-center justify-center flex-1 px-2 py-4">
                      <div className="text-3xl mb-2" aria-hidden="true">{card.emoji}</div>
                      <p className="text-white font-semibold text-sm">{card.label}</p>
                    </div>
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeOut' }}
                          className="overflow-hidden w-full"
                        >
                          <p className="text-white/90 text-xs leading-snug px-3 pb-3 text-center">
                            {card.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
            <div className="relative">
              <Mascot size={200} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
