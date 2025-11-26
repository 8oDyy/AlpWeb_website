/**
 * Services data for AlpWeb
 */
export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export const services: Service[] = [
  {
    id: 'site-vitrine',
    title: 'Sites Vitrines',
    description: 'Des sites web élégants et performants pour présenter votre activité et attirer de nouveaux clients.',
    icon: 'lucide:layout',
    features: [
      'Design sur-mesure',
      'Responsive mobile',
      'Optimisé SEO',
      'Formulaire de contact',
    ],
  },
  {
    id: 'design-ui-ux',
    title: 'Design UI/UX',
    description: 'Des interfaces modernes et intuitives conçues pour offrir la meilleure expérience utilisateur.',
    icon: 'lucide:palette',
    features: [
      'Maquettes Figma',
      'Prototypes interactifs',
      'Design system',
      'Tests utilisateurs',
    ],
  },
  {
    id: 'seo-performance',
    title: 'SEO & Performance',
    description: 'Optimisation pour les moteurs de recherche et performances maximales pour un meilleur référencement.',
    icon: 'lucide:search',
    features: [
      'Audit SEO',
      'Optimisation Core Web Vitals',
      'Stratégie de contenu',
      'Suivi analytics',
    ],
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Accompagnement continu pour maintenir votre site à jour et sécurisé.',
    icon: 'lucide:wrench',
    features: [
      'Mises à jour régulières',
      'Sauvegardes automatiques',
      'Support technique',
      'Monitoring 24/7',
    ],
  },
]
