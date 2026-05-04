import React from 'react'
import Link from 'next/link'

type NavPage = 'home' | 'personas' | 'user-experience' | 'user-experience-mobile' | 'report' | 'use-cases' | 'uc10' | 'uc14'

const navLinks: { href: string; label: string; page: NavPage }[] = [
  { href: '/report',                label: 'Relevance',        page: 'report' },
  { href: '/use-cases',             label: 'Simulations',      page: 'use-cases' },
  { href: '/user-experience',       label: 'Web UX',           page: 'user-experience' },
  { href: '/user-experience-mobile',label: 'Mobile UX',        page: 'user-experience-mobile' },
  { href: '/uc10',                  label: 'Stakeholder Sim',  page: 'uc10' },
  { href: '/uc14',                  label: 'Data Quality',     page: 'uc14' },
  { href: '/personas',              label: 'Personas',         page: 'personas' },
]

export default function Hero({ activePage, headline, tagline, screenshotSrc, screenshotAlt, rightContent }: { activePage?: NavPage; headline?: React.ReactNode; tagline?: string; screenshotSrc?: string; screenshotAlt?: string; rightContent?: React.ReactNode }) {
  return (
    <>
      <nav
        style={{
          borderBottom: '1px solid #e5e5e5',
          background: '#ffffff',
          padding: '12px 80px',
          display: 'flex',
          gap: '32px',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: 'none', flexShrink: 0 }}
        >
          <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A' }}>
            REDCARE × SEARCH SIMULATION LAB
          </span>
        </Link>
        <span style={{ color: '#e5e5e5' }}>|</span>
        {navLinks.map(({ href, label, page }) => {
          const active = activePage === page
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                color: active ? '#0a0a0a' : '#737373',
                textDecoration: 'none',
                textTransform: 'uppercase',
                ...(active ? { borderBottom: '2px solid #E2001A', paddingBottom: '2px' } : {}),
              }}
            >
              {label}
            </Link>
          )
        })}
      </nav>
    <section
      className="px-20 pt-16 pb-14"
      style={{ background: '#ffffff', borderBottom: '2px solid #0a0a0a', display: 'flex', gap: '80px', alignItems: 'center' }}
    >
      <div style={{ flex: '0 0 auto', maxWidth: '520px' }}>
        <p
          className="mb-4 font-bold uppercase"
          style={{ fontSize: '16px', letterSpacing: '3px', color: '#E2001A' }}
        >
          REDCARE × SEARCH SIMULATION LAB
        </p>

        <h1
          className="font-black leading-none mb-6"
          style={{ fontSize: '72px', letterSpacing: '0px', color: '#0a0a0a' }}
        >
          {headline ?? (
            <>
              5 SHOPPERS.
              <br />
              <em style={{ fontStyle: 'italic', color: '#E2001A' }}>THOUSANDS</em>
              <br />
              OF DECISIONS.
            </>
          )}
        </h1>

        <div className="mb-5" style={{ width: '60px', height: '3px', background: '#E2001A' }} />

        <p
          className="max-w-lg leading-relaxed"
          style={{ fontSize: '16px', color: '#525252' }}
        >
          {tagline ?? 'Five synthetic personas. Each one built from behavioral research, German market data, and real search failure patterns. This is how your customers actually experience search.'}
        </p>

        <p
          className="mt-10 font-bold uppercase"
          style={{ fontSize: '16px', letterSpacing: '2px', color: '#737373' }}
        >
          ↓ SCROLL TO MEET THEM
        </p>
      </div>
      {rightContent && (
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          {rightContent}
        </div>
      )}
      {!rightContent && screenshotSrc && (
        <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={screenshotSrc}
            alt={screenshotAlt ?? 'shop-apotheke.com screenshot'}
            style={{ width: '100%', borderRadius: '6px', boxShadow: '0 8px 32px rgba(0,0,0,0.12)', border: '1px solid #e5e5e5', display: 'block' }}
          />
        </div>
      )}
    </section>
    </>
  )
}
