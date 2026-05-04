'use client'

import { useEffect, useState } from 'react'

const slides = [
  { src: '/hero-web-ux.webp',       alt: 'Web UX audit screenshot' },
  { src: '/hero-relevance.webp',    alt: 'Relevance audit screenshot' },
  { src: '/hero-simulations.webp',  alt: 'Simulations screenshot' },
  { src: '/hero-sponsored.webp',    alt: 'Sponsored impact screenshot' },
  { src: '/hero-stakeholder.webp',  alt: 'Stakeholder simulation screenshot' },
  { src: '/hero-dataquality.webp',  alt: 'Data quality audit screenshot' },
]

export default function HeroCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % slides.length), 3200)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
      {slides.map((slide, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          style={{
            width: '100%',
            borderRadius: '6px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            border: '1px solid #e5e5e5',
            display: 'block',
            position: i === 0 ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            opacity: active === i ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
          }}
        />
      ))}

      {/* Dot indicators */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: active === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              border: 'none',
              background: active === i ? '#E2001A' : '#d4d4d4',
              cursor: 'pointer',
              padding: 0,
              transition: 'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  )
}
