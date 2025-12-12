# AlpWeb - Site Vitrine Premium

Site vitrine SEO-ready pour AlpWeb, agence web spécialisée dans la création de sites vitrines premium.

## 🚀 Stack Technique

- **Framework**: Nuxt 3 (Vue 3 + TypeScript)
- **Styling**: TailwindCSS
- **Fonts**: @nuxt/fonts (Inter, Manrope)
- **Icons**: @nuxt/icon (Lucide)
- **Images**: @nuxt/image (optimisation automatique)
- **3D**: TresJS (Three.js)
- **Animations**: GSAP + Lenis

## 📦 Installation

```bash
# Installer les dépendances
pnpm install

# Copier le fichier d'environnement
cp .env.example .env
```

## 🔧 Développement

```bash
# Démarrer le serveur de développement
pnpm dev

# Linter
pnpm lint
pnpm lint:fix

# Type checking
pnpm typecheck
```

## 🏗️ Production

```bash
# Build pour la production
pnpm build

# Preview du build
pnpm preview

# Génération statique (SSG)
pnpm generate
```

## 🔍 SEO - Fonctionnalités Implémentées

### Configuration Globale
- `nuxt.config.ts` : meta par défaut, OpenGraph, Twitter Cards, theme-color
- Title template : `%s | AlpWeb - Agence Web Premium`
- Canonical URLs automatiques

### Composables SEO
- `useSeo()` : configuration SEO complète par page
- `useSeoSimple()` : configuration rapide (title + description)
- `useSeoNoIndex()` : pour pages techniques

### Schema.org (JSON-LD)
- `useSchemaOrganization()` : données entreprise
- `useSchemaWebSite()` : données site (homepage)
- `useSchemaService()` : services proposés
- `useSchemaFAQ()` : page FAQ
- `useSchemaLocalBusiness()` : SEO local
- `useSchemaBreadcrumb()` : fil d'Ariane

### Sitemap & Robots
- Sitemap automatique : `/sitemap.xml`
- Robots.txt configuré avec exclusions
- Headers HTTP pour cache et noindex (preview)

### Performance
- Images optimisées (WebP, AVIF)
- Lazy loading automatique
- Fonts optimisées (display: swap)
- Cache headers sur assets

## 📄 Pages

| Route | Description |
|-------|-------------|
| `/` | Accueil |
| `/services` | Liste des services |
| `/services/[slug]` | Détail service |
| `/realisations` | Portfolio |
| `/a-propos` | À propos |
| `/contact` | Formulaire de contact |
| `/mentions-legales` | Mentions légales |
| `/confidentialite` | Politique de confidentialité |

## 📊 Analytics

Analytics désactivé par défaut. Pour activer :

```env
# Google Analytics 4
NUXT_PUBLIC_ANALYTICS_PROVIDER=gtag
NUXT_PUBLIC_GTAG_ID=G-XXXXXXXXXX

# OU Plausible
NUXT_PUBLIC_ANALYTICS_PROVIDER=plausible
NUXT_PUBLIC_PLAUSIBLE_DOMAIN=alp-web.com
```

## ✅ Checklist SEO - Validation

### Avant mise en production

- [ ] Vérifier les TODO dans les pages (mentions légales, confidentialité, etc.)
- [ ] Ajouter l'image OG (`/public/og-image.jpg` - 1200x630px)
- [ ] Ajouter les favicons manquants (`favicon-32x32.png`, `favicon-16x16.png`, `apple-touch-icon.png`)
- [ ] Créer le fichier `site.webmanifest`
- [ ] Configurer les variables d'environnement (`.env`)
- [ ] Tester le build : `pnpm build`

### Tests Lighthouse

```bash
# Installer Lighthouse CLI
npm install -g lighthouse

# Tester en local (après pnpm preview)
lighthouse http://localhost:3000 --view

# Ou utiliser Chrome DevTools > Lighthouse
```

**Objectifs Lighthouse :**
- Performance : > 90
- Accessibility : > 90
- Best Practices : > 90
- SEO : > 90

### Google Search Console

1. Ajouter la propriété `https://alp-web.com`
2. Vérifier la propriété (DNS, fichier HTML, ou Google Analytics)
3. Soumettre le sitemap : `https://alp-web.com/sitemap.xml`
4. Vérifier l'indexation des pages principales
5. Corriger les éventuelles erreurs signalées

### Outils de validation

- **Schema.org** : [Schema Markup Validator](https://validator.schema.org/)
- **OpenGraph** : [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- **Twitter Cards** : [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- **Core Web Vitals** : [PageSpeed Insights](https://pagespeed.web.dev/)

## 📁 Structure des fichiers SEO

```
app/
├── composables/
│   ├── useSeo.ts           # Composable SEO principal
│   └── useSchemaOrg.ts     # Composables Schema.org
├── utils/
│   └── schema.ts           # Helpers JSON-LD
├── plugins/
│   └── analytics.client.ts # Plugin analytics conditionnel
└── pages/
    └── error.vue           # Page d'erreur (404, 500)

public/
└── robots.txt              # Configuration robots
```

## 🔗 Ressources

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Nuxt SEO](https://nuxtseo.com/)
- [Schema.org](https://schema.org/)
- [Google Search Central](https://developers.google.com/search)
