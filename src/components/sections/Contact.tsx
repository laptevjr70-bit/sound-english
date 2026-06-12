import { Phone, ExternalLink, MapPin, Clock } from 'lucide-react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { ContactForm } from '@/components/shared/ContactForm'
import { SITE_CONFIG } from '@/lib/content'

export function Contact() {
  return (
    <Section id="contact" variant="sky">
      <SectionHeading
        eyebrow="Контакты"
        h2="Запишитесь на бесплатный пробный урок"
        subtitle="Оставьте заявку — перезвоним, определим уровень ребёнка и подберём формат."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
        {/* Contact info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[var(--border)]" style={{ boxShadow: 'var(--shadow-card)' }}>
            <h3 className="font-semibold text-[var(--ink)] mb-5" style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.2rem' }}>
              Как с нами связаться
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={SITE_CONFIG.phoneHref}
                  className="flex items-center gap-3 group"
                  aria-label={`Позвонить: ${SITE_CONFIG.phone}`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-sky)] flex items-center justify-center text-[var(--brand-navy)] group-hover:bg-[var(--brand-navy)] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">Телефон</p>
                    <p className="font-semibold text-[var(--ink)]">{SITE_CONFIG.phone}</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href={SITE_CONFIG.vk}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-sky)] flex items-center justify-center text-[var(--brand-navy)] group-hover:bg-[var(--brand-navy)] group-hover:text-white transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--muted)]">ВКонтакте</p>
                    <p className="font-semibold text-[var(--ink)]">{SITE_CONFIG.vkHandle}</p>
                  </div>
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-sky)] flex items-center justify-center text-[var(--brand-navy)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)]">Адрес</p>
                  <p className="font-semibold text-[var(--ink)] text-sm">{SITE_CONFIG.city}, {SITE_CONFIG.address}</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--brand-sky)] flex items-center justify-center text-[var(--brand-navy)]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-[var(--muted)]">Режим работы</p>
                  <p className="font-semibold text-[var(--ink)]">{SITE_CONFIG.hours}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Map placeholder */}
          {/* TODO: встройте iframe Яндекс.Карт или 2ГИС по адресу: ул. Свободы 73, Воронеж */}
          <div className="bg-white rounded-2xl border border-[var(--border)] overflow-hidden" style={{ boxShadow: 'var(--shadow-card)' }}>
            <div className="h-48 bg-[var(--brand-sky)] flex flex-col items-center justify-center text-[var(--muted)]">
              <MapPin className="w-8 h-8 mb-2 text-[var(--brand-navy)]" />
              <p className="text-sm font-medium">Карта проезда</p>
              <p className="text-xs mt-1">Воронеж, ул. Свободы, 73, БЦ «Икар»</p>
            </div>
            <div className="p-4">
              <a
                href="https://yandex.ru/maps/?text=Воронеж+ул+Свободы+73+БЦ+Икар"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--brand-navy)] font-semibold hover:opacity-75 underline underline-offset-4"
              >
                Построить маршрут в Яндекс.Картах →
              </a>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-[var(--border)]" style={{ boxShadow: 'var(--shadow-card)' }}>
          <h3 className="font-semibold text-[var(--ink)] mb-6" style={{ fontFamily: 'var(--font-fredoka)', fontSize: '1.2rem' }}>
            Оставить заявку
          </h3>
          <ContactForm />
        </div>
      </div>
    </Section>
  )
}
