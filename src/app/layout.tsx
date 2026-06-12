import type { Metadata } from 'next'
import { Fredoka, Onest } from 'next/font/google'
import { Toaster } from 'sonner'
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider'
import { CookieConsent } from '@/components/shared/CookieConsent'
import { SITE_CONFIG } from '@/lib/content'
import './globals.css'

const fredoka = Fredoka({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-fredoka',
  display: 'swap',
})

const onest = Onest({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-onest',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.domain),
  title: {
    default: 'Sound English — детская студия английского языка в Воронеже',
    template: '%s | Sound English',
  },
  description: 'Детская студия английского языка Sound English в Воронеже. Игровой формат, маленькие группы 5–8 детей, с 3 лет. Запишитесь на бесплатный пробный урок!',
  keywords: ['английский для детей', 'Воронеж', 'студия английского', 'Sound English', 'детский английский', 'дошкольники английский'],
  authors: [{ name: 'Sound English' }],
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    siteName: 'Sound English',
    title: 'Sound English — детская студия английского языка в Воронеже',
    description: 'Учим детей английскому через игру, песни и проекты. Маленькие группы, с 3 лет, бесплатный пробный урок.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sound English — детская студия английского в Воронеже',
    description: 'Учим детей английскому через игру. Маленькие группы, с 3 лет.',
  },
  other: {
    'theme-color': '#143A8E',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['EducationalOrganization', 'LocalBusiness'],
  name: 'Sound English',
  alternateName: 'Саунд Инглиш Скул',
  description: 'Детская студия английского языка в Воронеже. Игровой формат, маленькие группы, с 3 лет.',
  url: SITE_CONFIG.domain,
  telephone: '+7-920-428-29-12',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ул. Свободы, 73, БЦ «Икар»',
    addressLocality: 'Воронеж',
    addressCountry: 'RU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.6755,
    longitude: 39.2089,
  },
  openingHours: 'Mo-Su 08:00-18:00',
  sameAs: [SITE_CONFIG.vk],
  priceRange: '₽₽',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${fredoka.variable} ${onest.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        <Toaster position="bottom-center" richColors />
        <CookieConsent />
      </body>
    </html>
  )
}
