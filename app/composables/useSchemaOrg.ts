/**
 * Schema.org Composable
 * Injects JSON-LD structured data into page head
 */

import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  type OrganizationSchema,
  type LocalBusinessSchema,
  type WebSiteSchema,
  type ServiceSchema,
  type FAQSchema,
  type BreadcrumbSchema,
} from '~/utils/schema'

/**
 * Inject JSON-LD schema into page head
 */
function injectSchema(schema: object) {
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema),
      },
    ],
  })
}

/**
 * Get default organization data from runtime config
 */
function getDefaultOrganization(): OrganizationSchema {
  const config = useRuntimeConfig()
  return {
    name: config.public.siteName as string,
    url: config.public.siteUrl as string,
    logo: `${config.public.siteUrl}/logo.png`,
    description: config.public.siteDescription as string,
    email: 'contact@alpweb.fr',
    sameAs: [
      'https://www.linkedin.com/company/alpweb',
      'https://github.com/alpweb',
      'https://twitter.com/alpweb',
    ],
  }
}

/**
 * Inject Organization schema (default for all pages)
 */
export function useSchemaOrganization(org?: Partial<OrganizationSchema>) {
  const defaultOrg = getDefaultOrganization()
  const schema = generateOrganizationSchema({ ...defaultOrg, ...org })
  injectSchema(schema)
}

/**
 * Inject LocalBusiness schema (for local SEO)
 */
export function useSchemaLocalBusiness(business?: Partial<LocalBusinessSchema>) {
  const defaultOrg = getDefaultOrganization()
  const schema = generateLocalBusinessSchema({
    ...defaultOrg,
    priceRange: '€€',
    ...business,
  })
  injectSchema(schema)
}

/**
 * Inject WebSite schema (for homepage)
 */
export function useSchemaWebSite(site?: Partial<WebSiteSchema>) {
  const config = useRuntimeConfig()
  const schema = generateWebSiteSchema({
    name: config.public.siteName as string,
    url: config.public.siteUrl as string,
    description: config.public.siteDescription as string,
    ...site,
  })
  injectSchema(schema)
}

/**
 * Inject Service schema
 */
export function useSchemaService(service: Omit<ServiceSchema, 'provider'> & { provider?: string }) {
  const config = useRuntimeConfig()
  const schema = generateServiceSchema({
    provider: config.public.siteName as string,
    ...service,
  })
  injectSchema(schema)
}

/**
 * Inject FAQ schema
 */
export function useSchemaFAQ(faq: FAQSchema) {
  const schema = generateFAQSchema(faq)
  injectSchema(schema)
}

/**
 * Inject Breadcrumb schema
 */
export function useSchemaBreadcrumb(breadcrumb: BreadcrumbSchema) {
  const schema = generateBreadcrumbSchema(breadcrumb)
  injectSchema(schema)
}

/**
 * Inject WebPage schema
 */
export function useSchemaWebPage(page: {
  name: string
  description: string
  datePublished?: string
  dateModified?: string
}) {
  const config = useRuntimeConfig()
  const route = useRoute()
  const schema = generateWebPageSchema({
    ...page,
    url: `${config.public.siteUrl}${route.path}`,
  })
  injectSchema(schema)
}
