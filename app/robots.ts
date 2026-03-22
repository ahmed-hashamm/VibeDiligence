import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://vibediligence.tech'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/results/'], // Don't crawl API or internal results
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
