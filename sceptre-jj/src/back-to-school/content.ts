// ─────────────────────────────────────────────────────────────
// SCEPTRE — BACK-TO-SCHOOL CONTENT
// All page-specific strings live here. Shared portfolio copy is kept;
// only names / address / handles are localized to Sceptre.
// ─────────────────────────────────────────────────────────────

export const ACADEMY = 'Sceptre Jiu-Jitsu'
export const CTA = 'Book a free trial class'
export const STUDENT_ROLE = 'Sceptre Family'

export const CONTACT = {
  phone: '(650) 753-7486',
  phoneHref: 'tel:+16507537486',
  email: 'hello@sceptrejiujitsu.com',
  emailHref: 'mailto:hello@sceptrejiujitsu.com',
  address1: '3b N Kingston St',
  address2: 'San Mateo, CA 94401',
  mapsQuery: '3b N Kingston St, San Mateo, CA 94401',
  instagram: 'https://www.instagram.com/sceptrejj',
  instagramHandle: '@sceptrejj',
}

export const RIBBON_TEXT =
  'BACK TO SCHOOL  ·  FIRST CLASS FREE  ·  AGES 4 & UP  ·  ENROLLMENT OPEN  ·  BEGINNERS WELCOME  ·  '

// ─── WHY — six benefits (icon = key in WhyJiuJitsu icon map) ───
export type Benefit = { text: string; icon: string; image: string }
export const BENEFITS: Benefit[] = [
  { text: 'Confidence that carries into the classroom', icon: 'shield', image: '/images/how/3.webp' },
  { text: 'Focus and discipline that show up in schoolwork', icon: 'medal', image: '/images/how/4.webp' },
  { text: 'Real friendships in a welcoming community', icon: 'handshake', image: '/images/how/5.webp' },
  { text: 'A healthy, screen-free way to burn energy', icon: 'heart', image: '/images/how/6.webp' },
  { text: 'Anti-bullying skills and calm under pressure', icon: 'backpack', image: '/images/how/7.webp' },
  { text: 'Goals to chase, belts to earn, wins to celebrate', icon: 'apple', image: '/images/classes/kids.webp' },
]

// ─── HOW TO GET STARTED — 3 steps ───
export type Step = { n: number; title: string; text: string; color: string }
export const STEPS: Step[] = [
  { n: 1, title: 'Pick a day', text: 'Choose any kids class on our schedule that works for your family.', color: 'blue' },
  { n: 2, title: 'Show up comfortable', text: 'Wear athletic clothes. We provide a loaner uniform for the first class.', color: 'yellow' },
  { n: 3, title: 'Try your first class free', text: 'Your child joins a kids class and experiences Sceptre Jiu-Jitsu firsthand.', color: 'red' },
]

// ─── RIGHT FIT — interactive checklist (5–7 statements) ───
export const RIGHT_FIT: string[] = [
  'My child could use more confidence',
  'I want them to learn how to set and achieve goals',
  'I\'m looking for an activity that builds discipline',
  'I want them to make new friends in a positive environment',
  'I want them to be able to protect themselves if needed',
  'I\'m looking for something they can grow with for years',
]

// ─── FAQ — accordion questions and answers ───
export type QA = { q: string; a: string }
export const FAQ: QA[] = [
  {
    q: 'What age can my child start?',
    a: 'We welcome children starting at age 4. Classes are grouped by age and level so every child trains with kids their own size and stage.',
  },
  {
    q: 'Does my child need any experience?',
    a: 'None at all. Every beginner starts from zero. Our instructors are trained to teach complete beginners in a safe, supportive environment.',
  },
  {
    q: 'What should they wear to the first class?',
    a: 'Comfortable athletic clothes — shorts and a t-shirt work perfectly. We will provide a loaner uniform (gi) for the trial class.',
  },
  {
    q: 'How long is the free trial class?',
    a: 'Classes are about 45 minutes. Your child will warm up, learn a few basic techniques, and do some fun partner drills.',
  },
  {
    q: 'Is it safe? What about injuries?',
    a: 'Safety is our top priority. Beginners work at a very controlled pace, and every technique is taught progressively under close supervision.',
  },
  {
    q: 'How much does it cost after the trial?',
    a: 'After the free trial class we offer flexible monthly memberships. We\'ll go over the options at the academy — there\'s no pressure to sign up the same day.',
  },
  {
    q: 'What if my child doesn\'t like it?',
    a: 'That\'s completely okay — the first class is free, no strings attached. Most kids leave excited to come back, but every child is different.',
  },
]

// ─── STUDENTS — testimonials (kid/parent focused) ───
export type Review = { id: string; name: string; initial: string; text: string }
// Real Google reviews from parents (client-provided), trimmed to snippet length.
export const TESTIMONIALS: Review[] = [
  { id: 'kirsty', name: 'Kirsty Edwards', initial: 'K', text: 'From the very first class, my 7-year-old daughter was hooked! John is a true master of Jiu Jitsu — his classes are fun, educational, and full of energy, and he genuinely cares about every student.' },
  { id: 'emily', name: 'Emily Machtinger', initial: 'E', text: 'My girls have been taking classes at Sceptre for about 6 months and absolutely love it. John and Higgie created a fun, inclusive environment — even my shy 9-year-old thrives.' },
  { id: 'candice', name: 'Candice Pham', initial: 'C', text: 'John and Higgie ran a wonderful jiu jitsu camp our kids really enjoyed. My 2nd grader loved learning the basics, and my kindergartener loved the variety of activities.' },
  { id: 'jane', name: 'Jane Irwan', initial: 'J', text: 'We\'ve tried many after-school activities and this is the one they\'re most excited for. John and Higgie always make the classes fun and educational at the same time.' },
  { id: 'noah', name: 'Noah Machtinger', initial: 'N', text: 'Can\'t say enough great things about this gym. John and his team are extremely skilled and fantastic teachers for all ages. My two daughters love their classes.' },
]

// ─── GALLERY — images unique to this section (not reused in Hero/Why) ───
export const GALLERY: string[] = [
  '/images/back-to-school/gallery/1.webp',
  '/images/back-to-school/gallery/2.webp',
  '/images/back-to-school/gallery/3.webp',
  '/images/back-to-school/gallery/4.webp',
  '/images/back-to-school/gallery/5.webp',
  '/images/back-to-school/gallery/6.webp',
]

// color token map for per-step / per-item accents
export const CVAR: Record<string, string> = {
  blue: 'var(--k-blue)',
  yellow: 'var(--k-yellow)',
  red: 'var(--k-brand-red)',
  green: 'var(--k-green)',
  purple: 'var(--k-purple)',
  orange: 'var(--k-orange)',
  pink: 'var(--k-pink)',
}
