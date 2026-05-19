import type { Program } from '../types'

export const programs: Program[] = [
  {
    id: 'adults',
    title: 'Adults Fundamentals',
    subtitle: 'Gi & No-Gi',
    pills: ['Gi', 'No-Gi'],
    image: '/images/classes/adults.webp',
    description:
      'Beginner-friendly Jiu-Jitsu classes, where everyone feels confident to start their journey. No experience is required.',
    bullets: [
      'Gi and No-Gi classes available',
      'All skill levels welcome',
      'Modern CLA methodology',
      'Beginner-friendly environment',
    ],
    cta: 'Start With a Free Trial',
  },
  {
    id: 'womens',
    title: 'Women Only',
    subtitle: 'All Levels',
    image: '/images/classes/women.webp',
    description:
      'Empowering space led by a female instructor. The safe space you need to start feeling like a champion from day one.',
    bullets: [
      'Women-only weekly class',
      'Free monthly open mat',
      'Taught by Miranda "Mira" — Purple Belt',
      'Welcoming and inclusive atmosphere',
    ],
    cta: 'Start With a Free Trial',
  },
  {
    id: 'kids',
    title: 'Kids BJJ',
    subtitle: 'Ages 5+',
    image: '/images/classes/kids.webp',
    description:
      'Fun classes that build confidence from an early age. Values like inclusion and respect for others are the foundation of every class.',
    bullets: [
      'Ages 5 and up',
      'Fun and safe environment',
      'Builds confidence and discipline',
      'Parents welcome to train at no extra charge',
    ],
    cta: 'Start With a Free Trial',
  },
]
