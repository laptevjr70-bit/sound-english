'use client'
import Link from 'next/link'
import { Phone, MapPin, ExternalLink } from 'lucide-react'
import { NAV_LINKS, SITE_CONFIG } from '@/lib/content'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-[var(--ink)] text-white">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl bg-[var(--brand-red)] text-white font-bold text-lg"
                style={{ fontFamily: 'var(--font-fredoka)' }}
                aria-hidden="true"
              >
                S
              </span>
              <span className="font-semibold text-xl" style={{ fontFamily: 'var(--font-fredoka)' }}>
                Sound English
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-xs">
              Детская студия английского языка в Воронеже. Учим говорить, играя.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Навигация</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/75 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-semibold mb-4 text-white/90">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="flex items-center gap-2 text-white/75 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  {SITE_CONFIG.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/75 hover:text-white text-sm transition-colors"
                >
                  <ExternalLink className="w-4 h-4 shrink-0" />
                  ВКонтакте {SITE_CONFIG.vkHandle}
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 text-white/75 text-sm">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{SITE_CONFIG.city}, {SITE_CONFIG.address}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/15 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p className="text-white/75 text-sm">
            © {year} Sound English. Все права защищены.
          </p>
          <Link
            href="/privacy"
            className="text-white/80 hover:text-white text-sm transition-colors underline underline-offset-4 font-medium"
          >
            Политика конфиденциальности
          </Link>
          <p className="text-white/75 text-sm italic">Растём вместе с английским</p>
        </div>
      </div>
    </footer>
  )
}
