/**
 * SEO Composable
 * Provides utilities for managing SEO meta tags across pages
 */

interface SeoOptions {
  title: string
  description?: string
  image?: string
  type?: 'website' | 'article' | 'book' | 'profile'
  noIndex?: boolean
  canonical?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
}

/**
 * Sets up SEO meta tags for a page with sensible defaults
 * Automatically handles canonical URL, OpenGraph, and Twitter cards
 */
export function useSeo(options: SeoOptions) {
  const config = useRuntimeConfig()
  const route = useRoute()

  const siteUrl = config.public.siteUrl as string
  const siteName = config.public.siteName as string
  const siteDescription = config.public.siteDescription as string

  // Build canonical URL
  const canonicalUrl = options.canonical || `${siteUrl}${route.path}`

  // Default image
  const ogImage = options.image?.startsWith('http')
    ? options.image
    : `${siteUrl}${options.image || '/og-image.jpg'}`

  // Description with fallback
  const description = options.description || siteDescription

  // Set head with canonical
  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl },
    ],
  })

  // Set SEO meta
  useSeoMeta({
    title: options.title,
    description,
    robots: options.noIndex ? 'noindex, nofollow' : 'index, follow',

    // OpenGraph
    ogTitle: options.title,
    ogDescription: description,
    ogImage,
    ogUrl: canonicalUrl,
    ogType: options.type || 'website',
    ogSiteName: siteName,
    ogLocale: 'fr_FR',

    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: description,
    twitterImage: ogImage,

    // Article specific (if applicable)
    articlePublishedTime: options.publishedTime,
    articleModifiedTime: options.modifiedTime,
    articleAuthor: options.author ? [options.author] : undefined,
  })
}

/**
 * Quick SEO setup with just title and description
 */
export function useSeoSimple(title: string, description?: string) {
  useSeo({ title, description })
}

/**
 * SEO setup for noindex pages (admin, login, etc.)
 */
export function useSeoNoIndex(title: string) {
  useSeo({ title, noIndex: true })
}
