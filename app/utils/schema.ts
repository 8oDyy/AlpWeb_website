/**
 * Schema.org JSON-LD Helpers
 * Generates structured data for SEO
 */

export interface OrganizationSchema {
  name: string
  url: string
  logo?: string
  description?: string
  email?: string
  telephone?: string
  address?: {
    streetAddress?: string
    addressLocality?: string
    postalCode?: string
    addressCountry?: string
  }
  sameAs?: string[]
}

export interface LocalBusinessSchema extends OrganizationSchema {
  priceRange?: string
  openingHours?: string[]
  geo?: {
    latitude: number
    longitude: number
  }
}

export interface WebSiteSchema {
  name: string
  url: string
  description?: string
  searchUrl?: string
}

export interface ServiceSchema {
  name: string
  description: string
  provider: string
  url?: string
  image?: string
  areaServed?: string
}

export interface FAQSchema {
  questions: Array<{
    question: string
    answer: string
  }>
}

export interface BreadcrumbSchema {
  items: Array<{
    name: string
    url: string
  }>
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(org: OrganizationSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': org.name,
    'url': org.url,
    ...(org.logo && { logo: org.logo }),
    ...(org.description && { description: org.description }),
    ...(org.email && { email: org.email }),
    ...(org.telephone && { telephone: org.telephone }),
    ...(org.address && {
      address: {
        '@type': 'PostalAddress',
        ...org.address,
      },
    }),
    ...(org.sameAs && { sameAs: org.sameAs }),
  }
}

/**
 * Generate LocalBusiness schema
 */
export function generateLocalBusinessSchema(business: LocalBusinessSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': business.name,
    'url': business.url,
    ...(business.logo && { logo: business.logo }),
    ...(business.description && { description: business.description }),
    ...(business.email && { email: business.email }),
    ...(business.telephone && { telephone: business.telephone }),
    ...(business.priceRange && { priceRange: business.priceRange }),
    ...(business.openingHours && { openingHoursSpecification: business.openingHours }),
    ...(business.address && {
      address: {
        '@type': 'PostalAddress',
        ...business.address,
      },
    }),
    ...(business.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        'latitude': business.geo.latitude,
        'longitude': business.geo.longitude,
      },
    }),
    ...(business.sameAs && { sameAs: business.sameAs }),
  }
}

/**
 * Generate WebSite schema with optional SearchAction
 */
export function generateWebSiteSchema(site: WebSiteSchema): object {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': site.name,
    'url': site.url,
  }

  if (site.description) {
    schema.description = site.description
  }

  if (site.searchUrl) {
    schema.potentialAction = {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': site.searchUrl,
      },
      'query-input': 'required name=search_term_string',
    }
  }

  return schema
}

/**
 * Generate Service schema
 */
export function generateServiceSchema(service: ServiceSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.name,
    'description': service.description,
    'provider': {
      '@type': 'Organization',
      'name': service.provider,
    },
    ...(service.url && { url: service.url }),
    ...(service.image && { image: service.image }),
    ...(service.areaServed && { areaServed: service.areaServed }),
  }
}

/**
 * Generate FAQPage schema
 */
export function generateFAQSchema(faq: FAQSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faq.questions.map(q => ({
      '@type': 'Question',
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': q.answer,
      },
    })),
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(breadcrumb: BreadcrumbSchema): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumb.items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': item.url,
    })),
  }
}

/**
 * Generate WebPage schema
 */
export function generateWebPageSchema(page: {
  name: string
  description: string
  url: string
  datePublished?: string
  dateModified?: string
}): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'name': page.name,
    'description': page.description,
    'url': page.url,
    ...(page.datePublished && { datePublished: page.datePublished }),
    ...(page.dateModified && { dateModified: page.dateModified }),
  }
}
