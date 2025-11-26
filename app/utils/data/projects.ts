/**
 * Projects/Portfolio data for AlpWeb
 */
export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  url?: string
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'Restaurant Le Gourmet',
    description: 'Site vitrine moderne pour un restaurant gastronomique avec réservation en ligne.',
    image: '/images/projects/restaurant.jpg',
    tags: ['Site Vitrine', 'Réservation', 'SEO'],
    url: 'https://example.com',
  },
  {
    id: 'project-2',
    title: 'Cabinet Avocat Martin',
    description: 'Site professionnel pour un cabinet d\'avocats avec prise de rendez-vous.',
    image: '/images/projects/avocat.jpg',
    tags: ['Site Vitrine', 'Formulaire', 'Design'],
  },
  {
    id: 'project-3',
    title: 'Studio Photo Lumière',
    description: 'Portfolio photographe avec galerie interactive et animations.',
    image: '/images/projects/photo.jpg',
    tags: ['Portfolio', 'Animations', 'Galerie'],
  },
]
