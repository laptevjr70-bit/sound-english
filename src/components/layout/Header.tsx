'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, Phone, ChevronDown, Copy, Check } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils'

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Sound English — на главную">
      <span
        className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--brand-red)] text-white font-bold text-lg shrink-0"
        style={{ fontFamily: 'var(--font-fredoka)' }}
        aria-hidden="true"
      >
        S
      </span>
      <span className="flex flex-col leading-none">
        <span
          className="font-semibold text-base sm:text-lg text-[var(--brand-navy)]"
          style={{ fontFamily: 'var(--font-fredoka)' }}
        >
          Sound English
        </span>
        <span className="text-[11px] text-[var(--muted)] hidden sm:block">студия английского языка</span>
      </span>
    </Link>
  )
}

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [phoneOpen, setPhoneOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const phoneRef = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!phoneOpen) return
    const onDown = (e: MouseEvent) => {
      if (phoneRef.current && !phoneRef.current.contains(e.target as Node)) setPhoneOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setPhoneOpen(false)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [phoneOpen])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el && lenis) lenis.scrollTo(el, { offset: -90 })
    else if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const copyPhone = async () => {
    await navigator.clipboard.writeText(SITE_CONFIG.phone)
    setCopied(true)
    setPhoneOpen(false)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 flex justify-center transition-all duration-300 ease-out',
          scrolled ? 'px-3 sm:px-4 pt-3' : 'px-0 pt-0'
        )}
      >
        <div
          className={cn(
            'w-full flex items-center justify-between backdrop-blur-md transition-all duration-300 ease-out',
            scrolled
              ? 'max-w-[1080px] h-14 px-4 sm:px-5 rounded-full bg-white/80 shadow-[0_8px_30px_rgba(14,27,51,0.12)] border border-white/60'
              : 'max-w-[1200px] h-16 md:h-18 px-4 sm:px-6 lg:px-8 rounded-none bg-white/60 border-b border-[var(--border)]/60'
          )}
        >
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Навигация">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-[var(--ink)] hover:text-[var(--brand-navy)] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + phone + burger */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Phone button */}
            <div className="relative hidden md:block shrink-0" ref={phoneRef}>
              <button
                onClick={() => setPhoneOpen((v) => !v)}
                aria-expanded={phoneOpen}
                aria-haspopup="menu"
                className="flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-navy)] hover:text-[var(--brand-blue)] transition-colors cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span className="hidden lg:inline">{SITE_CONFIG.phone}</span>
                <ChevronDown className={cn('w-4 h-4 transition-transform shrink-0', phoneOpen && 'rotate-180')} />
              </button>

              <AnimatePresence>
                {phoneOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    role="menu"
                    className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-[var(--border)] p-2 z-40"
                  >
                    <button
                      onClick={copyPhone}
                      role="menuitem"
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[var(--brand-sky)] transition-colors text-left"
                    >
                      <span className="w-9 h-9 rounded-lg bg-[var(--brand-navy)]/10 flex items-center justify-center text-[var(--brand-navy)] shrink-0">
                        <Copy className="w-4 h-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-[var(--ink)]">Скопировать номер</span>
                        <span className="block text-xs text-[var(--muted)]">{SITE_CONFIG.phone}</span>
                      </span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Copied toast */}
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="hidden md:flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 border border-green-200 rounded-full px-3 py-1 shrink-0"
                >
                  <Check className="w-3.5 h-3.5" />
                  Скопировано!
                </motion.span>
              )}
            </AnimatePresence>

            <Button
              className="hidden md:inline-flex bg-[var(--brand-red)] hover:bg-red-700 text-white shrink-0"
              size={scrolled ? 'sm' : 'default'}
              onClick={() => scrollTo('#contact')}
            >
              Записаться
            </Button>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--brand-sky)] transition-colors shrink-0"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
            >
              <Menu className="w-6 h-6 text-[var(--ink)]" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavClick={scrollTo} />
    </>
  )
}
