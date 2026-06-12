'use client'
import { useLenis } from 'lenis/react'
import { Section } from '@/components/shared/Section'
import { SectionHeading } from '@/components/shared/SectionHeading'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQ_ITEMS } from '@/lib/content'

export function Faq() {
  const lenis = useLenis()
  const scrollToContact = () => {
    const el = document.getElementById('contact')
    if (el && lenis) lenis.scrollTo(el, { offset: -80 })
  }

  return (
    <Section id="faq" variant="white">
      <SectionHeading
        eyebrow="Вопросы и ответы"
        h2="Часто спрашивают"
        subtitle="Ответили на самые популярные вопросы"
      />
      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="bg-white rounded-2xl border border-[--border] px-6 divide-y divide-[--border]">
          {FAQ_ITEMS.map((item, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-b-0">
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-center text-[--muted] mt-8">
          Не нашли ответ?{' '}
          <button
            onClick={scrollToContact}
            className="text-[--brand-navy] font-semibold underline underline-offset-4 hover:opacity-75"
          >
            Напишите нам — отвечаем быстро.
          </button>
        </p>
      </div>
    </Section>
  )
}
