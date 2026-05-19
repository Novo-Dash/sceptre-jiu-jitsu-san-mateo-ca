import type { Instructor } from '../types'

export const instructors: Instructor[] = [
  {
    id: 'john',
    name: 'John Miller',
    title: 'Head Instructor',
    belt: 'Black Belt',
    beltColor: 'black',
    bio: 'John leads Sceptre with inclusion at the core, adapting each class to different bodies, goals, and experiences. His coaching creates a supportive space where everyone feels comfortable expressing themselves.',
    imageSrc: '/images/professor/John.webp',
    imageAlt: 'John Miller, Head Instructor and Black Belt at Sceptre Jiu-Jitsu in San Mateo, CA',
  },
  {
    id: 'sean',
    name: 'Sean "Higgie"',
    title: 'Instructor',
    belt: 'Purple Belt',
    beltColor: 'purple',
    bio: 'Sean brings competitive edge and technical depth to every class. As IBJJF World Masters Gold 2024 champion, he makes high-level Jiu-Jitsu accessible to everyone — from day one to competition day.',
    imageSrc: '/images/professor/Sean.webp',
    imageAlt: 'Sean Higgie, Instructor and IBJJF World Masters Gold 2024 champion at Sceptre Jiu-Jitsu',
  },
  {
    id: 'mira',
    name: 'Miranda "Mira"',
    title: "Women's Instructor",
    belt: 'Purple Belt',
    beltColor: 'purple',
    bio: 'Mira creates a truly inclusive space for women to start without intimidation. Her classes focus on empowerment, helping every student feel capable from day one. Women who train with her see noticeable results in just a few weeks.',
    imageSrc: '/images/professor/mira.webp',
    imageAlt: 'Miranda, Women\'s Instructor and Purple Belt at Sceptre Jiu-Jitsu in San Mateo, CA',
  },
]
