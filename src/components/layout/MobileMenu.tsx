'use client'
import { motion, AnimatePresence } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/content'
import { Button } from '@/components/ui/button'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
  onNavClick: (href: string) => void
}

export function MobileMenu({ open, onClose, onNavClick }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />
          <motion.nav
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 flex flex-col shadow-2xl"
            aria-label="Мобильное меню"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[--border]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 relative">
                  <Image
                    src="/brand/logo-sound-english.png"
                    alt="Sound English"
                    width={32}
                    height={32}
                    className="object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />
                </div>
                <span className="font-semibold text-[--brand-navy]" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Sound English
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[--brand-sky] transition-colors"
                aria-label="Закрыть меню"
              >
                <X className="w-5 h-5 text-[--ink]" />
              </button>
            </div>

            <div className="flex flex-col px-6 py-8 gap-1 flex-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => onNavClick(link.href)}
                  className="text-left py-3 text-base font-medium text-[--ink] hover:text-[--brand-navy] border-b border-[--border] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="px-6 pb-8 space-y-3">
              <Button
                className="w-full bg-[--brand-red] hover:bg-red-700 text-white"
                onClick={() => onNavClick('#contact')}
              >
                Записаться
              </Button>
              <a
                href={SITE_CONFIG.phoneHref}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-full border-2 border-[--border] text-[--ink] font-semibold hover:border-[--brand-navy] transition-colors text-base"
              >
                {SITE_CONFIG.phone}
              </a>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
