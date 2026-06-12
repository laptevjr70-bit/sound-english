'use client'
import { motion, AnimatePresence } from 'motion/react'
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
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--brand-red)] text-white font-bold shrink-0"
                  style={{ fontFamily: 'var(--font-fredoka)' }}
                  aria-hidden="true"
                >
                  S
                </span>
                <span className="font-semibold text-[var(--brand-navy)]" style={{ fontFamily: 'var(--font-fredoka)' }}>
                  Sound English
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-[var(--brand-sky)] transition-colors"
                aria-label="Закрыть меню"
              >
                <X className="w-5 h-5 text-[var(--ink)]" />
              </button>
            </div>

            <div className="flex flex-col px-6 py-8 gap-1 flex-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => onNavClick(link.href)}
                  className="text-left py-3 text-base font-medium text-[var(--ink)] hover:text-[var(--brand-navy)] border-b border-[var(--border)] transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="px-6 pb-8 space-y-3">
              <Button
                className="w-full bg-[var(--brand-red)] hover:bg-red-700 text-white"
                onClick={() => onNavClick('#contact')}
              >
                Записаться
              </Button>
              <a
                href={SITE_CONFIG.phoneHref}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-full border-2 border-[var(--border)] text-[var(--ink)] font-semibold hover:border-[var(--brand-navy)] transition-colors text-base"
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
