import type { CompetitorExit } from '@/data/personas'

interface CompetitorMapProps {
  exits: CompetitorExit[]
}

function barBg(index: number): string {
  if (index === 0) return '#E2001A'
  if (index === 1) return '#0a0a0a'
  if (index === 2) return '#525252'
  return '#a3a3a3'
}

export default function CompetitorMap({ exits }: CompetitorMapProps) {
  const sorted = [...exits].sort((a, b) => b.likelihood - a.likelihood)

  return (
    <div className="space-y-4">
      {sorted.map((exit, i) => (
        <div key={exit.platform}>
          <div className="flex items-center gap-4 mb-1">
            <span className="text-[12px] font-bold text-[#0a0a0a] w-44 shrink-0 leading-tight">
              {exit.platform}
            </span>
            <div
              className="flex-1 h-5 rounded-sm overflow-hidden"
              style={{ background: '#f0f0f0' }}
            >
              <div
                className="h-5 flex items-center pl-2"
                style={{
                  width: `${Math.round(exit.likelihood * 100)}%`,
                  background: barBg(i),
                }}
              >
                <span className="text-[11px] font-bold text-white">
                  {Math.round(exit.likelihood * 100)}%
                </span>
              </div>
            </div>
          </div>
          <p className="text-[11px] text-[#737373] pl-48 leading-[1.4]">{exit.reason}</p>
        </div>
      ))}
    </div>
  )
}
