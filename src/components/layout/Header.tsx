'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { useLenis } from 'lenis/react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/content'
import { Button } from '@/components/ui/button'
import { MobileMenu } from './MobileMenu'
import { cn } from '@/lib/utils'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lenis = useLenis()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el && lenis) {
      lenis.scrollTo(el, { offset: -80 })
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-30 transition-all duration-300',
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[--border]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-18 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-9 h-9 relative">
              <Image
                src="/brand/logo-sound-english.png"
                alt="Sound English logo"
                width={36}
                height={36}
                className="object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={cn('font-semibold text-lg transition-colors', scrolled ? 'text-[--brand-navy]' : 'text-[--brand-navy]')}
                style={{ fontFamily: 'var(--font-fredoka)' }}
              >
                Sound English
              </span>
              <span className="text-xs text-[--muted] hidden sm:block">студия английского языка</span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Навигация">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-[--muted] hover:text-[--brand-navy] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.phoneHref}
              className="hidden md:flex items-center text-sm font-medium text-[--brand-navy] hover:opacity-75 transition-opacity"
            >
              {SITE_CONFIG.phone}
            </a>
            <Button
              className="hidden md:inline-flex bg-[--brand-red] hover:bg-red-700 text-white"
              onClick={() => scrollTo('#contact')}
            >
              Записаться
            </Button>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-[--brand-sky] transition-colors"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
            >
              <Menu className="w-6 h-6 text-[--ink]" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNavClick={scrollTo} />
    </>
  )
}
