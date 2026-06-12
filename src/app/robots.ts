import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/content'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/privacy',
    },
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  }
}
