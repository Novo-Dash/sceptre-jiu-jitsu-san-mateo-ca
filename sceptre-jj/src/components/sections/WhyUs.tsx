import { Section, SectionHeader, DraggableCardContainer, DraggableCardBody } from '../ui'

const benefits = [
  {
    id: 'confident',
    label: 'Confident',
    image: '/images/polaroids/Frame 4.webp',
    className: 'top-[13%] left-[5%]  rotate-[-6deg]',
    rotation: '-6deg',
  },
  {
    id: 'weight-loss',
    label: 'Weight Loss',
    image: '/images/polaroids/Frame 5.webp',
    className: 'top-[4%]  left-[14%] rotate-[9deg]',
    rotation: '9deg',
  },
  {
    id: 'self-defense',
    label: 'Self-Defense',
    image: '/images/polaroids/Frame 6.webp',
    className: 'top-[18%] left-[23%] rotate-[-8deg]',
    rotation: '-8deg',
  },
  {
    id: 'discipline',
    label: 'Discipline',
    image: '/images/polaroids/Frame 7.webp',
    className: 'top-[7%]  left-[32%] rotate-[5deg]',
    rotation: '5deg',
  },
  {
    id: 'mental',
    label: 'Mental Clarity',
    image: '/images/polaroids/Frame 8.webp',
    className: 'top-[17%] left-[41%] rotate-[-11deg]',
    rotation: '-11deg',
  },
  {
    id: 'stronger',
    label: 'Stronger',
    image: '/images/polaroids/Frame 9.webp',
    className: 'top-[5%]  left-[50%] rotate-[7deg]',
    rotation: '7deg',
  },
  {
    id: 'community',
    label: 'Community',
    image: '/images/polaroids/Frame 10.webp',
    className: 'top-[15%] left-[59%] rotate-[-5deg]',
    rotation: '-5deg',
  },
  {
    id: 'focus',
    label: 'Focus',
    image: '/images/polaroids/Frame 11.webp',
    className: 'top-[6%]  left-[68%] rotate-[10deg]',
    rotation: '10deg',
  },
  {
    id: 'flexibility',
    label: 'Flexibility',
    image: '/images/polaroids/Frame 12.webp',
    className: 'top-[17%] left-[77%] rotate-[-9deg]',
    rotation: '-9deg',
  },
  {
    id: 'endurance',
    label: 'Endurance',
    image: '/images/polaroids/Frame 13.webp',
    className: 'top-[5%]  left-[86%] rotate-[6deg]',
    rotation: '6deg',
  },
]

function PolaroidCard({ image, label, rotation }: { image: string; label: string; rotation: string }) {
  return (
    <div className="flex-shrink-0" style={{ transform: `rotate(${rotation})` }}>
      <div className="bg-white p-2.5 pb-8 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
        <img
          src={image}
          alt={label}
          loading="lazy"
          decoding="async"
          className="h-36 w-36 object-cover"
        />
        <p className="mt-2 text-center text-[11px] font-semibold tracking-wide text-neutral-700">
          {label}
        </p>
      </div>
    </div>
  )
}

export function WhyUs() {
  return (
    <Section id="why-us" labelledBy="why-us-heading">
      <SectionHeader
        id="why-us-heading"
        eyebrow="Why Sceptre"
        headline={
          <>
            <span className="block text-[0.72em] tracking-[0em] md:hidden">The Sceptre</span>
            <span className="block tracking-[-0.01em] md:hidden">standard.</span>
            <span className="hidden md:block whitespace-nowrap">The Sceptre standard.</span>
          </>
        }
        sub="Everything Jiu-Jitsu builds in you — drag the cards to explore."
        headlineClassName="!text-[clamp(3.2rem,7vw+0.5rem,7.5rem)] md:tracking-[-0.03em]"
        headlineStyle={{ fontFamily: "'Noken', system-ui, sans-serif", marginTop: '-0.2em' }}
      />

      {/* Mobile: infinite auto-scroll carousel */}
      <div className="md:hidden overflow-hidden relative left-1/2 w-screen -translate-x-1/2 py-10">
        <div className="flex gap-6 animate-marquee" style={{ width: 'max-content' }}>
          {[...benefits, ...benefits].map((item, i) => (
            <PolaroidCard
              key={`${item.id}-${i}`}
              image={item.image}
              label={item.label}
              rotation={item.rotation}
            />
          ))}
        </div>
      </div>

      {/* Desktop: draggable cards */}
      <DraggableCardContainer className="hidden md:block relative left-1/2 h-[500px] w-screen -translate-x-1/2">
        {benefits.map((item) => (
          <DraggableCardBody key={item.id} className={item.className}>
            <div className="bg-white p-3 pb-10 shadow-[0_8px_40px_rgba(0,0,0,0.2)]">
              <img
                src={item.image}
                alt={item.label}
                width={256}
                height={256}
                loading="lazy"
                decoding="async"
                className="pointer-events-none h-64 w-64 object-cover"
              />
              <p className="mt-3 text-center text-sm font-semibold tracking-wide text-neutral-700">
                {item.label}
              </p>
            </div>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </Section>
  )
}
