# AlpWeb - Règles Globales du Projet

> Ce document centralise toutes les conventions, décisions techniques et règles de design du projet AlpWeb.

---

## 📋 Table des matières

1. [Stack Technique](#-stack-technique)
2. [Architecture & Structure](#-architecture--structure)
3. [Conventions de Code](#-conventions-de-code)
4. [Direction Design / UX](#-direction-design--ux)
5. [Animations & Scroll](#-animations--scroll)
6. [Structure de la Page d'Accueil](#-structure-de-la-page-daccueil)
7. [Git & Workflow](#-git--workflow)
8. [Décisions Importantes](#-décisions-importantes)

---

## 🛠 Stack Technique

### Core
| Technologie | Version | Usage |
|-------------|---------|-------|
| Nuxt | 4.x | Framework SSR/SSG |
| Vue | 3.5.x | Framework UI |
| TypeScript | 5.x | Typage statique |

### UI & Styles
| Technologie | Version | Usage |
|-------------|---------|-------|
| Tailwind CSS | 4.x | Utility-first CSS |
| Nuxt UI | 4.x | Composants UI |
| Inter | - | Police corps de texte |
| Manrope | - | Police titres |

### Animations
| Technologie | Version | Usage |
|-------------|---------|-------|
| GSAP | 3.x | Animations complexes |
| ScrollTrigger | 3.x | Animations au scroll |
| Lenis | 1.x | Smooth scroll |
| Three.js | - | 3D (optionnel, hero uniquement) |

### Tooling
| Technologie | Usage |
|-------------|-------|
| ESLint | Linting |
| pnpm | Package manager |
| GitHub Actions | CI/CD |

---

## 📁 Architecture & Structure

```
app/
├── assets/
│   └── css/
│       └── main.css           # Styles globaux + Tailwind
├── components/
│   ├── sections/              # Sections de page
│   │   ├── HeroSection.vue
│   │   ├── ServicesSection.vue
│   │   ├── ShowcaseSection.vue
│   │   ├── ProcessSection.vue
│   │   ├── StackSection.vue
│   │   └── CtaSection.vue
│   ├── ui/                    # Composants UI réutilisables
│   └── layout/                # Header, Footer, Navigation
├── composables/
│   ├── useGsap.ts             # Utilitaires GSAP génériques
│   ├── useHeroAnimations.ts   # Animations hero
│   ├── useScrollScenes.ts     # Scènes ScrollTrigger
│   └── useLenis.ts            # Configuration Lenis
├── layouts/
│   └── default.vue            # Layout principal
├── pages/
│   └── index.vue              # Page d'accueil
├── plugins/
│   ├── gsap.client.ts         # Plugin GSAP
│   └── lenis.client.ts        # Plugin Lenis
└── utils/
    └── data/                  # Données statiques
```

### Règles de nommage
- **Composants** : PascalCase (`HeroSection.vue`)
- **Composables** : camelCase avec préfixe `use` (`useHeroAnimations.ts`)
- **Fichiers TS** : camelCase (`scrollConfig.ts`)
- **CSS classes** : kebab-case pour custom, Tailwind pour le reste

---

## 📝 Conventions de Code

### TypeScript
- Typer toutes les props, emits, et retours de fonctions
- Éviter `any`, préférer `unknown` si nécessaire
- Interfaces dans des fichiers dédiés ou en haut du fichier

### Vue / Nuxt
```vue
<script setup lang="ts">
// 1. Imports
// 2. Props & Emits
// 3. Composables
// 4. Reactive state
// 5. Computed
// 6. Methods
// 7. Lifecycle hooks
</script>

<template>
  <!-- Template concis, logique dans script -->
</template>
```

### Animations GSAP
- **Séparation** : Config GSAP dans des composables dédiés, pas dans les templates
- **Cleanup** : Toujours `kill()` les animations dans `onUnmounted`
- **Context** : Utiliser `gsap.context()` pour le scope

```ts
// ✅ Bon
const ctx = gsap.context(() => {
  // animations
}, containerRef.value)

onUnmounted(() => ctx.revert())

// ❌ Mauvais
gsap.to('.element', { ... }) // pas de cleanup
```

### Tailwind
- Pas de classes inutiles
- Grouper logiquement : layout → spacing → typography → colors → effects
- Utiliser les variables CSS pour les couleurs custom

---

## 🎨 Direction Design / UX

### Philosophie
> **Apple-like** : Épuré, premium, minimaliste. Le visiteur doit se dire : "Si leur site est à ce niveau, ils peuvent faire le mien."

### Palette de couleurs
```css
:root {
  /* Fond principal */
  --color-cream: #F5F0E8;
  --color-cream-dark: #EBE4D8;
  
  /* Texte & accents */
  --color-black: #1A1A1A;
  --color-black-soft: #2D2D2D;
  
  /* Accents subtils */
  --color-brown: #8B7355;
  --color-brown-light: #A89078;
  
  /* Montagnes (dégradé) */
  --color-mountain-1: #3D3D3D;
  --color-mountain-2: #5A5A5A;
  --color-mountain-3: #787878;
}
```

### Règles visuelles
- **Fond** : Tons crème/sable (`--color-cream`)
- **Texte** : Noir profond (`--color-black`)
- **Espacement** : Beaucoup d'espace, layout respirant
- **Couleurs** : Très peu, pas de gradient flashy
- **Effets** : Subtils, pas "gaming"

### Typographie
| Élément | Police | Taille | Poids |
|---------|--------|--------|-------|
| H1 | Manrope | 4rem - 6rem | 700-800 |
| H2 | Manrope | 2.5rem - 3.5rem | 600-700 |
| H3 | Manrope | 1.5rem - 2rem | 600 |
| Body | Inter | 1rem - 1.125rem | 400 |
| Small | Inter | 0.875rem | 400 |

### Espacements
- **Sections** : `py-24` à `py-32` (96px - 128px)
- **Container** : `max-w-7xl mx-auto px-6`
- **Entre éléments** : `gap-8` à `gap-16`

---

## ✨ Animations & Scroll

### Philosophie
> **Scrollytelling** : Le scroll raconte une histoire, pas juste une descente de page.

### Lenis (Smooth Scroll)
- Duration : 1.2s
- Easing : ease-out expo
- Intégration avec ScrollTrigger via `lenis.on('scroll', ScrollTrigger.update)`

### ScrollTrigger - Patterns utilisés

#### 1. Sections pinnées
```ts
ScrollTrigger.create({
  trigger: '.section',
  pin: true,
  start: 'top top',
  end: '+=100%',
})
```

#### 2. Scroll horizontal (contrôlé par scroll vertical)
```ts
gsap.to('.horizontal-container', {
  x: () => -(containerWidth - viewportWidth),
  ease: 'none',
  scrollTrigger: {
    trigger: '.horizontal-wrapper',
    pin: true,
    scrub: 1,
    end: () => `+=${containerWidth}`,
  },
})
```

#### 3. Fade-in au scroll
```ts
gsap.from('.element', {
  opacity: 0,
  y: 50,
  scrollTrigger: {
    trigger: '.element',
    start: 'top 85%',
    toggleActions: 'play none none reverse',
  },
})
```

### Micro-interactions
- **Hover cards** : `scale(1.02)` + léger shadow
- **Parallax backgrounds** : vitesse 0.3 - 0.5
- **Stagger texte** : 0.05s - 0.1s entre éléments

---

## 🏠 Structure de la Page d'Accueil

### 1. Hero Section
- Fond : montagnes en couches (crème/noir)
- Logo AlpWeb + baseline
- CTA principal
- Animation : logo reveal, texte stagger, parallax montagnes
- Transition : pinned → fade vers section suivante

### 2. Showcase Section (Scrollytelling horizontal)
- 3 slides : Site vitrine | App iOS | Dashboard
- Scroll horizontal contrôlé
- Mockup + texte + stack par slide

### 3. Services Section
- Cartes crème/noir
- Services : Sites web, Apps, Backend/API, Hébergement
- Animation : fade + translate

### 4. Process Section
- 4 étapes : Découverte → Design → Dev/Test → Déploiement
- Timeline animée au scroll

### 5. Stack Section
- Logos technos avec micro-animations hover
- Nuxt, Vue, Swift, Supabase, PostgreSQL, Stripe, Docker...

### 6. CTA Final
- Section simple, centrée
- Titre fort + bouton contact

---

## 🔀 Git & Workflow

### Branches
```
main              # Production
├── dev           # Développement
    ├── feat/xxx  # Features
    ├── fix/xxx   # Corrections
    └── style/xxx # Styles
```

### Format des commits
```
feat: add animated hero section
style: adjust typography scale
fix: lenis scroll jitter on mobile
refactor: extract scroll animations to composable
docs: update global rules
```

### Checklist avant commit
- [ ] Pas de `console.log` oubliés
- [ ] Imports inutiles supprimés
- [ ] Code formaté
- [ ] `pnpm lint` passe

### Pull Requests
- Titre clair
- Description : ce qui a été fait + points d'attention
- Une PR = une feature

---

## 📌 Décisions Importantes

### [2024-XX-XX] Structure des animations
**Décision** : Séparer la logique d'animation dans des composables dédiés.
**Raison** : Maintenabilité, réutilisabilité, tests plus faciles.

### [2024-XX-XX] Palette de couleurs
**Décision** : Crème (#F5F0E8) / Noir (#1A1A1A) comme couleurs principales.
**Raison** : Cohérence avec l'identité AlpWeb, look premium.

### [2024-XX-XX] Three.js
**Décision** : Optionnel, uniquement en hero si valeur ajoutée claire.
**Raison** : Performance, ne pas surcharger pour le "wow effect".

---

*Dernière mise à jour : Phase 1 - Base layout*
