import SeverityBadge from './SeverityBadge'

type Verdict = 'ALIGNED' | 'MISMATCH' | 'CRITICAL'

interface SimQueryRowProps {
  query: string
  sponsoredProduct: string
  verdict: Verdict
  issue: string
  alt?: boolean
}

const verdictBorder: Record<Verdict, string> = {
  ALIGNED:  '#16a34a',
  MISMATCH: '#d97706',
  CRITICAL: '#E2001A',
}

const verdictSeverity: Record<Verdict, 'OK' | 'MEDIUM' | 'CRITICAL'> = {
  ALIGNED:  'OK',
  MISMATCH: 'MEDIUM',
  CRITICAL: 'CRITICAL',
}

export default function SimQueryRow({ query, sponsoredProduct, verdict, issue, alt }: SimQueryRowProps) {
  return (
    <div
      style={{
        borderLeft: `4px solid ${verdictBorder[verdict]}`,
        background: alt ? '#fafafa' : '#ffffff',
        borderBottom: '1px solid #e5e5e5',
        padding: '18px 24px',
        display: 'grid',
        gridTemplateColumns: '1fr 1.4fr 100px 1.4fr',
        gap: '24px',
        alignItems: 'center',
      }}
    >
      <span
        className="font-mono"
        style={{ fontSize: '13px', color: '#0a0a0a', fontWeight: 500 }}
      >
        &ldquo;{query}&rdquo;
      </span>

      <span style={{ fontSize: '13px', color: '#525252' }}>
        {sponsoredProduct}
      </span>

      <div>
        <SeverityBadge severity={verdictSeverity[verdict]} />
      </div>

      <span style={{ fontSize: '12px', color: issue ? '#737373' : '#e5e5e5' }}>
        {issue || '—'}
      </span>
    </div>
  )
}
