type Severity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'OK'

const config: Record<Severity, { bg: string; color: string }> = {
  CRITICAL: { bg: '#fff0f0', color: '#E2001A' },
  HIGH:     { bg: '#fff8ed', color: '#d97706' },
  MEDIUM:   { bg: '#f5f5f5', color: '#737373' },
  OK:       { bg: '#f0faf4', color: '#16a34a' },
}

export default function SeverityBadge({ severity }: { severity: Severity }) {
  const { bg, color } = config[severity]
  return (
    <span
      className="font-bold uppercase"
      style={{
        fontSize: '10px',
        letterSpacing: '1.5px',
        background: bg,
        color,
        padding: '3px 8px',
        border: `1px solid ${color}`,
        borderRadius: '2px',
        whiteSpace: 'nowrap',
      }}
    >
      {severity}
    </span>
  )
}
