import type { TrustSignal } from '@/data/personas'

interface TrustSignalsProps {
  signals: TrustSignal[]
}

function signalColor(weight: number): string {
  if (weight >= 0.85) return '#E2001A'
  if (weight >= 0.7) return '#0a0a0a'
  return '#737373'
}

function signalMeaning(weight: number): string {
  if (weight >= 0.9) return 'Critical'
  if (weight >= 0.75) return 'Very important'
  if (weight >= 0.6) return 'Important'
  if (weight >= 0.4) return 'Helpful'
  return 'Low importance'
}

export default function TrustSignals({ signals }: TrustSignalsProps) {
  const sorted = [...signals].sort((a, b) => b.weight - a.weight)

  return (
    <div className="space-y-3">
      {sorted.map((s) => (
        <div key={s.signal} className="flex items-center gap-3">
          <span
            className="text-[12px] font-black w-40 shrink-0 text-right"
            style={{ color: signalColor(s.weight) }}
          >
            {s.weight.toFixed(2)} ({signalMeaning(s.weight)})
          </span>
          <div className="flex-1 h-[4px] rounded-sm" style={{ background: '#f0f0f0' }}>
            <div
              className="h-[4px] rounded-sm"
              style={{
                width: `${Math.round(s.weight * 100)}%`,
                background: signalColor(s.weight),
              }}
            />
          </div>
          <span className="text-[12px] text-[#0a0a0a] min-w-0 flex-1">{s.signal}</span>
        </div>
      ))}
    </div>
  )
}
