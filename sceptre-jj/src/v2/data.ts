import type { FaqItem, Program } from '../types'

// V2 landing page copy — kept separate so the main LP data stays untouched.

export const programsV2: Program[] = [
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
    cta: 'Book a free trial class',
  },
  {
    id: 'womens',
    title: 'Women Only Classes',
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
    cta: 'Book a free trial class',
  },
  {
    id: 'kids',
    title: 'Kids',
    subtitle: 'Ages 5+',
    image: '/images/classes/kids.webp',
    description:
      'Fun classes that build confidence from an early age in children from our community. Values like inclusion and respect for others are the foundation of every class.',
    bullets: [
      'Ages 5 and up',
      'Fun and safe environment',
      'Builds confidence and discipline',
      'Parents welcome to train at no extra charge',
    ],
    cta: 'Book a free trial class',
  },
]

export const faqItemsV2: FaqItem[] = [
  {
    id: 'what-is-sceptre',
    question: 'What is Sceptre?',
    answer:
      'Sceptre is a jiu-jitsu academy where beginners feel confident to start. A warm community has grown around it and is waiting for you for your first free class.',
  },
  {
    id: 'fitness',
    question: 'Do I need to be in shape to start?',
    answer: 'No. Classes are designed for all fitness levels and complete beginners.',
  },
  {
    id: 'trial-class',
    question: 'What is a trial class?',
    answer:
      'A free class with warm-up and basic techniques. No experience needed. We provide everything, including the uniform.',
  },
  {
    id: 'why-trial',
    question: 'Why should I try a trial class?',
    answer:
      'Experience the environment, meet instructors, and see if it fits you. You might just fall in love with it.',
  },
  {
    id: 'kids',
    question: 'Are kids welcome?',
    answer: 'Yes. Our inclusive methodology fits perfectly into childhood as well.',
  },
  {
    id: 'safety',
    question: 'Is jiu-jitsu safe?',
    answer:
      'Yes. Classes are supervised by experienced instructors. The only risk is enjoying it too much.',
  },
]
