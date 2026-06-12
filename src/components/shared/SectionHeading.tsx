'use client'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

interface SectionHeadingProps {
  eyebrow?: string
  h2: string
  subtitle?: string
  className?: string
  align?: 'left' | 'center'
  light?: boolean
}

export function SectionHeading({ eyebrow, h2, subtitle, className, align = 'center', light = false }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('[data-reveal]')
    gsap.fromTo(els,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          once: true,
        },
      }
    )
  }, { scope: ref })

  return (
    <div ref={ref} className={cn('mb-12 md:mb-16', align === 'center' && 'text-center', className)}>
      {eyebrow && (
        <p
          data-reveal
          className={cn(
            'inline-block text-[0.875rem] uppercase tracking-[0.08em] font-semibold mb-3',
            light ? 'text-white/70' : 'text-[--brand-blue]'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        data-reveal
        className={cn(
          'font-semibold leading-[1.1]',
          light ? 'text-white' : 'text-[--ink]',
        )}
        style={{
          fontSize: 'clamp(2rem, 4vw, 3.25rem)',
          fontFamily: 'var(--font-fredoka)',
        }}
      >
        {h2}
      </h2>
      {subtitle && (
        <p
          data-reveal
          className={cn(
            'mt-4 text-lg leading-relaxed max-w-2xl',
            align === 'center' && 'mx-auto',
            light ? 'text-white/80' : 'text-[--muted]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
