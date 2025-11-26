/**
 * Testimonials data for AlpWeb
 */
export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
  rating: number
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Marie Dupont',
    role: 'Gérante',
    company: 'Restaurant Le Gourmet',
    content: 'AlpWeb a transformé notre présence en ligne. Notre nouveau site attire beaucoup plus de clients et les réservations ont augmenté de 40%.',
    rating: 5,
  },
  {
    id: 'testimonial-2',
    name: 'Pierre Martin',
    role: 'Avocat associé',
    company: 'Cabinet Martin & Associés',
    content: 'Un travail professionnel et soigné. L\'équipe a parfaitement compris nos besoins et a livré un site qui reflète notre image.',
    rating: 5,
  },
  {
    id: 'testimonial-3',
    name: 'Sophie Laurent',
    role: 'Photographe',
    company: 'Studio Lumière',
    content: 'Les animations et le design sont exactement ce que je recherchais. Mon portfolio fait maintenant une vraie différence.',
    rating: 5,
  },
]
