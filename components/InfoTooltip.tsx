'use client'

export default function InfoTooltip({ text }: { text: string }) {
  return (
    <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '16px',
          height: '16px',
          borderRadius: '50%',
          border: '1.5px solid #a3a3a3',
          fontSize: '11px',
          fontWeight: 700,
          color: '#a3a3a3',
          cursor: 'default',
          lineHeight: 1,
          flexShrink: 0,
          userSelect: 'none',
        }}
        onMouseEnter={e => {
          const tip = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement
          if (tip) tip.style.opacity = '1'
        }}
        onMouseLeave={e => {
          const tip = (e.currentTarget as HTMLElement).nextElementSibling as HTMLElement
          if (tip) tip.style.opacity = '0'
        }}
      >
        i
      </span>
      <span
        style={{
          opacity: 0,
          pointerEvents: 'none',
          position: 'absolute',
          left: '22px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '320px',
          background: '#0a0a0a',
          color: '#f5f5f5',
          fontSize: '13px',
          lineHeight: '1.5',
          padding: '10px 14px',
          borderRadius: '4px',
          zIndex: 200,
          transition: 'opacity 0.15s ease',
          boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
        }}
      >
        {text}
      </span>
    </span>
  )
}
