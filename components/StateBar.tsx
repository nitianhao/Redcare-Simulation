interface StateBarProps {
  label: string
  value: number
  reason: string
}

export default function StateBar({ label, value, reason }: StateBarProps) {
  const isHigh = value >= 0.7
  const pct = Math.round(value * 100)
  const descriptor =
    value >= 0.9 ? 'Very high'
    : value >= 0.7 ? 'High'
    : value >= 0.5 ? 'Moderate'
    : value >= 0.3 ? 'Low'
    : 'Very low'

  return (
    <div className="mb-5">
      <div className="flex justify-between items-baseline mb-1.5">
        <span className="text-[11px] font-bold tracking-[1px] uppercase text-[#0a0a0a]">
          {label}
        </span>
        <span
          className="text-[12px] font-black"
          style={{ color: isHigh ? '#E2001A' : '#0a0a0a' }}
        >
          {value.toFixed(1)} ({descriptor})
        </span>
      </div>
      <div className="h-[6px] rounded-sm mb-1.5" style={{ background: '#f0f0f0' }}>
        <div
          className="h-[6px] rounded-sm transition-all"
          style={{
            width: `${pct}%`,
            background: isHigh ? '#E2001A' : '#0a0a0a',
          }}
        />
      </div>
      <p className="text-[11px] leading-[1.4] text-[#737373]">{reason}</p>
    </div>
  )
}
