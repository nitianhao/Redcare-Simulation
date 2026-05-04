import Link from 'next/link'

type NavPage = 'report' | 'use-cases' | 'user-experience' | 'user-experience-mobile' | 'uc10' | 'uc14' | 'personas'

const navLinks: { href: string; label: string; page: NavPage }[] = [
  { href: '/report',                 label: 'Relevance',       page: 'report' },
  { href: '/use-cases',              label: 'Simulations',     page: 'use-cases' },
  { href: '/user-experience',        label: 'Web UX',          page: 'user-experience' },
  { href: '/user-experience-mobile', label: 'Mobile UX',       page: 'user-experience-mobile' },
  { href: '/uc10',                   label: 'Stakeholder Sim', page: 'uc10' },
  { href: '/uc14',                   label: 'Data Quality',    page: 'uc14' },
  { href: '/personas',               label: 'Personas',        page: 'personas' },
]

export default function SharedNav({ activePage }: { activePage?: NavPage }) {
  return (
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
      <Link href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', color: '#E2001A' }}>
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
              fontSize: '11px',
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
  )
}
