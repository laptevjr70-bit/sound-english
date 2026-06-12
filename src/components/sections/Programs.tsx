'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/button'
import { PROGRAMS } from '@/lib/content'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

export function Programs() {
  const ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useGSAP(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('[data-prog]'),
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        stagger: 0.15,
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
    <Section id="programs" variant="sky">
      <SectionHeading
        eyebrow="Программы"
        h2="Выберите формат под возраст ребёнка"
      />
      <div ref={ref} className="grid md:grid-cols-3 gap-6 mb-10">
        {PROGRAMS.map((prog) => (
          <div
            key={prog.title}
            data-prog
            className={cn(
              'relative flex flex-col bg-white rounded-2xl border overflow-hidden',
              prog.hit ? 'border-[var(--brand-navy)] ring-2 ring-[var(--brand-navy)]' : 'border-[var(--border)]'
            )}
            style={{ boxShadow: 'var(--shadow-card)' }}
          >
            {/* Top color strip */}
            <div className={cn('h-1', {
              'bg-[var(--brand-lime)]': prog.badgeColor === 'lime',
              'bg-[var(--brand-navy)]': prog.badgeColor === 'navy',
              'bg-[var(--brand-blue)]': prog.badgeColor === 'blue',
            })} />

            {prog.hit && (
              <div className="absolute top-3 right-3 bg-[var(--brand-navy)] text-white text-xs font-semibold rounded-full px-3 py-1">
                Хит
              </div>
            )}

            <div className="p-6 md:p-8 flex flex-col flex-1">
              <div className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold w-fit mb-4', {
                'bg-[var(--brand-lime)]/20 text-green-800': prog.badgeColor === 'lime',
                'bg-[var(--brand-navy)]/10 text-[var(--brand-navy)]': prog.badgeColor === 'navy',
                'bg-[var(--brand-blue)]/10 text-[var(--brand-blue)]': prog.badgeColor === 'blue',
              })}>
                {prog.badge}
              </div>

              <h3 className="mb-3 text-[var(--ink)]" style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.25rem', fontWeight: 600 }}>
                {prog.title}
              </h3>
              <p className="text-[var(--muted)] text-sm leading-relaxed mb-6">{prog.desc}</p>

              <ul className="space-y-2 mb-8 flex-1">
                {prog.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-sm text-[var(--ink)]">
                    <Check className="w-4 h-4 text-[var(--brand-navy)] shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>

              <Button
                className={cn('w-full', prog.hit
                  ? 'bg-[var(--brand-navy)] hover:bg-[var(--brand-blue)] text-white'
                  : 'bg-white border-2 border-[var(--brand-navy)] text-[var(--brand-navy)] hover:bg-[var(--brand-sky)]'
                )}
                onClick={scrollToContact}
              >
                Записаться
              </Button>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-[var(--muted)] text-base">
        Не знаете, что выбрать?{' '}
        <button
          onClick={scrollToContact}
          className="text-[var(--brand-navy)] font-semibold underline underline-offset-4 hover:opacity-75 transition-opacity"
        >
          Напишите нам — поможем определить уровень и подобрать формат.
        </button>
      </p>
    </Section>
  )
}
